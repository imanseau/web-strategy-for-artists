from bs4 import BeautifulSoup, NavigableString

filepath = "exercises/index.html"

def is_inline_tag(tag):
    return tag.name in ['a', 'strong', 'em', 'code', 'span', 'b', 'i', 'u']

try:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    soup = BeautifulSoup(content, "html.parser")
    modified_overall = False

    for exercise_div in soup.find_all("div", class_="exercise"):
        elements_to_process = [
            exercise_div.find("div", class_="filename"),
            exercise_div.find("div", class_="concept"),
            exercise_div.find("div", class_="prompt")
        ]

        for target_div in elements_to_process:
            if not target_div:
                continue

            original_html = str(target_div) # For comparison later
            current_new_children = []

            for child in target_div.contents:
                if isinstance(child, NavigableString):
                    text = child.string
                    # Replace all forms of whitespace (newline, tab, multiple spaces) with a single space,
                    # then strip leading/trailing spaces from this specific segment.
                    processed_text = " ".join(text.split())

                    if not processed_text: # Skip if it becomes an empty string
                        continue

                    # If current_new_children is not empty, and the last element was a text node that didn't end with a space
                    if current_new_children and isinstance(current_new_children[-1], NavigableString) and \
                       not current_new_children[-1].string.endswith(" "):
                        current_new_children.append(NavigableString(" "))
                    # Or, if the last element was a tag, and it's an inline tag (implying text should follow with a space)
                    elif current_new_children and not isinstance(current_new_children[-1], NavigableString) and \
                         is_inline_tag(current_new_children[-1]):
                         current_new_children.append(NavigableString(" "))

                    current_new_children.append(NavigableString(processed_text))

                else: # It's a tag
                    # If current_new_children is not empty...
                    if current_new_children:
                        # ...and the last element was a text node that didn't end with a space...
                        if isinstance(current_new_children[-1], NavigableString) and \
                           not current_new_children[-1].string.endswith(" "):
                            current_new_children.append(NavigableString(" "))
                        # ...or if the last element was also an inline tag (e.g. <strong><a>...</a></strong>)
                        elif not isinstance(current_new_children[-1], NavigableString) and \
                             is_inline_tag(current_new_children[-1]) and is_inline_tag(child):
                             current_new_children.append(NavigableString(" "))

                    current_new_children.append(child)

            # Final cleanup: if the list starts or ends with a NavigableString that is just a space, remove it.
            if current_new_children and isinstance(current_new_children[0], NavigableString) and current_new_children[0].string.isspace():
                current_new_children.pop(0)
            if current_new_children and isinstance(current_new_children[-1], NavigableString) and current_new_children[-1].string.isspace():
                current_new_children.pop(-1)

            # Check if actual changes were made before clearing and appending
            # This requires serializing current_new_children and comparing to original innerHTML of target_div
            # A simpler check: compare string representations after processing

            temp_div = soup.new_tag('div') # Create a temporary div to hold new children
            for new_child in current_new_children:
                temp_div.append(new_child)

            # Compare inner HTML structure (ignoring the outer div tag itself)
            if target_div.decode_contents() != temp_div.decode_contents():
                target_div.clear()
                for new_child in current_new_children: # current_new_children already has cloned elements
                    target_div.append(new_child)
                modified_overall = True
                # print(f"Modified {target_div.get('class')}")


    if modified_overall:
        # Write back the modified soup. Using prettify() can re-introduce some newlines,
        # but for overall structure it's usually better than a raw str(soup) if manual edits are expected later.
        # However, the goal here is very specific newline control, so str(soup) might be better.
        # Let's test with str(soup) first.
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(str(soup))
        print(f"Successfully refined whitespace/newlines in {filepath}")
    else:
        print(f"No whitespace/newline modifications seemed necessary in {filepath} based on the script's logic.")

except FileNotFoundError:
    print(f"Error: File {filepath} not found.")
except Exception as e:
    print(f"An error occurred during HTML refinement: {str(e)}")
