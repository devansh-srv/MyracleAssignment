from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
import PIL.Image
import re
import yaml
app = Flask(__name__)
CORS(app)

with open(r'../API.yml','r') as file:
    API = yaml.safe_load(file)


# Configure Google Gemini API Key
GOOGLE_API_KEY =API["key"] 
genai.configure(api_key=GOOGLE_API_KEY)
def parse_test_case(text):
    sections = text.split("\n\n")
    # print(sections)
    parsed = {
        'description': sections[0][sections[0].find(":")+1:-2],
        'pre_conditions': sections[1][sections[1].find(":")+1:-2],
        'steps': sections[2][sections[2].find(":")+1:-2],
        'expected_result': sections[3][sections[3].find(":")+1:-2],
        'post_conditions': sections[4][sections[4].find(":")+1:-2],
        'notes': sections[5][sections[5].find(":")+1:-2]
    }
    return parsed

@app.route('/generate', methods=['POST'])
def generate_test_cases():
    context = request.form.get('context')
    images = request.files

    test_cases = []

    try:
        for key, file in images.items():
            # Load the image from the file
            image = PIL.Image.open(file.stream)

            # Initialize the generative model
            model = genai.GenerativeModel(model_name="gemini-1.5-flash")

            # Generate content based on the image and context
            prompt = f'''Generate a detailed, step-by-step test case based on this context: {context}.\nStrictly follow the given format and generate the response accordingly\nEach test case should follow this format:\n
**Description: What the test case is about.**\n
**Pre-conditions: What needs to be set up or ensured before testing. The format of Pre-conditions should be a simple paragraph**\n
**Testing Steps: Clear, step-by-step instructions on how to perform the test. The format should be a simple paragraph**\n
**Expected Result: What should happen if the feature works correctly. The format should be a simple paragraph**\n
**Post-conditions: What needs to be verified after testing. Do not give bullets. Just plain text**\n
**Notes: Additional information relevant to the test case.**'''
            response = model.generate_content([prompt, image])

            # Parse the generated test case
            parsed_test_case = parse_test_case(response.text)
            test_cases.append(parsed_test_case)

    except Exception as e:
        print(f'Error generating test cases: {e}')
        test_cases = [{
            'description': 'Error generating test cases',
            'pre_conditions': 'Context: ' + (context if context else 'No context provided.'),
            'steps': ['Error generating test cases using the Google Gemini AI.'],
            'expected_result': 'No test cases generated.',
            'post_conditions': '',
            'notes': '',
        }]
     # print(test_cases)
    return jsonify(test_cases)

if __name__ == '__main__':
    app.run(debug=True)
