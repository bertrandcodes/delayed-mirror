import React from 'react';
import './App.css';
import Gear from './simple-Gear.svg';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      delay: 5,
      ready: false,
      buttonText: 'GO FULL',
      adjust: false,
      changedDelay: 5
    }
  }

  componentDidMount() {
    this.getVideo(this.state.delay);
  }

  getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(localMediaStream => {
        const chunks = []
        const mediaRecorder = new MediaRecorder(localMediaStream)

        mediaRecorder.start()
        setTimeout(() => {
          mediaRecorder.stop()
          this.setState({ ready: true })
          this.getVideo(this.state.delay)
        }, this.state.delay * 1000);

        mediaRecorder.onstop = () => {
          const video = document.querySelector('.player');
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

  changeQuan = (e) => {
    this.setState({ quan: e.target.value })
  }

  goFull = () => {
    const video = document.querySelector('.player');
    video.classList.toggle('full')
    const title = document.querySelector('.title');
    const sub = document.querySelector('.delay-div');
    if (title.style.display === 'none') {
      title.style.display = 'block';
      sub.style.display = 'block';
      this.setState({ buttonText: 'GO FULL' })
    } else {
      title.style.display = 'none';
      sub.style.display = 'none';
      this.setState({ buttonText: 'GO LOW' })
    }
  }

  adjustDelay = () => {
    this.setState({
      adjust: !this.state.adjust
    })
  }

  handleChange = (e) => {
    this.setState({
      changedDelay: e.target.value
    })
  }

  submit = (e) => {
    if (e.key === 'Enter' && this.state.changedDelay > 0 && this.state.changedDelay < 1000) {
      this.setState({
        delay: this.state.changedDelay,
        adjust: false,
        changedDelay: 5
      })
      window.alert('Currently, changing the delay will freeze up the screen for the duration of new delay time. Simply wait it out and the app should work as expected. Our developer is working on fixing this!')
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="title">THE DANCE MIRROR</div>
        <div className="delay-div">
          {this.state.adjust ?
            <div className="sub"><input onChange={this.handleChange} onKeyDown={this.submit}></input> sec
          </div>
            :
            <div className="sub">Delay: {this.state.delay}s
          </div>
          }
          <img
            className="gear"
            onClick={this.adjustDelay}
            src={Gear}
            alt="gear svg"
            width="20"
            height="20"
          />
        </div>
        {this.state.ready ?
          <video className="player">
          </video>
          :
          <div className="loading">
            <div className="loading-div">
              <div className="loader"> </div>
              <div className="message-holder">
                <div className="messages">
                  <h2>Use Chrome or Firefox</h2>
                  <h2>Make sure you allow webcam access</h2>
                  <h2>Bust a move!</h2>
                  <h2>Mopping the floors...</h2>
                  <h2>Setting up the studio...</h2>
                </div>
              </div>
            </div>
          </div>
        }
        <button onClick={this.goFull} className="full-button" disabled={!this.state.ready}>{this.state.buttonText}</button>

        <div className="mobile-message">
          A webcam is required for the full experience 👀
          </div>

        <div className="share">

          <a className="resp-sharing-button__link" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdancersroom.com%2F&amp;src=sdkpreparse" target="_blank" rel="noopener" aria-label="">
            <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" /></svg>
            </div>
            </div>
          </a>

          <a className="resp-sharing-button__link" href="https://twitter.com/intent/tweet?url=&text=Check%20out%20this%20dance%20app%3A%20https%3A%2F%2Fdancersroom.com%2F" target="_blank" rel="noopener" aria-label="">
            <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" /></svg>
            </div>
            </div>
          </a>

          <a className="resp-sharing-button__link" href="https://www.linkedin.com/shareArticle?url=https://dancersroom.com/&title=Check%20out%20this%20dance%20app" target="_blank" rel="noopener" aria-label="">
            <div className="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z" /></svg>
            </div>
            </div>
          </a>

          <a className="resp-sharing-button__link" href="mailto:%7Bemail_address%7D?subject=The%20Dance%20Mirror&body=https://dancersroom.com/%20" target="_self" rel="noopener" aria-label="">
            <div className="resp-sharing-button resp-sharing-button--email resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z" /></svg>
            </div>
            </div>
          </a>

        </div>
      </React.Fragment>
    );
  }
}

export default App;
