import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import GlobalStyle from "./components/global/GlobalStyle";
import {RecoilRoot} from "recoil";
import GlobalModal from './components/global/GlobalModal';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RecoilRoot>
    <React.StrictMode>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <BrowserRouter> */}
        <GlobalStyle/>
        <GlobalModal/>
        <App/>

      </BrowserRouter>
    </React.StrictMode>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
