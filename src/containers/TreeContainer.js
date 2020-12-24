import React from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import TreeCard from '../components/TreeCard';
import Dropdown from '../components/Dropdown';
import '../style/TreeContainer.scss';
import tt2 from '../assets/tt2.png';

export default class TreeContainer extends React.Component {

  state = {
    trees: [],
    clicked: false,
    treeSelected: {},
    neighborhood: 'Williamsburg',
    neighborhoodURL: 'Williamsburg',
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 14
    }
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
        viewport: {
          latitude: Number(theTrees[50].latitude),
          longitude: Number(theTrees[50].longitude),
          zoom: 14
        }
      })
    })
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

  handleViewportChange = (viewport) => {
    this.setState({viewport})
  }

  render() {
    const { handleClick, backToMap } = this;
    const { viewport } = this.state;

    const theTrees = this.state.trees.map((tree) => {
      return <Marker tree={tree} latitude={Number(tree.latitude)} longitude={Number(tree.longitude)} key={tree.tree_id}>
              <img
              src='https://maps.google.com/mapfiles/ms/icons/tree.png'
              onClick={() => handleClick(tree)}
              key={tree.tree_id}
              tree={tree}
              style={{cursor: 'pointer'}}
              alt='marker'
              />
            </Marker>
    });

    return (
      <div id='tree'>
        <img src={tt2} className='tt2-logo header' alt='logo'/>
        { this.state.clicked ? null : <Dropdown updateNeighborhood={this.updateNeighborhood} neighborhood={this.state.neighborhood}/> }
        { this.state.clicked ?
          <TreeCard
          tree={this.state.treeSelected}
          backToMap={backToMap}
          />
          :
          <div>
            <ReactMapGL
              latitude={viewport.latitude}
              longitude={viewport.longitude}
              zoom={viewport.zoom}
              width="100vw"
              height="80vh"
              mapStyle="mapbox://styles/mapbox/dark-v9"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              onViewportChange={(viewport) => {this.handleViewportChange(viewport)}}
              // style={{cursor: 'pointer', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}
              >
              {theTrees}
              <div style={{position: 'absolute', right: 0}}>
                <NavigationControl />
              </div>
            </ReactMapGL>
          </div> }
      </div>
    )
  }
}
