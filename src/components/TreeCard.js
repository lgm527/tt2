import React, {Component} from 'react'

export default class TreeCard extends Component {

  render() {

    const { normalizeString, tree, backToMap } = this.props
    const { health, steward, spc_common, address, zip_city, zipcode, status, spc_latin } = tree;
    return(
      <div className='treeCard'>
        <p><b>Species:</b> {normalizeString(spc_common)} <i>({normalizeString(spc_latin)})</i></p>
        <p><b>Location:</b> {normalizeString(address)} {normalizeString(zip_city)}, NY {normalizeString(zipcode)}
        </p>
        <p><b>Status:</b> {normalizeString(status)}</p>
        <p><b>Health:</b> {normalizeString(health)}</p>
        <p><b>Steward:</b> {steward}</p>
        <p>⬅︎</p>
      </div>
    )
  }
}
