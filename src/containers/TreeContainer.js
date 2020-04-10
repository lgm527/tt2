import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import TreeCard from '../components/TreeCard';

export class TreeContainer extends Component {

  state = {
    trees: [],
    clicked: false,
    treeSelected: {},
  }

  fetchTrees() {
    fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.json?&status=Alive&steward=None`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-App-Token': 'muZjL5D3H5UGU2TUlPOR4IjM6'
      }
    })
    .then(res => res.json())
    .then(theTrees => {
      this.setState({
        trees: theTrees
      })
    })
  }

normalizeString = (str) => {
  let res
  let theString
    if (str !== undefined && str !== null) {
      theString = str.replace(/[^a-zA-Z\d\s:]*/g, '')
      if (str.includes(' ')){
      let words = theString.split(' ')
      let result = []
      words.forEach((word) => {
        result.push( word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() )
      })
      res = result.join(' ')
      } else {
        res = theString.charAt(0).toUpperCase() + theString.slice(1).toLowerCase()
      }
    }
    return res
  }

  handleClick = (props, marker, e) => {
    this.setState({ treeSelected: props.tree, clicked: true });
    // reset map's center orientation when going back to view full map
  }

  componentDidMount() {
    this.fetchTrees();
  }

  backToMap = () => {
    this.setState({ treeSelected: {}, clicked: false })
  }

  render() {
    const { normalizeString, handleClick, backToMap } = this;
    const { treeSelected, clicked } = this.state;

    const theTrees = this.state.trees.map((tree) => {
      return <Marker
            position={{lat: tree.latitude, lng: tree.longitude}}
            icon={{url: 'http://maps.google.com/mapfiles/ms/icons/tree.png'}}
            onClick={handleClick}
            key={tree.tree_id}
            tree={tree}
            style={{cursor: 'pointer'}}
          />
    })

    return (
      <div>
        { clicked ?
          <TreeCard
          tree={treeSelected}
          normalizeString={normalizeString}
          backToMap={backToMap}
          />
          : <Map
              google={this.props.google}
              zoom={14}
              center={{lat: 40.703316, lng: -73.988145}}
              style={{width: '30%', height: '60%', margin: '1% 0 0 15%', cursor: 'pointer'}}
              yesIWantToUseGoogleMapApiInternals={true}
              >
              {theTrees}
            </Map> }
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY
})(TreeContainer)
