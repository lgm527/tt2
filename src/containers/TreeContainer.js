import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import TreeCard from '../components/TreeCard';
import '../style/App.css';

export class TreeContainer extends React.Component {

  state = {
    trees: [],
    clicked: false,
    treeSelected: {},
  }

  fetchTrees() {
    fetch('https://data.cityofnewyork.us/resource/uvpi-gqnh.json?&status=Alive&steward=None', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-App-Token': process.env.REACT_APP_TREE_KEY
      }
    })
    .catch(error => console.log(error))
    .then(res => res.json())
    .then(theTrees => {
      this.setState({
        trees: theTrees,
        clicked: false,
        treeSelected: {}
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
    // this.setState({ treeSelected: {}, clicked: false })
    // cannot call setState on component that is not mounted
    this.fetchTrees();
  }

  render() {
    const { normalizeString, handleClick, backToMap } = this;

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
      <div id='tree'>
        { this.state.clicked ?
          <TreeCard
          tree={this.state.treeSelected}
          normalizeString={normalizeString}
          backToMap={backToMap}
          />
          : <Map
              google={this.props.google}
              zoom={14}
              initialCenter={{lat: 40.703316, lng: -73.988145}}
              center={{lat: 40.703316, lng: -73.988145}}
              style={{cursor: 'pointer', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', height: '100%'}}
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
