import React from 'react';
import GoogleMapReact from 'google-map-react';
import TreeCard from '../components/TreeCard';
import '../style/App.css';
import tt2 from '../assets/tt2.png';

export default class TreeContainer extends React.Component {

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

  handleClick = (tree) => {
    this.setState({ treeSelected: tree, clicked: true });
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
    const wburg = {lat: 40.714700, lng: -73.956120}

    const Marker = props => {
      return <img
            src='http://maps.google.com/mapfiles/ms/icons/tree.png'
            onClick={() => handleClick(props.tree)}
            key={props.tree.tree_id}
            tree={props.tree}
            style={{cursor: 'pointer'}}
            alt='marker'
          />
    }

    const theTrees = this.state.trees.map((tree) => {
      return <Marker tree={tree} lat={tree.latitude} lng={tree.longitude} key={tree.tree_id} />
    })

    return (
      <div id='tree'>
      <img src={tt2} className="tt2-logo" alt="logo" />
        { this.state.clicked ?
          <TreeCard
          tree={this.state.treeSelected}
          normalizeString={normalizeString}
          backToMap={backToMap}
          />
          : <div style={{height: '30vh', width: '50%', marginTop: '5%'}}><GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
              defaultZoom={14}
              defaultCenter={wburg}
              yesIWantToUseGoogleMapApiInternals={true}
              style={{cursor: 'pointer', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}
              >
              {theTrees}
            </GoogleMapReact></div> }
      </div>
    )
  }
}
