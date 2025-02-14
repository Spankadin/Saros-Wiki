from bs4 import BeautifulSoup

def on_post_page(output, page, config) -> str:
    soup = BeautifulSoup(output, "html.parser")

    for a_tag in soup.find_all("a"):
        # Skip links inside Dataview-generated tables
        if a_tag.find_parent("table"):
            continue

        # Check if the link is broken (marked by ezlinks)
        if "ezlinks_not_found" in a_tag.get("class", []):
            new_tag = soup.new_tag("span")
            new_tag.string = a_tag.string or "File not found"
            
            # Preserve all other attributes except href
            for attr, value in a_tag.attrs.items():
                if attr != "href":
                    new_tag[attr] = value

            a_tag.replace_with(new_tag)
    
    return str(soup)
