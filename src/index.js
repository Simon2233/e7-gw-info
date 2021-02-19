import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import store from './redux/store'

import { initGapi } from './redux/actions'

// Garbage. fix if not lazy
const gapi = window.gapi;
if (gapi !== undefined) {
  console.log("Quick loaded", gapi);
  store.dispatch(initGapi(gapi));
} else {
  document.getElementById("gapi").addEventListener('load', () => {
    console.log("Slow loaded", window.gapi);
    store.dispatch(initGapi(window.gapi))
  })
}
// End garbage

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
