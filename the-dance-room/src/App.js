import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      delay: 5,
      buttonText: 'GO FULL'
    }
  }

  componentDidMount() {
    const video = document.querySelector('.player');
    const inputBox = document.querySelector('#delay-input')

    const getVideo = function (delay) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
          const chunks = []
          const mediaRecorder = new MediaRecorder(localMediaStream)

          mediaRecorder.start()
          setTimeout(() => {
            mediaRecorder.stop()
            getVideo(delay)
          }, delay * 1000);


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

    getVideo(this.state.delay);
  }

  changeQuan = (e) => {
    this.setState({ quan: e.target.value })
  }

  goFull = () => {
    const video = document.querySelector('.player');
    video.classList.toggle('full')
    const title = document.querySelector('.title');
    if (title.style.display === 'none') {
      title.style.display = 'block';
      this.setState({ buttonText: 'GO FULL' })
    } else {
      title.style.display = 'none';
      this.setState({ buttonText: 'GO LOW' })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className='title'>THE DANCE ROOM</div>
        <video className='player'>
        </video>
        <button onClick={this.goFull} className='full-button'>{this.state.buttonText}</button>
      </React.Fragment>
    );
  }
}

export default App;
