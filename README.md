# Testing Instructions Generator

## Overview
This repository contains the code for a tool that uses a multimodal Large Language Model (LLM) to generate testing instructions for any digital product's features based on uploaded screenshots. The tool allows users to upload screenshots, provide optional context, and receive detailed testing instructions, including pre-conditions, testing steps, expected results, post-conditions, and notes.

## Features
- **Screenshot Upload:** Users can upload one or more screenshots to the tool.
- **Contextual Input:** Users can provide additional context to guide the generation of test cases.
- **Automated Test Case Generation:** The tool generates structured testing instructions that cover all necessary aspects of a comprehensive test case.

## Technologies Used
- **Frontend:** React.js for a responsive and interactive user interface.
- **Backend:** Flask for handling requests and integrating with the LLM API.
- **Multimodal LLM:** Google Gemini API for generating test case content based on the screenshots and context provided.
- **Image Processing:** Python Imaging Library (PIL) for handling image uploads.

## Installation

### Prerequisites
- **Node.js**: Required to run the frontend.
- **Python 3.x**: Required to run the backend.
- **Pip**: Python package manager.

### Setup Instructions

#### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

#### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Add your Google Gemini API key to the `API.yml` file:
   ```yaml
   key: 'YOUR_GOOGLE_GEMINI_API_KEY'
   ```
5. Start the Flask server:
   ```bash
   flask run
   ```

### Usage
1. Open your web browser and navigate to `http://localhost:3000`.
2. Enter any optional context in the text area provided.
3. Upload one or more screenshots using the file input.
4. Click on "Describe Testing Instructions" to generate the test cases.
5. The generated test cases will be displayed below the form.

## Prompting Strategy
The backend code leverages the Google Gemini API to generate test cases by sending a carefully crafted prompt that includes both the uploaded images and any user-provided context. The prompt is structured to enforce a specific format for the generated test cases:

- **Description**: What the test case is about.
- **Pre-conditions**: What needs to be set up or ensured before testing.
- **Testing Steps**: Clear, step-by-step instructions on how to perform the test.
- **Expected Result**: What should happen if the feature works correctly.
- **Post-conditions**: What needs to be verified after testing.
- **Notes**: Additional information relevant to the test case.

The response from the API is then parsed and structured into a JSON format to be rendered on the frontend. This approach ensures that the test cases are comprehensive, consistent, and formatted correctly.

**[Include specific details about any particular strategies used in crafting the prompt, handling edge cases, or processing the API responses.]**

## Screenshots
**[Include screenshots of the application in use, showcasing the key features and generated test cases.]**

