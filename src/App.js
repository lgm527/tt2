import React from 'react';
import './style/App.scss';
import TreeContainer from './containers/TreeContainer';
import TreesList from './containers/TreesList';

function App() {
  return (
    <div className='App'>
      <TreesList />
      <div className='footer'>
        Made in
        <span role='img' aria-label='NYC'> 🗽 </span>
        with
        <span role='img' aria-label='heart'> ❤️ </span>
        <a href='https://github.com/lgm527' target='_blank' rel='noopener noreferrer'>@lgm527</a> © 2020
      </div>
    </div>
  );
}

export default App;
