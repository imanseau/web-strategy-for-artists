import os
from bs4 import BeautifulSoup

filepath = "exercises/index.html"
exercise_title_to_find = "Google Fonts Typography Page"

try:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    soup = BeautifulSoup(content, "html.parser")
    modified = False

    # Find all exercise divs
    exercise_divs = soup.find_all("div", class_="exercise")

    found_target_exercise = False
    for exercise_div in exercise_divs:
        h3 = exercise_div.find("h3")
        if h3 and h3.get_text(strip=True) == exercise_title_to_find:
            found_target_exercise = True
            print(f"Found exercise: {exercise_title_to_find}")

            concept_div = exercise_div.find("div", class_="concept")
            if not concept_div:
                print(f"Error: Could not find 'div.concept' within '{exercise_title_to_find}' exercise.")
                continue

            # Find the prompt-label and prompt div within the concept div
            prompt_label_span_in_concept = concept_div.find("span", class_="prompt-label")
            prompt_div_in_concept = concept_div.find("div", class_="prompt")

            if prompt_label_span_in_concept and prompt_div_in_concept:
                # Ensure they are children of concept_div before extracting
                if prompt_label_span_in_concept.parent == concept_div and \
                   prompt_div_in_concept.parent == concept_div:

                    # Extract them
                    # Need to handle potential whitespace text nodes around them if they affect .extract()
                    # or .insert_after() behavior significantly for prettify.

                    # Extracting them carefully
                    label_to_move = prompt_label_span_in_concept.extract()
                    prompt_to_move = prompt_div_in_concept.extract()

                    # Insert them after the concept_div, within the exercise_div
                    # The order of insertion matters for final placement.
                    # insert_after places the new element immediately after the specified tag.
                    # So, concept_div -> prompt_label_span_extracted -> prompt_div_extracted

                    concept_div.insert_after(prompt_to_move)
                    # Now, prompt_div_extracted is after concept_div.
                    # We want label before prompt_div, so insert label after concept_div as well.
                    concept_div.insert_after(label_to_move)
                    # This will result in: concept_div, label, prompt_div

                    modified = True
                    print(f"Successfully restructured prompt for '{exercise_title_to_find}'.")
                else:
                    print(f"Error: 'span.prompt-label' or 'div.prompt' are not direct children of 'div.concept' for '{exercise_title_to_find}'. Current script logic might not apply.")
            else:
                print(f"Error: Could not find 'span.prompt-label' or 'div.prompt' inside 'div.concept' for '{exercise_title_to_find}'. They might already be moved or missing.")
            break

    if not found_target_exercise:
        print(f"Error: Exercise '{exercise_title_to_find}' not found.")

    if modified:
        # Using prettify to ensure the output HTML is well-formatted
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(soup.prettify())
        print(f"File {filepath} updated successfully.")
    elif found_target_exercise:
        print(f"No modification performed for {exercise_title_to_find}, check structure or errors above. The elements might not be nested as expected.")
    else:
        print(f"No modifications made as target exercise was not found.")


except FileNotFoundError:
    print(f"Error: File {filepath} not found.")
except Exception as e:
    print(f"An error occurred: {str(e)}")
