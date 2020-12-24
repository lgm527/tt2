import React from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
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
      zoom: 15
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
          zoom: 15
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
    const { handleClick, backToMap, handleViewportChange, updateNeighborhood } = this;
    const { viewport, clicked, trees, neighborhood, treeSelected } = this.state;

    const theTrees = trees.map((tree) => {
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
        { clicked ? null : <Dropdown updateNeighborhood={updateNeighborhood} neighborhood={neighborhood}/> }
        { clicked ?
          <TreeCard
          tree={treeSelected}
          backToMap={backToMap}
          />
          :
          <>
            <ReactMapGL
              latitude={viewport.latitude}
              longitude={viewport.longitude}
              zoom={viewport.zoom}
              width="100vw"
              height="100vh"
              mapStyle="mapbox://styles/mapbox/light-v9"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              onViewportChange={(viewport) => handleViewportChange(viewport)}
              >
                {theTrees}
                <div style={{position: 'absolute', right: 0}}>
                  <NavigationControl />
                </div>
            </ReactMapGL>
          </> 
          }
      </div>
    )
  }
}
