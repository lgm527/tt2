import React from 'react';

export default function TreeCard(props) {

  const { normalizeString, tree, backToMap } = props
  const { health, steward, spc_common, address, zip_city, zipcode, status, spc_latin } = tree;

  return(
    <div className='treeCard'>
      <p><b>Species:</b> {normalizeString(spc_common)} <i>({normalizeString(spc_latin)})</i></p>
      <p><b>Location:</b> {normalizeString(address)} {normalizeString(zip_city)}, NY {normalizeString(zipcode)}
      </p>
      <p><b>Status:</b> {normalizeString(status)}</p>
      <p><b>Health:</b> {normalizeString(health)}</p>
      <p><b>Steward:</b> {steward}</p>
      <p onClick={backToMap} style={{cursor: 'pointer', height: '100vh', width: '100vw'}}>⬅︎</p>
    </div>
  )

}
