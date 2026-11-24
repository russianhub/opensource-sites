#!/usr/bin/env python3
"""旁译清单脚本的单元测试，以及 pangyi-manifest workflow 的静态检查。

密钥只在临时目录里现生成，不写入仓库。
"""
from __future__ import annotations

import base64
import datetime
import hashlib
import json
import os
import importlib.util
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives.serialization import (
    Encoding,
    NoEncryption,
    PrivateFormat,
)

try:
    import yaml
except ImportError:  # pragma: no cover
    yaml = None

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / ".github" / "scripts" / "pangyi-make-manifest.py"
PLAN = ROOT / ".github" / "scripts" / "pangyi-sync-plan.py"
WORKFLOW = ROOT / ".github" / "workflows" / "pangyi-manifest.yml"
_spec = importlib.util.spec_from_file_location("pangyi_sync_plan", PLAN)
plan = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(plan)


MIRROR = "https://github.com/russianhub/pangyi/releases/download/v4.19.0/pangyi-v4.19.0.exe"


def pem_text(key: Ed25519PrivateKey) -> str:
    return key.private_bytes(Encoding.PEM, PrivateFormat.PKCS8, NoEncryption()).decode()


class ManifestTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.dir = Path(self.tmp.name)
        self.exe = self.dir / "pangyi-v4.19.0.exe"
        self.exe.write_bytes(b"pangyi-installer-bytes")
        self.key = Ed25519PrivateKey.generate()
        self.out = self.dir / "latest.json"

    def run_manifest(self, **env):
        full = os.environ.copy()
        for name in ("TAG", "EXE_PATH", "SIGN_KEY_PEM", "DOWNLOAD_BASE", "MIRROR_URL", "RELEASE_BODY"):
            full.pop(name, None)
        full.update({
            "TAG": "v4.19.0",
            "EXE_PATH": str(self.exe),
            "SIGN_KEY_PEM": pem_text(self.key),
        })
        full.update(env)
        subprocess.run([sys.executable, str(SCRIPT), str(self.out)], check=True, env=full)
        return json.loads(self.out.read_text(encoding="utf-8"))

    def body(self):
        long_line = "条目七" + ("长" * 200)
        return "\n".join([
            "# 标题一",
            "",
            "- 条目二",
            "> 条目三",
            "* 条目四",
            "• 条目五",
            "  条目六",
            long_line,
            "条目八",
            "条目九",
            "条目十不应出现",
        ])

    def test_r2_url_mirror_checksum_notes_and_signature(self):
        manifest = self.run_manifest(
            DOWNLOAD_BASE="https://download.eyuxq.com",
            MIRROR_URL=MIRROR,
            RELEASE_BODY=self.body(),
        )
        digest = hashlib.sha256(self.exe.read_bytes()).hexdigest()
        self.assertEqual(manifest["version"], "4.19.0")
        self.assertEqual(manifest["url"], "https://download.eyuxq.com/pangyi-v4.19.0.exe")
        self.assertEqual(manifest["mirrors"], [MIRROR])
        self.assertEqual(manifest["sha256"], digest)
        self.assertEqual(manifest["size"], self.exe.stat().st_size)
        self.assertEqual(manifest["released"], datetime.date.today().isoformat())
        self.assertEqual(manifest["notes"], [
            "标题一",
            "条目二",
            "条目三",
            "条目四",
            "条目五",
            "条目六",
            ("条目七" + ("长" * 200))[:120],
            "条目八",
        ])
        self.assertNotIn("条目十不应出现", manifest["notes"])
        self.assertLessEqual(max(len(note) for note in manifest["notes"]), 120)
        self.assertNotIn("BEGIN", self.out.read_text(encoding="utf-8"))

        message = f"pangyi\n{manifest['version']}\n{manifest['sha256']}\n{manifest['size']}".encode()
        signature = base64.b64decode(manifest["sig"])
        self.assertEqual(len(signature), 64)
        public = self.key.public_key()
        public.verify(signature, message)
        self.assertEqual(base64.b64encode(self.key.sign(message)).decode(), manifest["sig"])

        tampered = {
            "version": "4.19.1",
            "sha256": ("0" if digest[0] != "0" else "1") + digest[1:],
            "size": manifest["size"] + 1,
        }
        for field, value in tampered.items():
            fields = {
                "version": manifest["version"],
                "sha256": manifest["sha256"],
                "size": manifest["size"],
            }
            fields[field] = value
            bad = f"pangyi\n{fields['version']}\n{fields['sha256']}\n{fields['size']}".encode()
            with self.assertRaises(InvalidSignature):
                public.verify(signature, bad)

    def test_trailing_slash_on_download_base(self):
        manifest = self.run_manifest(DOWNLOAD_BASE="https://download.eyuxq.com/", MIRROR_URL=MIRROR)
        self.assertEqual(manifest["url"], "https://download.eyuxq.com/pangyi-v4.19.0.exe")

    def test_missing_or_blank_mirror_is_empty(self):
        self.assertEqual(self.run_manifest()["mirrors"], [])
        self.assertEqual(self.run_manifest(MIRROR_URL="")["mirrors"], [])
        self.assertEqual(self.run_manifest(MIRROR_URL="   ")["mirrors"], [])


