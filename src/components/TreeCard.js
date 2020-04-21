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

  const { health, steward, spc_common, address, zip_city, zipcode, status, spc_latin } = normalizedTree;
  const fullAddress = `${address} ${zip_city}, NY ${zipcode}`

  return(
    <div className='treeCard'>
      <p><b>Species:</b> {spc_common} <i>({spc_latin})</i></p>
      <p><b>Location:</b> {fullAddress}
      </p>
      <p><b>Status:</b> {status}</p>
      <p><b>Health:</b> {health}</p>
      <p><b>Steward:</b> {steward}</p>
      <p>Want to take care of this <span role='img' aria-label='tree'>🌳</span>? Share it's address:</p>
      <EmailTree species={spc_common} address={fullAddress}/>
      <p onClick={backToMap} id='arrow'>⬅︎ back to map ⬅︎</p>
    </div>
  )

}
