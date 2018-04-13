import React, { Component } from 'react';
import './Track.css';

class Track extends Component {

  renderAction() {
    let isRemoval = false
     if (isRemoval){
       return <a className="Track-action"> - </a>
     } else {
       return <a className="Track-action"> +  </a>
     }
  }

  render() {
    console.log(this.props.track)
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}


export default Track
