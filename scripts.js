const video = document.querySelector('.player');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            const chunks = []
            const mediaRecorder = new MediaRecorder(localMediaStream)

            const record = () => {
                mediaRecorder.start()
                setTimeout(() => {
                    // console.log("stopping");
                    mediaRecorder.stop()
                    // console.log(mediaRecorder, 'recorder end')
                    // console.log(mediaRecorder.ondataavailable)
                    getVideo()
                }, 5000);
            }

            record()

            mediaRecorder.onstop = e => {
                const blob = new Blob(chunks, { type: 'video/ogg' })
                var videoURL = URL.createObjectURL(blob);
                video.src = videoURL;
                video.play();
            }

            mediaRecorder.ondataavailable = e => {
                chunks.push(e.data);
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