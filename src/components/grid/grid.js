import React, { Component } from 'react';

import Spinner from 'react-spinkit'
import BottomScrollListener from 'react-bottom-scroll-listener'

import './grid.css'
import RandomGif from '../randomGif/randomGif';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfGifs: 20,
      noOfGifsLoaded: 0,
      noOfNewGifs: 4,
      imageSrcArray: [],
      gifsArray: [],
      showTips: true,
      prevImgSrc: "",
      nextImgSrc: ""
    };

  }

  componentDidMount() {
    this.generateGifs()
  }
  
  componentWillUpdate() {
    if (this.state.noOfGifsLoaded === this.state.gifsArray.length - 1) {
      this.props.handleLoadingDone()
    }
  }

  finishedLoadingImg = () => {
    this.setState({
      noOfGifsLoaded: this.state.noOfGifsLoaded + 1
    })
  }

  // Making sure Grid has all GIF-URL's
  setGifUrl = (url) => {
    let urlArray = this.state.imageSrcArray
    urlArray.push(url)
    this.setState({
       imageSrcArray: urlArray
     })
   }

  setNeighborGifUrl = (mainIndex) => {

    let prevImgIndex = mainIndex - 1
    let nextImgIndex = mainIndex + 1
    let imageSrcArray = this.state.imageSrcArray

    if (prevImgIndex >= 0) {
      this.setState({
        prevImgSrc: imageSrcArray[prevImgIndex]
      })
    }
    else if (nextImgIndex <= this.state.imageSrcArray.length) {
      this.setState({
        nextImgSrc: imageSrcArray[nextImgIndex]
      })
    }
    else if (prevImgIndex < 0) {
      this.setState({
        prevImgSrc: ""
      })
    }
    else if (nextImgIndex > this.state.imageSrcArray.length) {
      this.setState({
        nextImgSrc: ""
      })
    }
  }

  // Creation of GIF's on load
  generateGifs = () => {
    let gifsArray = []
    let i = 0
    
    for (i = 0; i < this.state.noOfGifs; i++) {
        gifsArray.push(
              <RandomGif 
                setGifUrl={this.setGifUrl}
                setNeighborGifUrl={this.setNeighborGifUrl}
                finishedLoadingImg={this.finishedLoadingImg}
                key={i} 
                id={i}
                />)
      }
    this.setState({
      gifsArray: gifsArray
    })
  }

  addMoreGifs = () => {
    this.props.handleLoadingStarting()
    let updatedGifsArray = []
    let i = 0
    for (i = 0; i < this.state.noOfNewGifs; i++) {
        updatedGifsArray.push(
          
          <RandomGif 
            setGifUrl={this.setGifUrl}
            setNeighborGifUrl={this.setNeighborGifUrl}
            finishedLoadingImg={this.finishedLoadingImg}
            key={i+this.state.gifsArray.length} 
            id={i+this.state.gifsArray.length}
            />
          
          )
      }
    let joinedArrays = this.state.gifsArray.concat(updatedGifsArray)
    this.setState({
      gifsArray: joinedArrays
    })
  }

  onCloseTips = () => {
    this.setState({
      showTips: false
    })
  }

  render() {
    return (
      <div className="grid-container">
        {
          this.props.loading ? 
            <div className={"loading-container"}>
              <Spinner 
                  className={"loading-spinner"}
                  name={"pulse"}
                  color={"#5F7BDF"}
                  /> 
              <div style={{color: "#5F7BDF", opacity: "0.6"}}>
                Laddar {this.state.noOfGifsLoaded} av {this.state.gifsArray.length}
              </div>
            </div>
          : 
            null 
        }
            
        <div className={this.props.loading ? 
                          "items loading" : 
                          "items not-loading"}>
          {this.state.gifsArray}
        </div>

        <BottomScrollListener debounce={400} onBottom={this.addMoreGifs} />

        {this.props.loading ?
          null : 
          <div>
            {this.state.showTips ?
              <div id={"bottom-scroll"}>
                Scrolla längst ner för att automatiskt ladda in flera GIF:s
                <button 
                      onClick={this.onCloseTips}
                      id={"btn-close-tips"}>
                      &times;
              </button>
              </div> 
              
              : null }
            
            </div>
        }
      </div>
    )
  }
}

export default Grid;
