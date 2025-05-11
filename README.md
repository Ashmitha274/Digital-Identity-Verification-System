# Digital Identity Verification System

This is a web-based application designed to verify a user's identity through facial recognition, Aadhaar card validation, and optional voice and liveliness detection. It combines real-time media capture with backend processing for accurate and secure identity verification.

---

## Features

- Aadhaar card-based identity verification by uploading an image.
- Real-time webcam capture of the user's face for matching.
- Optional features include liveliness detection and voice input.
- Text extraction from the uploaded Aadhaar card using OCR.
- Clean and responsive web interface suitable for desktop browsers.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python with Flask framework
- **Libraries and Tools**: 
  - OpenCV and Webcam.js for webcam access
  - Tesseract OCR for Aadhaar text extraction
  - Face++ API or similar for face comparison
- **Other Tools**: Bootstrap for styling, dotenv for configuration

---

## Project Structure

```
Digital-Identity-Verification-System/
│
├── app.py                       # Flask application entry point
├── templates/                   # HTML templates for web pages
│   ├── home.html
│   └── face.html
├── static/                      # Static assets like images, JavaScript files, videos
│   ├── assets/                  
│   └── js/
│       └── face.js
├── requirements.txt             # Python libraries required
├── .env                         # Environment variables like API keys
├── logo.png                     # Branding logo
└── README.md                    # Project documentation
```

---

## Installation and Setup Instructions

Follow the steps below to set up and run the project locally on your system.

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/Digital-Identity-Verification-System.git
cd Digital-Identity-Verification-System
```

### Step 2: Create a Virtual Environment (Optional but recommended)

```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### Step 3: Install Dependencies

Install all the required Python packages:

```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```
API_KEY=your_face_api_key
API_SECRET=your_face_api_secret
```

Replace `your_face_api_key` and `your_face_api_secret` with your actual credentials from the face recognition API provider.

### Step 5: Run the Application

Start the Flask server by running:

```bash
python app.py
```

The application will be accessible at `http://127.0.0.1:5000/` in your browser.

---

## How to Use

1. Open the web application in your browser.
2. Click on "Start Verification" to activate the webcam and capture a live image.
3. Upload your Aadhaar card image in the designated section.
4. The backend system will compare the captured face with the Aadhaar card photo and return a result.
5. Additional options like voice input and liveliness check may be used for more secure verification.

---

## Security Recommendations

- Do not share the `.env` file containing sensitive API credentials.
- Use HTTPS in a production environment to protect user data.
- Ensure uploaded files are scanned and validated to avoid malicious content.

---

## Contributing

If you would like to contribute, feel free to fork the repository and submit a pull request with improvements or fixes.

---

## Contact

For any queries or suggestions, please contact the developer at: your.email@example.com