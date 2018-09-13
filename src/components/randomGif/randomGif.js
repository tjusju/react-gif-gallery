import React, { Component } from 'react';

import './randomGif.css'

class RandomGif extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageSrc: '',
      sentUrl: false,
      onError: '',
      open: false
    }
  }
  
  componentDidMount() { 
     this.loadImage()
  }

  componentDidUpdate() {
    if(!this.state.sentUrl) {
      let src = this.state.imageSrc
      this.props.setGifUrl(src)
      this.setState({
        sentUrl: true
      })
    }
  }

  loadImage = () => {
      
    let url = 'https://api.giphy.com/v1/gifs/random?api_key=NOW0iI1GW7B0vdBl0qQoD5l8HUIBJXw8&tag=&rating=G'

     fetch(url)
       .then(response => response.json())
       .then(res => this.setState({ imageSrc: res.data.image_url}))
       .catch((res) => {console.log('ERROR: No image from API!');
      })
   }
 
  onOpenModal = (e) => {
    let mainImgIndex = e.target.id
    this.props.setNeighborGifUrl(mainImgIndex)
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {

    return(
      <div className={"randomGif"}>
        <div id={"fullscreenModal"} 
          className={this.state.open ? "randomGif-modal show" : "randomGif-modal hide"}>
          <div className={"main-image-container"}>
            <img
              className={"main-image"} 
              src={this.state.imageSrc}
              />
          </div>
          <div className={"bottom-row"}>
              {/* <img
                id={"prev-image"}
                src={this.props.prevImgSrc}
                /> */}
              
              <button 
                  onClick={this.onCloseModal}
                  id={"btn-close"}>
                  &times;
              </button>
            
              {/* <img
                id={"next-image"}
                src={this.props.nextImgSrc}
                /> */}
              </div>
          </div>
          
            <img
                onClick={(e) => this.onOpenModal(e)}
                onLoad={this.props.finishedLoadingImg} 
                src={this.state.imageSrc} 
                alt="Random GIF"
                id={this.props.id}
                className={"randomGif-img"} />
          </div>
 
    );
  }
}

export default RandomGif;