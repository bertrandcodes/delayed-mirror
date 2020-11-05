const video = document.querySelector('.player');
const inputBox = document.querySelector('#delay-input')

getVideo = (delay) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            const chunks = []
            const mediaRecorder = new MediaRecorder(localMediaStream)

            mediaRecorder.start()
            setTimeout(() => {
                mediaRecorder.stop()
                getVideo()
            }, 5000);


            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/ogg' })
                var videoURL = URL.createObjectURL(blob);
                video.src = videoURL;
                video.play();
            }

            mediaRecorder.ondataavailable = e => {
                chunks.push(e.data);
            }

        })
        .catch(err => {
            console.error('No webcam!', err)
        })
}

getVideo(5);

update = () => {
    console.log(inputBox.value)
}