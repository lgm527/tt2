import gql from 'graphql-tag';

export const GET_TREES = gql`
  query getTrees {
    trees @rest(type: "Trees", path: "?nta_name=Williamsburg&status=Alive&steward=None&$limit=3000") {
      data
    }
}
`
