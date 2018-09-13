import React, { Component } from 'react';
import './App.css';

import TopMenuBar from './components/topMenuBar/topMenuBar'
import Grid from './components/grid/grid'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  handleLoadingDone = () => {
    this.setState({
      loading: false
    })
  }

  handleLoadingStarting = () => {
    this.setState({
      loading: true
    })
  }

  refreshPage = () => {
    window.location.reload(); 
  }

  render() {
      return (
        <div className="App">

          <TopMenuBar refreshPage={this.refreshPage} />

          {/* <LoadingContainer className={this.state.loading ? "loading-container loading" : "loading-container not-loading"} /> */}

          <Grid loading={this.state.loading} 
                handleLoadingDone={this.handleLoadingDone} 
                handleLoadingStarting={this.handleLoadingStarting}/>

        </div>
      );
    }
  }

export default App;
