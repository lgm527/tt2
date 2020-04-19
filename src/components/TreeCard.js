import React from 'react';
import '../style/TreeCard.scss';

export default function TreeCard(props) {

  const { normalizeString, tree, backToMap } = props

  const normalizedTree = {
    ...tree,
    spc_common: normalizeString(tree.spc_common),
    address: normalizeString(tree.address),
    spc_latin: normalizeString(tree.spc_latin)
  }

  const { health, steward, spc_common, address, zip_city, zipcode, status, spc_latin } = normalizedTree;

  return(
    <div className='treeCard'>
      <p><b>Species:</b> {spc_common} <i>({spc_latin})</i></p>
      <p><b>Location:</b> {address} {zip_city}, NY {zipcode}
      </p>
      <p><b>Status:</b> {status}</p>
      <p><b>Health:</b> {health}</p>
      <p><b>Steward:</b> {steward}</p>
      <p>Would you like to take care of this tree? Email the <span role='img' aria-label='tree'>🌳</span>'s info:</p>
      <p>Enter Email: PLACEHOLDER for email input and send button <span role='img' aria-label='envelope'>✉️</span></p>
      <p onClick={backToMap} id='arrow'>⬅︎ back to map ⬅︎</p>
    </div>
  )

}