class SyncPlanTests(unittest.TestCase):
    def test_secret_modes_do_not_echo_values(self):
        self.assertEqual(plan.r2_mode({name: "" for name in plan.R2_SECRET_NAMES})[0], "off")
        self.assertEqual(plan.r2_mode({name: "  " for name in plan.R2_SECRET_NAMES})[0], "off")
        ready = {name: f"value-{name}" for name in plan.R2_SECRET_NAMES}
        mode, missing = plan.r2_mode(ready)
        self.assertEqual((mode, missing), ("on", []))
        partial_values = dict(ready)
        partial_values["R2_SECRET_ACCESS_KEY"] = ""
        partial_values["R2_BUCKET"] = "\n"
        mode, missing = plan.r2_mode(partial_values)
        self.assertEqual(mode, "partial")
        self.assertEqual(missing, ["R2_SECRET_ACCESS_KEY", "R2_BUCKET"])
        message = plan.partial_message(missing)
        self.assertIn("R2_SECRET_ACCESS_KEY", message)
        self.assertIn("R2_BUCKET", message)
        self.assertNotIn("value-R2_ACCOUNT_ID", message)

    def test_base_and_sync_decision(self):
        self.assertEqual(plan.normalize_base(""), plan.DEFAULT_BASE)
        self.assertEqual(plan.normalize_base("https://download.eyuxq.com/"), "https://download.eyuxq.com")
        with self.assertRaises(ValueError):
            plan.normalize_base("http://download.eyuxq.com")
        self.assertEqual(plan.validate_tag("v4.19.0"), "v4.19.0")
        with self.assertRaises(ValueError):
            plan.validate_tag("4.19.0")
        with self.assertRaises(ValueError):
            plan.validate_tag("v4.19.0/../x")

        github = {
            "version": "4.19.0",
            "url": "https://github.com/russianhub/pangyi/releases/download/v4.19.0/pangyi-v4.19.0.exe",
        }
        r2 = {"version": "4.19.0", "url": "https://download.eyuxq.com/pangyi-v4.19.0.exe"}
        base = "https://download.eyuxq.com"
        self.assertEqual(
            plan.needs_sync(tag="v4.19.0", manifest=github, force=False, r2_ready=False, r2_base=""),
            (False, []),
        )
        sync, reasons = plan.needs_sync(tag="v4.19.0", manifest=github, force=False, r2_ready=True, r2_base=base)
        self.assertEqual((sync, reasons), (True, ["url-not-r2"]))
        self.assertEqual(
            plan.needs_sync(tag="v4.19.0", manifest=r2, force=False, r2_ready=True, r2_base=base),
            (False, []),
        )
        self.assertEqual(
            plan.needs_sync(tag="v4.19.0", manifest=r2, force=True, r2_ready=True, r2_base=base)[1],
            ["force"],
        )
        self.assertIn(
            "version",
            plan.needs_sync(tag="v4.20.0", manifest=r2, force=False, r2_ready=True, r2_base=base)[1],
        )
        self.assertFalse(plan.parse_force("false"))
        self.assertTrue(plan.parse_force("true"))

    def test_cli_partial_secrets_hide_values_and_all_missing_stays_green(self):
        with tempfile.TemporaryDirectory() as tmp:
            site = Path(tmp)
            manifest = {
                "version": "4.19.0",
                "url": "https://github.com/russianhub/pangyi/releases/download/v4.19.0/pangyi-v4.19.0.exe",
            }
            (site / "latest.json").write_text(json.dumps(manifest), encoding="utf-8")
            output = site / "github_output.txt"
            summary = site / "summary.md"

            def run(extra):
                env = os.environ.copy()
                for name in plan.R2_SECRET_NAMES:
                    env.pop(name, None)
                env.update({
                    "TAG": "v4.19.0",
                    "SITE_DIR": str(site),
                    "FORCE": "false",
                    "PANGYI_DOWNLOAD_BASE": "",
                    "GITHUB_OUTPUT": str(output),
                    "GITHUB_STEP_SUMMARY": str(summary),
                })
                env.update(extra)
                output.write_text("", encoding="utf-8")
                summary.write_text("", encoding="utf-8")
                return subprocess.run([sys.executable, str(PLAN)], env=env, capture_output=True, text=True)

            partial = run({
                "R2_ACCOUNT_ID": "acct-SHOULD-NOT-PRINT",
                "R2_ACCESS_KEY_ID": "",
                "R2_SECRET_ACCESS_KEY": "",
                "R2_BUCKET": "bucket-SHOULD-NOT-PRINT",
            })
            blob = partial.stdout + partial.stderr
            self.assertEqual(partial.returncode, 1)
            self.assertIn("R2_ACCESS_KEY_ID", blob)
            self.assertIn("R2_SECRET_ACCESS_KEY", blob)
            self.assertNotIn("acct-SHOULD-NOT-PRINT", blob)
            self.assertNotIn("bucket-SHOULD-NOT-PRINT", blob)
            self.assertNotIn("acct-SHOULD-NOT-PRINT", output.read_text(encoding="utf-8"))

            absent = run({})
            self.assertEqual(absent.returncode, 0, absent.stderr)
            self.assertIn("GitHub Release", absent.stdout)
            self.assertIn("不会因此失败", absent.stdout)
            parsed = dict(line.split("=", 1) for line in output.read_text(encoding="utf-8").splitlines())
            self.assertEqual(parsed["ready"], "false")
            self.assertEqual(parsed["base"], "")
            self.assertEqual(parsed["skip"], "true")
            self.assertIn("GitHub Release", summary.read_text(encoding="utf-8"))

            switched = run({name: f"secret-{name}" for name in plan.R2_SECRET_NAMES})
            self.assertEqual(switched.returncode, 0, switched.stderr)
            blob = switched.stdout + switched.stderr + output.read_text(encoding="utf-8")
            for name in plan.R2_SECRET_NAMES:
                self.assertNotIn(f"secret-{name}", blob)
            parsed = dict(line.split("=", 1) for line in output.read_text(encoding="utf-8").splitlines())
            self.assertEqual(parsed["ready"], "true")
            self.assertEqual(parsed["base"], "https://download.eyuxq.com")
            self.assertEqual(parsed["skip"], "false")
            self.assertIn("url-not-r2", switched.stdout)


