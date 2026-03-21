#!/usr/bin/env bash
## This script keeps /lists up to date with /extension/lists.
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
extension_dir="${script_dir}/extension"
lists_dir="${script_dir}/lists"

mkdir -p "${extension_dir}/lists"

cp "${lists_dir}/account_tagging_v1.json" "${extension_dir}/lists/account_tagging_v1.json"
cp "${lists_dir}/joiners.json" "${extension_dir}/lists/joiners.json"
cp "${lists_dir}/platforms.json" "${extension_dir}/lists/platforms.json"

echo "Extension lists synced."
