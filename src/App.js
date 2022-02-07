import 'normalize.css';
import React from 'react';
import './assets/style.scss';
import Header from './components/Header';
import Todolist from './components/Todolist';
import FunctionBox from './components/FunctionBox';

function App() {
  return (
    <div className="App">
      <Header/>
      <Todolist/>
      <FunctionBox/>
    </div>
  );
}

export default App;
