import React from 'react';
import GoogleMapReact from 'google-map-react';
import TreeCard from '../components/TreeCard';
import Dropdown from '../components/Dropdown';
import '../style/TreeContainer.scss';
import styled from 'styled-components';
import tt2 from '../assets/tt2.png';
import { Query } from 'react-apollo';
import { GET_TREES } from '../utils';

const Container = styled.div`
  width: 220px;
  margin: 0 auto;
`

const List = ({ trees }) => (
  <Container>
    {trees.map(tree => (
      <TreeCard
        key={tree.id}
      />
    ))}
  </Container>
)

const TreesList = () => {
  <Query query={GET_TREES}>
  {({ loading, error, data }) => {
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    if (data) {
      return <List trees={data.trees.data} />
    }
    }}
  </Query>
}

export default TreesList;
