import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
// md-bootsrap
import '../node_modules/mdb-react-ui-kit/dist/css/mdb.min.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import '../node_modules/mdb-ui-kit/js/mdb.min.js'
//react slick
import '../node_modules/slick-carousel/slick/slick.css'
import '../node_modules/slick-carousel/slick/slick-theme.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GoogleOAuthProvider clientId='337210713835-e7e6saui5kjsn7bsdutl7jssge1dv93d.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
