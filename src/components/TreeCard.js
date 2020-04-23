import React from 'react';
import '../style/TreeCard.scss';
import EmailTree from './EmailTree';

export default function TreeCard(props) {

  const { normalizeString, tree, backToMap } = props

  const normalizedTree = {
    ...tree,
    spc_common: normalizeString(tree.spc_common),
    address: normalizeString(tree.address),
    spc_latin: normalizeString(tree.spc_latin)
  }

  const { health, steward, spc_common, address, zip_city, zipcode, status, spc_latin, tree_dbh, stump_diam } = normalizedTree;
  const fullAddress = `${address} ${zip_city}, NY ${zipcode}`

  return(
    <div className='treeCard'>
      <p><b>Species:</b> {spc_common} <i>({spc_latin})</i></p>
      <p><b>Location:</b> {fullAddress}
      </p>
      <p><b>Status:</b> {status}</p>
      <p><b>Health:</b> {health}</p>
      <p><b>Diameter:</b> {stump_diam === '0' ? tree_dbh : stump_diam} inches</p>
      <p><b>Signs of Stewardship:</b> {steward}</p>
      <p>Want to steward this <span role='img' aria-label='tree'>🌳</span>? Share it's address:</p>
      <EmailTree species={spc_common} address={fullAddress}/>
      <span onClick={backToMap} id='arrow' role='button'>⬅︎ back to map ⬅︎</span>
    </div>
  )

}
