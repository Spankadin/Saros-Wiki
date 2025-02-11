from bs4 import BeautifulSoup

def on_post_page(output, page, config) -> str:
    soup = BeautifulSoup(output, "html.parser")

    # Only modify links outside tables
    for a_tag in soup.find_all("a", {"class": "ezlinks_not_found"}):
        # Skip links inside tables (Dataview-generated)
        if a_tag.find_parent("table"):
            continue
        
        a_tag["class"] = a_tag.get("class", []) + ["ezlinks_not_found"]
        new_tag = soup.new_tag("span")
        new_tag.string = a_tag.string or a_tag.get("href", "File not found")
        
        # Copy all attributes except href
        for attr in a_tag.attrs:
            if attr != "href":
                new_tag[attr] = a_tag[attr]
        
        new_tag["src"] = a_tag["href"]
        a_tag.replaceWith(new_tag)

    return str(soup)

