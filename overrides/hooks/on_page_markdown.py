import re
from pathlib import Path
import yaml


def non_breaking_space(markdown):
    return re.sub(
        "[\u00a0\u1680\u180e\u2000-\u200b\u202f\u205f\u3000\ufeff]", "&emsp;", markdown
    )


def update_heading(markdown):
    file_content = markdown.split("\n")
    output = ""
    code = False
    for line in file_content:
        if not code:
            if line.startswith("```"):
                code = True
            elif line.startswith("#") and line.count("#") <= 5:
                heading_number = line.count("#") + 1
                line = "#" * heading_number + " " + line.replace("#", "")
        elif line.startswith("```") and code:
            code = False
        output += line + "\n"
    return output


def strip_comments(markdown):
    return re.sub(r"%%.*?%%", "", markdown, flags=re.DOTALL)


def fix_tags(metadata):
    tags = metadata.get("tags", None) or metadata.get("tag", None)
    if tags and isinstance(tags, str):
        tags = tags.split("/")
        tags = [tag.strip() for tag in tags]
        metadata["tags"] = tags
    return metadata


def _read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except Exception:
        return ""


def _parse_frontmatter(text: str) -> dict:
    if not text.startswith("---"):
        return {}
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n?", text, re.DOTALL)
    if not match:
        return {}
    try:
        return yaml.safe_load(match.group(1)) or {}
    except Exception:
        return {}


def _normalize_bool(value) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.strip().lower() == "true"
    return False


def _normalize_tags(value) -> list:
    if value is None:
        return []
    if isinstance(value, list):
        return [str(v).strip().lstrip("#") for v in value if str(v).strip()]
    if isinstance(value, str):
        return [value.strip().lstrip("#")] if value.strip() else []
    return []


def _strip_ext(link: str) -> str:
    return re.sub(r"\.md$", "", link.strip(), flags=re.IGNORECASE)


def _clean_wikilink_target(target: str) -> str:
    target = target.strip()
    target = target.split("#")[0].strip()
    return _strip_ext(target)


def _clean_markdown_target(target: str) -> str:
    target = target.strip()
    target = target.split("#")[0].strip()
    target = target.split("?")[0].strip()
    return _strip_ext(target)


def _build_page_index(config) -> dict:
    docs_dir = Path(config["docs_dir"])
    index = {}

    for md_file in docs_dir.rglob("*.md"):
        text = _read_text(md_file)
        fm = _parse_frontmatter(text)

        rel_path = md_file.relative_to(docs_dir).as_posix()
        rel_no_ext = _strip_ext(rel_path)
        file_name = md_file.stem

        title = fm.get("title") or file_name.replace("_", " ")
        share = _normalize_bool(fm.get("share", False))
        tags = _normalize_tags(fm.get("tags"))

        index[rel_no_ext.lower()] = {
            "title": title,
            "share": share,
            "tags": tags,
            "path": rel_no_ext,
            "name": file_name,
        }

    return index


def _resolve_note_target(raw_target: str, current_page_path: str, page_index: dict):
    raw_target = raw_target.strip()
    if not raw_target:
        return None

    raw_target = _strip_ext(raw_target)
    current_dir = str(Path(current_page_path).parent).replace("\\", "/")
    raw_name = Path(raw_target).name.lower()

    candidates = [raw_target]

    if current_dir and current_dir != ".":
        rel_candidate = str(Path(current_dir, raw_target)).replace("\\", "/")
        candidates.append(rel_candidate)

    for candidate in candidates:
        meta = page_index.get(candidate.lower())
        if meta:
            return meta

    for _, meta in page_index.items():
        if Path(meta["path"]).name.lower() == raw_name:
            return meta

    return None


def _replace_unshared_wikilinks(markdown: str, current_page_path: str, page_index: dict) -> str:
    pattern = re.compile(r"\[\[([^\]\|#]+)(#[^\]\|]+)?(?:\|([^\]]+))?\]\]")

    def repl(match):
        target = _clean_wikilink_target(match.group(1))
        alias = match.group(3)

        meta = _resolve_note_target(target, current_page_path, page_index)
        if not meta:
            return alias or Path(target).name.replace("_", " ")

        if meta["share"]:
            return match.group(0)

        return alias or meta["title"]

    return pattern.sub(repl, markdown)


def _replace_unshared_markdown_links(markdown: str, current_page_path: str, page_index: dict) -> str:
    pattern = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")

    def repl(match):
        label = match.group(1)
        target = match.group(2).strip()

        if (
            target.startswith("http://")
            or target.startswith("https://")
            or target.startswith("mailto:")
            or target.startswith("#")
        ):
            return match.group(0)

        cleaned = _clean_markdown_target(target)
        meta = _resolve_note_target(cleaned, current_page_path, page_index)

        if not meta:
            return match.group(0)

        if meta["share"]:
            return match.group(0)

        return label

    return pattern.sub(repl, markdown)


def _build_saros_at_a_glance_table(page_index: dict) -> str:
    shared_pages = [p for p in page_index.values() if p["share"]]
    total_files = len(shared_pages)
    total_npcs = sum(1 for p in shared_pages if "NPC" in p["tags"])
    total_towns_ports = sum(
        1 for p in shared_pages if "Town" in p["tags"] or "Port" in p["tags"]
    )

    return "\n".join(
        [
            "| Category | Count |",
            "|---|---:|",
            f"| Total Files | {total_files} |",
            f"| NPCs | {total_npcs} |",
            f"| Towns & Ports | {total_towns_ports} |",
        ]
    )


def on_page_markdown(markdown, files, page, config, **kwargs):
    config_hooks = config.get(
        "extra", {"hooks": {"strip_comments": True, "fix_heading": False}}
    ).get("hooks", {"strip_comments": True, "fix_heading": False})

    if config_hooks.get("strip_comments", True):
        markdown = strip_comments(markdown)

    if config_hooks.get("fix_heading", False):
        markdown = update_heading(markdown)

    metadata = fix_tags(page.meta)
    page.meta = metadata

    page_index = _build_page_index(config)
    current_page_path = _strip_ext(page.file.src_path.replace("\\", "/"))

    markdown = _replace_unshared_wikilinks(markdown, current_page_path, page_index)
    markdown = _replace_unshared_markdown_links(markdown, current_page_path, page_index)

    if "{{ SAROS_AT_A_GLANCE }}" in markdown:
        markdown = markdown.replace(
            "{{ SAROS_AT_A_GLANCE }}",
            _build_saros_at_a_glance_table(page_index),
        )

    markdown = non_breaking_space(markdown)
    return markdown
