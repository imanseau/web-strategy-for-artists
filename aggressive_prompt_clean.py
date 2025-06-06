from bs4 import BeautifulSoup, NavigableString

filepath = "exercises/index.html"

try:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    soup = BeautifulSoup(content, "html.parser")
    modified_overall = False

    for prompt_div in soup.find_all("div", class_="prompt"):
        original_contents_str = "".join(str(c) for c in prompt_div.contents) # For later comparison

        processed_children = []

        for child in prompt_div.contents:
            if isinstance(child, NavigableString):
                text = child.string
                normalized_text = " ".join(text.split()) # Normalize whitespace
                if normalized_text: # Add only if there's content
                    processed_children.append(NavigableString(normalized_text))
            elif child.name == 'code':
                code_text = child.get_text(separator=" ", strip=True) # Get text, normalize spaces within, strip
                if code_text: # Only if <code> has text
                    # Create a new code tag to avoid modifying the original during iteration if it had complex children
                    new_code_tag = soup.new_tag("code")
                    new_code_tag.string = code_text
                    processed_children.append(new_code_tag)
            else:
                # Keep other tags as they are (e.g., if there were <b>, <i>, etc.)
                # This script assumes simple content in prompt, mostly text and <code>
                processed_children.append(child)

        # Filter out any empty NavigableString objects that might have been created
        processed_children = [pc for pc in processed_children if not (isinstance(pc, NavigableString) and not pc.string)]


        # Join the processed children with single spaces, handling punctuation.
        final_joined_children = []
        for i, current_node in enumerate(processed_children):
            # Append the current node
            final_joined_children.append(current_node)

            # Add a space after this node if it's not the last one
            if i < len(processed_children) - 1:
                next_node = processed_children[i+1]
                prevent_space = False

                # Don't add space if current node is text ending with '(' or next node starts with ')'
                if isinstance(current_node, NavigableString) and current_node.string.endswith("("):
                    prevent_space = True
                if isinstance(next_node, NavigableString) and next_node.string.startswith(")"):
                    prevent_space = True

                # Don't add space if next node starts with common punctuation that should attach
                if isinstance(next_node, NavigableString) and next_node.string:
                    if next_node.string.startswith(('.', ',', ';', ':', '!', '?', ')')):
                        prevent_space = True

                # Don't add space if current node is text ending with certain chars and next is code, or vice-versa
                # Example: "named<code>" or "</code>."
                # This can get very complex; the initial normalization should handle most cases.
                # The current logic focuses on space *between* distinct items from processed_children.

                if not prevent_space:
                    final_joined_children.append(NavigableString(" "))

        prompt_div.clear()
        for node in final_joined_children:
            prompt_div.append(node)

        current_contents_str = "".join(str(c) for c in prompt_div.contents)
        if original_contents_str != current_contents_str:
            modified_overall = True

    if modified_overall:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(str(soup)) # Output modified soup
        print(f"Successfully performed enhanced content rebuilding in `div.prompt` elements in {filepath}")
    else:
        print(f"No further modifications made to `div.prompt` elements in {filepath}.")

except FileNotFoundError:
    print(f"Error: File {filepath} not found.")
except Exception as e:
    print(f"An error occurred: {str(e)}")
