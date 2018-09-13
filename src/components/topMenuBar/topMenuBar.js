import React, { Component } from 'react';

import './topMenuBar.css'

class TopMenuBar extends Component {

    render() {
        return(
            <div className={"top-menu-bar"}>
                <span 
                    id={"menu-globe"} 
                    role={"img"}>     
                        &#127757;
                </span>
                <div 
                    id={"menu-text"}>
                        GIPHLAR
                </div>
                <span 
                    id={"btn-refresh"} 
                    role={"img"} 
                    onClick={this.props.refreshPage}>
                        &#8635;
                </span>
            </div>
        )
    }

}

export default TopMenuBar;