import React from 'react';
import './style/App.css';
import TreeContainer from './containers/TreeContainer';
import tt2 from './assets/tt2.png';

function App() {
  return (
    <div className="App">
      <img src={tt2} className="tt2-logo" alt="logo" />
      <TreeContainer />
    </div>
  );
}

export default App;
