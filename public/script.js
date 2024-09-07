const video = document.getElementById('video');
const message = document.getElementById('message');
const startButton = document.getElementById('startButton');

// تحميل نماذج Face-api.js
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

// تشغيل الفيديو
function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => console.error("خطأ في تشغيل الكاميرا: ", err));
}

// عند الضغط على زر البدء
startButton.addEventListener('click', async () => {
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(video, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender();

        if (detections.length > 0) {
            const { gender, age } = detections[0];
            message.textContent = `الجنس: ${gender === 'male' ? 'ذكر' : 'أنثى'}, العمر المقدر: ${Math.round(age)}`;
        } else {
            message.textContent = "لا يمكن الكشف عن الوجه.";
        }
    }, 1000);
});
