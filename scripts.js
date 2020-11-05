const video = document.querySelector('.player');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream)
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error('No webcam!', err)
        })
}

getVideo();

// const mediaRecorder = new MediaRecorder()

// console.log(mediaRecorder)