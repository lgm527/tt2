import React from 'react';
import GoogleMapReact from 'google-map-react';
import TreeCard from '../components/TreeCard';
import Dropdown from '../components/Dropdown';
import '../style/TreeContainer.scss';
import tt2 from '../assets/tt2.png';
import { Query } from 'react-apollo';
import { GET_TREES } from '../utils';

export default class TreeContainer extends React.Component {

  state = {
    trees: [],
    clicked: false,
    treeSelected: {},
    neighborhood: 'Williamsburg',
    neighborhoodURL: 'Williamsburg',
    center: { lat: 0, lng: 0 }
  }

  fetchTrees(neighborhoodURL) {
    fetch(`https://data.cityofnewyork.us/resource/uvpi-gqnh.json?nta_name=${neighborhoodURL}&status=Alive&steward=None&$limit=3000`, {
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
        treeSelected: {},
        center: {
          lat: Number(theTrees[50].latitude),
          lng: Number(theTrees[50].longitude)
        }
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
    return res;
  }

  handleClick = (tree) => {
    this.setState({ treeSelected: tree, clicked: true });
  }

  componentDidMount() {
    this.fetchTrees(this.state.neighborhoodURL);
  }

  backToMap = () => {
    this.fetchTrees(this.state.neighborhoodURL);
  }

  updateNeighborhood = (neighborhoodURL, neighborhood) => {
    this.setState({ neighborhoodURL: neighborhoodURL, neighborhood: neighborhood });
    this.fetchTrees(neighborhoodURL);
  }

  render() {
    const { normalizeString, handleClick, backToMap } = this;

    const Marker = props => {
      return <img
            src='https://maps.google.com/mapfiles/ms/icons/tree.png'
            onClick={() => handleClick(props.tree)}
            key={props.tree.tree_id}
            tree={props.tree}
            style={{cursor: 'pointer'}}
            alt='marker'
          />
    }

    const theTrees = this.state.trees.map((tree) => {
      return <Marker tree={tree} lat={tree.latitude} lng={tree.longitude} key={tree.tree_id} />
    });

    return (
      <div id='tree'>
        <img src={tt2} className='tt2-logo header' alt='logo'/>
        { this.state.clicked ? null : <Dropdown updateNeighborhood={this.updateNeighborhood} neighborhood={this.state.neighborhood}/> }
        { this.state.clicked ?
          <TreeCard
          tree={this.state.treeSelected}
          normalizeString={normalizeString}
          backToMap={backToMap}
          />
          :
          <div style={{height: '30vh', width: '50%', marginTop: '5%'}}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
              zoom={16}
              defaultCenter={{ lat: 40.70513302, lng: -73.95067344 }}
              center={this.state.center}
              yesIWantToUseGoogleMapApiInternals={true}
              style={{cursor: 'pointer', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}
              >
              {theTrees}
            </GoogleMapReact>
          </div> }
      </div>
    )
  }
}
