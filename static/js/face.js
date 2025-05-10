window.onload = function () {
  const lang = localStorage.getItem('preferredLanguage') || 'en';
  const video = document.getElementById('video');
  const verifyBtn = document.getElementById('verifyBtn');
  const proceedBtn = document.getElementById('proceedBtn');

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'kn' ? 'kn-IN' : 'en-US';
    speechSynthesis.speak(utterance);
  }

  // Speak on page load
  const welcomeMsg = lang === 'kn'
    ? 'ದಯವಿಟ್ಟು ಮುಖ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಮತ್ತು ಮುಖ ಪರಿಶೀಲನೆ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ'
    : 'Please scan your face and click the verify button';
  speak(welcomeMsg);

  // Start webcam
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream)
    .catch(err => {
      const errorMsg = lang === 'kn'
        ? 'ಕ್ಯಾಮೆರಾ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ'
        : 'Webcam access denied.';
      alert(errorMsg);
      speak(errorMsg);
    });

  verifyBtn.addEventListener('click', async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 240;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const selfieBase64 = canvas.toDataURL('image/jpeg').split(',')[1];

    // Replace with real Aadhaar image base64 from your logic
    const aadhaarBase64 = '...'; // dynamically insert this if needed

    const formData = new FormData();
    formData.append('api_key', 'y7YQtXSf1AGbC16dtxOws1GkLRvcXCXd');
    formData.append('api_secret', 'tA20cYok8rxBqGnRiN-vkKhHVzg8PRTt');
    formData.append('image_base64_1', aadhaarBase64);
    formData.append('image_base64_2', selfieBase64);

    try {
      const response = await fetch('https://api-us.faceplusplus.com/facepp/v3/compare', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.confidence && result.confidence > 75) {
        const successMsg = lang === 'kn'
          ? `ಈ ಕಾರ್ಯವಿಧಾನವನ್ನು ಮಾಡಲಾಗಿದೆ.: ${Math.round(result.confidence)}`
          : `this procedure has been done: ${Math.round(result.confidence)}`;
        alert(successMsg);
        speak(successMsg);

        const fraudResponse = await fetch('/update_face_fraud_score', {
          method: 'POST',
        });

        if (fraudResponse.ok) {
          console.log('Fraud score updated.');
        }

        proceedBtn.style.display = 'block';
        const proceedMsg = lang === 'kn'
          ? 'ದಯವಿಟ್ಟು ಮುಂದುವರೆಯಲು ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ'
          : 'Please click the proceed button';
        speak(proceedMsg);

      } else {
        const failMsg = lang === 'kn'
          ? 'ಈ ಕಾರ್ಯವಿಧಾನವನ್ನು ಮಾಡಲಾಗಿದೆ.'
          : 'this procedure has been done';
        
        speak(failMsg);
      }

    } catch (error) {
      const errorMsg = lang === 'kn'
        ? 'ಪರಿಶೀಲನೆ ಸಮಯದಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ'
        : 'An error occurred during verification.';
      alert(errorMsg);
      speak(errorMsg);
      console.error(error);
    }
  });
};
