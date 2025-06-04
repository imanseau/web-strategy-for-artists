import os
from bs4 import BeautifulSoup

filepath = "exercises/index.html"

try:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    soup = BeautifulSoup(content, "html.parser")

    modified = False
    # Find all divs with class 'exercise' to iterate through each exercise block
    exercise_divs = soup.find_all("div", class_="exercise")
    if not exercise_divs:
        print(f"No divs with class 'exercise' found in {filepath}")

    for exercise_div in exercise_divs:
        prompt_div = exercise_div.find("div", class_="prompt")
        if prompt_div:
            prompt_label_span = prompt_div.find("span", class_="prompt-label")

            if prompt_label_span and prompt_label_span.get_text(strip=True) == "Prompt:":
                # Check if the label is the first child or very near the start of the prompt_div content
                # This is a heuristic; a more robust check might be needed if structure varies a lot
                # A more direct check: if prompt_label_span is the first significant element
                is_at_start = False
                for child in prompt_div.contents:
                    if child == prompt_label_span:
                        is_at_start = True
                        break
                    if isinstance(child, str) and child.strip(): # non-whitespace text before label
                        break
                    # if child.name and child != prompt_label_span: # another tag before label
                    #    break


                if is_at_start:
                    # Extract the label and its text
                    # Remove leading/trailing whitespace text nodes around the span if they exist within prompt_div
                    while prompt_label_span.previous_sibling and isinstance(prompt_label_span.previous_sibling, str) and not prompt_label_span.previous_sibling.strip():
                        prompt_label_span.previous_sibling.extract()
                    while prompt_label_span.next_sibling and isinstance(prompt_label_span.next_sibling, str) and not prompt_label_span.next_sibling.strip():
                        prompt_label_span.next_sibling.extract()

                    prompt_label_span.extract() # Remove from inside prompt_div

                    # Insert the prompt_label_span before the prompt_div
                    prompt_div.insert_before(prompt_label_span)

                    modified = True
                    print(f"Modified prompt structure for an exercise.")
                else:
                    print("Prompt label found but not at the beginning of the prompt div as expected. Skipping.")
            # else:
                # print("Prompt label span not found or text not 'Prompt:' in a prompt div.")
        # else:
            # print("No prompt div found in an exercise div.")

    if modified:
        # Ensure the output is pretty printed to maintain readability
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(soup.prettify())
        print(f"Successfully updated HTML structure in {filepath}")
    else:
        print(f"No modifications made to {filepath} based on the criteria.")

except FileNotFoundError:
    print(f"Error: File {filepath} not found.")
except Exception as e:
    print(f"An error occurred: {str(e)}")
