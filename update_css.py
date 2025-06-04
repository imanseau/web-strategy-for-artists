import re

def update_css_rule(css_content, selector, properties_to_set, properties_to_remove=None):
    '''
    Updates or adds a CSS rule.
    properties_to_set is a dict of prop: value.
    properties_to_remove is a list of prop names.
    This is a simplified parser, assumes rules are not nested and selectors are simple.
    Handles cases where selector might have pseudo-classes by escaping them for regex.
    '''
    if properties_to_remove is None:
        properties_to_remove = []

    # Escape selector for regex, especially if it contains pseudo-classes or special chars
    escaped_selector = re.escape(selector)
    # Allow for space before {
    rule_pattern = re.compile(r"(%s\s*\{)([^}]*)(\})" % escaped_selector, re.DOTALL)
    match = rule_pattern.search(css_content)

    if match:
        existing_props_str = match.group(2)
        props = {}
        # Basic parsing of existing properties
        for line in existing_props_str.split(';'):
            line = line.strip()
            if ':' in line:
                name, val = line.split(':', 1)
                props[name.strip()] = val.strip()

        # Update and add new properties
        for prop, value in properties_to_set.items():
            props[prop] = value

        # Remove specified properties
        for prop_to_remove in properties_to_remove:
            if prop_to_remove in props:
                del props[prop_to_remove]

        # Reconstruct properties string, ensuring consistent formatting
        new_props_list = []
        for name, val in sorted(props.items()): # Sort for consistent output
            new_props_list.append(f"    {name}: {val};")

        if new_props_list:
            new_props_str = "\n" + "\n".join(new_props_list) + "\n"
        else:
            new_props_str = "\n" # Keep empty rule if all props removed, or if it started empty

        updated_rule = f"{match.group(1)}{new_props_str}{match.group(3)}"
        css_content = rule_pattern.sub(updated_rule, css_content)
        print(f"Rule '{selector}' updated.")
    else:
        # Rule doesn't exist, add it
        new_props_list = []
        for prop, value in properties_to_set.items():
            new_props_list.append(f"    {prop}: {value};")

        if new_props_list: # Only add rule if there are properties
            new_props_str = "\n" + "\n".join(new_props_list) + "\n"
            new_rule = f"\n{selector} {{{new_props_str}}}\n"
            css_content += new_rule
            print(f"Rule '{selector}' added.")

    return css_content

css_file_path = "css/pages.css"

try:
    with open(css_file_path, "r", encoding="utf-8") as f:
        original_css = f.read()

    modified_css = original_css

    # Update .prompt-label
    modified_css = update_css_rule(
        modified_css,
        ".prompt-label",
        {"display": "block", "font-weight": "bold", "margin-bottom": "5px"},
        ["margin-top"]
    )

    # Update .prompt - ensure margin-top: 0 and preserve others
    # The helper function `update_css_rule` can handle this by setting margin-top to 0.
    # We need to know existing properties of .prompt if we were to add it from scratch,
    # but if it exists, `update_css_rule` will preserve them.

    # Let's assume .prompt rule exists and just update/set its margin-top.
    # If .prompt might not exist, we'd need to define its full desired state.
    # For this task, we're told to preserve existing properties, so we assume it exists.
    modified_css = update_css_rule(
        modified_css,
        ".prompt",
        {"margin-top": "0"} # This will add/overwrite margin-top, other props preserved by `update_css_rule`
    )


    if modified_css != original_css:
        with open(css_file_path, "w", encoding="utf-8") as f:
            f.write(modified_css)
        print(f"CSS file {css_file_path} updated.")
    else:
        print(f"No changes made to CSS file {css_file_path}, or rules already matched target state.")

except FileNotFoundError:
    print(f"Error: {css_file_path} not found.")
except Exception as e:
    print(f"An error occurred: {str(e)}")
