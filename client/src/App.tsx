import React, { useState } from 'react';

const App = () => {
  // State variables
  const [context, setContext] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [isError,setIsError] = useState(false);
  // Handle file selection
  const handleFileChange = (event) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setImages(fileList);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('context', context);
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });

    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setMessage('Test cases generated successfully!');
      setIsError(true);
      setTestCases(data);
    } catch (error) {
      setMessage('Failed to generate test cases.');
      setIsError(false);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold  mb-4 text-center">Testing Instructions</h1>


        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Enter optional context"
          className="w-full h-32 p-4 border border-gray-300 rounded-lg mb-4"
        />

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 text-white font-bold rounded-lg ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Processing...' : 'Describe Testing Instructions'}
        </button>

        {message && (
          <div className={`mt-4 p2 text-center text-white rounded-lg ${isError ? 'bg-green-500':'bg-red-500'}`}>

            {message}
          </div>
        )}
        {testCases.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Generated Test Cases</h2>
            <ul>
              {testCases.map((testCase, index) => (
                <li key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
                  <h3 className="font-semibold">Description:</h3>
                  <p>{testCase.description}</p>

                  {testCase.pre_conditions && (
                    <>
                      <h4 className="font-semibold">Pre-conditions:</h4>
                      <p>{testCase.pre_conditions}</p>
                    </>
                  )}

                  {testCase.steps && (
                    <>
                      <h4 className="font-semibold">Testing Steps:</h4>
                      <p>{testCase.steps}</p>
                    </>
                  )}

                  {testCase.expected_result && (
                    <>
                      <h4 className="font-semibold">Expected Result:</h4>
                      <p>{testCase.expected_result}</p>
                    </>
                  )}

                  {testCase.post_conditions && (
                    <>
                      <h4 className="font-semibold">Post-conditions:</h4>
                      <p>{testCase.post_conditions}</p>
                    </>
                  )}

                  {testCase.notes && (
                    <>
                      <h4 className="font-semibold">Notes:</h4>
                      <p>{testCase.notes}</p>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
