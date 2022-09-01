import './App.css';
import React, { useState } from 'react';
import Editor from './components/Editor'
import Toolbar from './components/Toolbar'

function App() {
  const [value, setValue] = useState('');
  return (
    <>
    <Toolbar value={value} />
    <Editor value={value} setValue={setValue}/>
    </>
  );
}

export default App;
