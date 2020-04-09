import React from 'react';
import tt2 from './assets/tt2.png';
import './style/App.css';
import TreeContainer from './containers/TreeContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={tt2} className="tt2-logo" alt="logo" />
        <TreeContainer />
      </header>
    </div>
  );
}

export default App;