class WorkflowStaticTests(unittest.TestCase):
    def test_workflow_yaml_and_required_steps(self):
        text = WORKFLOW.read_text(encoding="utf-8")
        self.assertIsNotNone(yaml, "需要 PyYAML 才能做 workflow 静态检查")
        doc = yaml.safe_load(text)
        trigger = doc.get("on", doc.get(True))
        force = trigger["workflow_dispatch"]["inputs"]["force"]
        self.assertEqual(force["type"], "boolean")
        self.assertIs(force["default"], False)
        for line in text.splitlines():
            code = line.split("#", 1)[0]
            self.assertNotIn("set -x", code)
        self.assertIn("不使用 set -x", text)
        for needle in (
            "R2_ACCOUNT_ID",
            "R2_ACCESS_KEY_ID",
            "R2_SECRET_ACCESS_KEY",
            "R2_BUCKET",
            "vars.PANGYI_DOWNLOAD_BASE",
            "https://download.eyuxq.com",
            "pangyi-sync-plan.py",
            'aws s3 cp "dl/pangyi-${TAG}.exe" "s3://${R2_BUCKET}/pangyi-${TAG}.exe"',
            '--endpoint-url "https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"',
            '--content-type "application/octet-stream"',
            "AWS_DEFAULT_REGION: auto",
            'AWS_EC2_METADATA_DISABLED: "true"',
            "AWS_REQUEST_CHECKSUM_CALCULATION: when_required",
            "AWS_RESPONSE_CHECKSUM_VALIDATION: when_required",
            "curl -fsI",
            'export DOWNLOAD_BASE="${R2_BASE}"',
            'export MIRROR_URL="https://github.com/${PANGYI_REPO}/releases/download/${TAG}/pangyi-${TAG}.exe"',
            'export MIRROR_URL=""',
            "拒绝写入 latest.json",
        ):
            self.assertIn(needle, text, needle)
        self.assertNotIn("echo \"$R2_", text)
        self.assertNotRegex(text, r"R2_ACCOUNT_ID:\s+[A-Za-z0-9]{8,}")
        job = doc["jobs"]["sync"]
        self.assertEqual(job["env"]["PANGYI_REPO"], "russianhub/pangyi")
        upload = next(step for step in job["steps"] if step.get("name") == "上传安装包到 Cloudflare R2")
        self.assertEqual(upload["env"]["AWS_DEFAULT_REGION"], "auto")
        self.assertEqual(upload["env"]["AWS_REQUEST_CHECKSUM_CALCULATION"], "when_required")
        self.assertNotIn("dl/", text.split("git add", 1)[1])
        for step in job["steps"]:
            script = step.get("run")
            if not isinstance(script, str):
                continue
            if "\n" in script:
                subprocess.run(["bash", "-n"], input=script, text=True, check=True)
            start = 0
            while True:
                marker = script.find("<<'PY'\n", start)
                if marker < 0:
                    break
                body = script[marker + len("<<'PY'\n"):]
                py, _, _rest = body.partition("\nPY")
                compile(py, f"{step.get('name', 'workflow')}.py", "exec")
                start = marker + len("<<'PY'\n") + len(py)


if __name__ == "__main__":
    unittest.main(verbosity=2)
