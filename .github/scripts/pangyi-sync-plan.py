#!/usr/bin/env python3
"""判断旁译清单要不要同步，以及 Cloudflare R2 是否已经配齐。

由 pangyi-manifest workflow 调用。只根据环境变量做判断，不上传、不签名。
四个 R2 Secret 的值只用于判断「有没有填」，任何输出都不会包含这些值。

环境变量：
  TAG                       例如 v4.19.0
  SITE_DIR                  网站发布目录，里面有 latest.json
  FORCE                     true / false，手动强制同步
  PANGYI_DOWNLOAD_BASE      可选，公网下载基址；空则 https://download.eyuxq.com
  R2_ACCOUNT_ID 等四个 Secret  全空=继续用 GitHub Release；全有=走 R2；只填一部分=失败

写出 GITHUB_OUTPUT（若存在）：
  ready=true|false
  base=公网基址（未启用 R2 时为空）
  skip=true|false
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

R2_SECRET_NAMES = (
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET",
)
DEFAULT_BASE = "https://download.eyuxq.com"
TAG_RE = re.compile(r"v[0-9A-Za-z._-]+")


def r2_mode(values: dict) -> tuple[str, list[str]]:
    """返回 (off|on|partial, missing_names)。missing 只含名称。"""
    missing = [name for name in R2_SECRET_NAMES if not str(values.get(name) or "").strip()]
    if not missing:
        return "on", []
    if len(missing) == len(R2_SECRET_NAMES):
        return "off", missing
    return "partial", missing


def normalize_base(raw: str) -> str:
    base = (raw or "").strip().rstrip("/")
    if not base:
        base = DEFAULT_BASE
    if not base.startswith("https://") or any(ch in base for ch in " \t\r\n\"'`"):
        raise ValueError(f"PANGYI_DOWNLOAD_BASE 必须是不带空格的 https 地址：{base}")
    return base


def validate_tag(tag: str) -> str:
    tag = (tag or "").strip()
    if TAG_RE.fullmatch(tag) is None:
        raise ValueError(f"无法识别的 tag（预期类似 v4.19.0）：{tag or '（空）'}")
    return tag


def parse_force(value: str) -> bool:
    return str(value or "").strip().lower() in {"1", "true", "yes"}


def needs_sync(*, tag: str, manifest: dict | None, force: bool, r2_ready: bool, r2_base: str) -> tuple[bool, list[str]]:
    version = tag[1:] if tag.startswith("v") else tag
    current = ""
    url = ""
    if isinstance(manifest, dict):
        current = str(manifest.get("version") or "")
        url = str(manifest.get("url") or "")
    reasons: list[str] = []
    if current != version:
        reasons.append("version")
    if force:
        reasons.append("force")
    if r2_ready and not url.startswith(r2_base.rstrip("/") + "/"):
        reasons.append("url-not-r2")
    return bool(reasons), reasons


def partial_message(missing: list[str]) -> str:
    names = "、".join(missing)
    return (
        f"R2 Secrets 配置不完整，缺少：{names}\n"
        "请补齐上述 Secret，或把已填写的全部删除，以继续使用 GitHub Release 直链。\n"
        "不会打印任何 Secret 的值。\n"
    )


def offline_notice() -> str:
    names = "、".join(R2_SECRET_NAMES)
    return (
        f"Cloudflare R2 尚未配置（{names} 均为空）。\n"
        "本次保持现有行为：latest.json 的 url 指向 GitHub Release，mirrors 为空。\n"
        "配齐上述 4 个 Secret 后，下一次版本变化、主链还不是 R2，或手动勾选 force，"
        f"会把主下载改为 {DEFAULT_BASE}（或变量 PANGYI_DOWNLOAD_BASE），"
        "GitHub Release 写入 mirrors。\n"
        "在配齐之前，每小时定时任务不会因此失败。\n"
    )


def load_manifest(path: Path):
    if not path.is_file():
        return None
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise ValueError(f"无法解析 {path.name}：{exc}") from exc
    if not isinstance(data, dict):
        raise ValueError(f"{path.name} 必须是 JSON 对象")
    return data


def write_output(pairs: dict[str, str]) -> None:
    path = os.environ.get("GITHUB_OUTPUT")
    line = "".join(f"{key}={value}\n" for key, value in pairs.items())
    if not path:
        return
    with open(path, "a", encoding="utf-8") as handle:
        handle.write(line)


def write_summary(text: str) -> None:
    path = os.environ.get("GITHUB_STEP_SUMMARY")
    if not path:
        return
    with open(path, "a", encoding="utf-8") as handle:
        handle.write("### 旁译下载源\n\n")
        handle.write(text)
        if not text.endswith("\n"):
            handle.write("\n")


def main() -> int:
    mode, missing = r2_mode({name: os.environ.get(name, "") for name in R2_SECRET_NAMES})
    if mode == "partial":
        sys.stdout.write(partial_message(missing))
        return 1
    try:
        tag = validate_tag(os.environ.get("TAG", ""))
        base = normalize_base(os.environ.get("PANGYI_DOWNLOAD_BASE", "")) if mode == "on" else ""
        site = os.environ.get("SITE_DIR", "").strip()
        if not site:
            raise ValueError("缺少 SITE_DIR")
        manifest = load_manifest(Path(site) / "latest.json")
        force = parse_force(os.environ.get("FORCE", ""))
        sync, reasons = needs_sync(
            tag=tag,
            manifest=manifest,
            force=force,
            r2_ready=mode == "on",
            r2_base=base,
        )
    except ValueError as exc:
        print(str(exc))
        return 1

    write_output({
        "ready": "true" if mode == "on" else "false",
        "base": base,
        "skip": "false" if sync else "true",
    })
    if mode == "off":
        notice = offline_notice()
        sys.stdout.write(notice)
        write_summary(notice)
    else:
        print(f"R2 已配置，下载基址：{base}")
    if sync:
        print("需要同步：" + ",".join(reasons))
    else:
        print("无需同步。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
