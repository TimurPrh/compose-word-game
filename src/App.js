import React from 'react';
import './App.css';
import SourceList from './components/sourceList/SourceList';
import TargetList from './components/targetList/TargetList';

const App = () => {
  return (
    <div className='container'>
      <div className='wrapper'>
        <TargetList />
        <SourceList />
        
      </div>
    </div>
  );
};

export default App;