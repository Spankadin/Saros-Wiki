from bs4 import BeautifulSoup

def on_post_page(output, page, config) -> str:
    soup = BeautifulSoup(output, "html.parser")

    # Modify only broken links
    for a_tag in soup.find_all("a", {"class": "ezlinks_not_found"}):
        # Skip links inside tables (Dataview-generated)
        if a_tag.find_parent("table"):
            continue
        
        # Keep the link but mark it as broken
        a_tag["class"] = a_tag.get("class", []) + ["broken-link"]
        a_tag["title"] = "Broken link: " + (a_tag.get("href") or "Unknown")

    return str(soup)
