#!/usr/bin/env python3
"""生成并签名 latest.json（由 pangyi-manifest workflow 调用）。

必需环境变量：
  TAG            例如 v4.19.0
  EXE_PATH       安装包路径
  SIGN_KEY_PEM   ed25519 私钥（PEM 全文）
可选：
  DOWNLOAD_BASE  默认 https://eyuxq.com/download
  MIRROR_URL     备用下载地址（GitHub Release 直链）
  RELEASE_BODY   Release 说明，取前 8 行作为更新内容
用法： python pangyi-make-manifest.py dist/latest.json
"""
import base64
import datetime
import hashlib
import json
import os
import re
import sys

from cryptography.hazmat.primitives.serialization import load_pem_private_key

tag = os.environ["TAG"]
version = tag.lstrip("v")
exe_path = os.environ["EXE_PATH"]
base = os.environ.get("DOWNLOAD_BASE", "https://eyuxq.com/download").rstrip("/")
mirror = os.environ.get("MIRROR_URL", "").strip()
body = os.environ.get("RELEASE_BODY", "")

h = hashlib.sha256()
with open(exe_path, "rb") as f:
    for chunk in iter(lambda: f.read(1024 * 1024), b""):
        h.update(chunk)
sha256 = h.hexdigest()
size = os.path.getsize(exe_path)

notes = []
for line in body.splitlines():
    line = re.sub(r"^[\s>#*\-•]+", "", line).strip()
    if line:
        notes.append(line[:120])
    if len(notes) >= 8:
        break

# 必须与 pangyi 仓库 updater/src/main.rs 里的 signed_message 完全一致
message = f"pangyi\n{version}\n{sha256}\n{size}".encode("utf-8")
key = load_pem_private_key(os.environ["SIGN_KEY_PEM"].encode(), password=None)
sig = base64.b64encode(key.sign(message)).decode()

manifest = {
    "version": version,
    "released": datetime.date.today().isoformat(),
    "notes": notes,
    "url": f"{base}/pangyi-v{version}.exe",
    "mirrors": [mirror] if mirror else [],
    "sha256": sha256,
    "size": size,
    "sig": sig,
}

with open(sys.argv[1], "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)
    f.write("\n")
