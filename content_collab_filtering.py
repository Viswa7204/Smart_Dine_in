import json

# Function to read JSON file with specified encoding
def read_json_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)  # Load JSON data
        return data
    except FileNotFoundError:
        print(f"The file {file_path} was not found.")
    except json.JSONDecodeError:
        print(f"The file {file_path} contains invalid JSON.")
    except UnicodeDecodeError:
        print(f"Error decoding the file {file_path}. Please check the file's encoding.")



# Example usage
file_path = 'dataset_food\\recipes.json'  # Path to your JSON file


# Sample Recipe Data (As given in JSON format)
recipes = read_json_file(file_path)

# Content-Based Filtering Function
def content_based_filtering(recipes, preference,total_result):
    lower_case_preference = preference.lower()
    filtered_recipes = []
    for recipe in recipes:
        try:
            matches_category = (recipe['RecipeCategory'].strip().lower() == lower_case_preference)
            matches_keywords = any(lower_case_preference in keyword.lower() for keyword in recipe['Keywords'])
            matches_ingredients = any(lower_case_preference in ingredient.lower() for ingredient in recipe['RecipeIngredientParts'])
        except:
            pass
        if matches_category or matches_keywords or matches_ingredients:
            filtered_recipes.append(recipe)
            total_result -= 1
        if total_result == 0:
            break
    
    return filtered_recipes

# Collaborative Filtering Function
def collaborative_filtering(recipes, current_recipe, total_result):
    current_rating = current_recipe['AggregatedRating']
    filtered_recipes = []
    
    for recipe in recipes:
        try:
            if (recipe['AggregatedRating'] if recipe['AggregatedRating']!='NA' else 0.0 ) >= current_rating and recipe['RecipeId'] != current_recipe['RecipeId']:
                filtered_recipes.append(recipe)
                total_result -= 1
        except:
            pass
        if total_result == 0:
                break
    return filtered_recipes

# Example Usage
user_preference = input("Enter the user preference: ").strip()  # Simulating user preference for filtering
number_list = int(input("Enter no. of recommendations: "))
content_filtered = content_based_filtering(recipes, user_preference,number_list)
print("Content-Based Filtering Results:")
for recipe in content_filtered:
    print(f"- {recipe['Name']} (Rating: {recipe['AggregatedRating']})")

# Assuming we want to filter based on the first recipe (Pie) for collaborative filtering
current_recipe = recipes[0]
collab_filtered = collaborative_filtering(recipes, current_recipe,number_list)
print("\nCollaborative Filtering Results:")
for recipe in collab_filtered:
    print(f"- {recipe['Name']} (Rating: {recipe['AggregatedRating']})")
