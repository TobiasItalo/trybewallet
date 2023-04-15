import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <Provider store={ store }>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={ 5000 }
          hideProgressBar={ false }
          newestOnTop={ false }
          closeOnClick
          rtl={ false }
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <App />
      </BrowserRouter>
    </Provider>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
