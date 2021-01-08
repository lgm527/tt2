import React from 'react';
import { PureComponent } from 'react';
import { Marker } from 'react-map-gl';

export default class Markers extends PureComponent {
    render() {
      const { data, handleClick } = this.props;
      return data.map(
        tree => <Marker tree={tree} latitude={Number(tree.latitude)} longitude={Number(tree.longitude)} key={tree.tree_id}>
            <img
            src='https://maps.google.com/mapfiles/ms/icons/tree.png'
            onClick={() => handleClick(tree)}
            key={tree.tree_id}
            tree={tree}
            style={{cursor: 'pointer'}}
            alt='marker'
            />
          </Marker>
      )
    }
  }