import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route, Redirect, useHistory} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<App />} key={1}></Route>
              <Route path='/user/:username' element={<App/>} key={2}></Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

/* 
  <App />

  reportWebVitals(console.log);
      -> FCP :  706~1176ms
      -> TTFB : 21~337ms
*/