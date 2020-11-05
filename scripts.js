const video = document.querySelector('.player');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            const mediaRecorder = new MediaRecorder(localMediaStream)
            console.log(mediaRecorder.ondataavailable)
            console.log(mediaRecorder, 'recorder begin')
            mediaRecorder.start()
            setTimeout(() => {
                console.log("stopping");
                mediaRecorder.stop();
                console.log(mediaRecorder, 'recorder end')
                console.log(mediaRecorder.ondataavailable)
            }, 5000);

            mediaRecorder.ondataavailable = function (e) {
                console.log(e.data, 'avail')
                const blob = new Blob([e.data], { type: 'video/ogg' })
                var videoURL = URL.createObjectURL(blob);
                video.src = videoURL;
                video.play();
            }

            // set video with current stream
            // video.srcObject = localMediaStream;
            // video.play();
        })
        .catch(err => {
            console.error('No webcam!', err)
        })
}

getVideo();


// console.log(mediaRecorder)