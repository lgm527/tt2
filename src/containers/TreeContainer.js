import React, { Component } from 'react';

export default class TreeContainer extends Component {

  state = {
    trees: []
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

  componentDidMount() {
    this.fetchTrees();
  }

  render() {

    console.log(this.state.trees);
    return (
      <div>hi</div>
    )
  }
}
