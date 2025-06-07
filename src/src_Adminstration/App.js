import React, { useEffect, useState } from 'react';
import axios from 'axios'; // استيراد مكتبة axios

import './Design.css';
import LeftNav from './classes/Leftnav';
import Header from './classes/Header';
import Liste from './classes/listeleve';

const App = () => {



  return (
    <div className="App">
      <Header />
      <div className='content'>
        <LeftNav />
        <Liste />
      </div>
    </div>
  );
};

export default App;
