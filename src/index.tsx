import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
import { store } from './redux';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const breakpoints = {
    base: '0em',
    sm: '30em',         //480px
    md: '48em',         //768px
    lg: "62em",         //992px
    xl: '64em',         //1024px
    '2xl': "80em",      //1280px
    '3xl': '90em',      //1440px
    '4xl': '160em',     //2560px  
  }
  

const theme = extendTheme({...breakpoints})


root.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ''}>
        <React.StrictMode>
            <ChakraProvider theme={theme} >
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </ChakraProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
