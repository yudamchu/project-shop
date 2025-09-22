import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './stores/store.js'
import { Provider } from 'react-redux'   // ✅ 여기 추가

createRoot(document.getElementById('root')).render(
  //<StrictMode>
     <Provider store={store}>
      <App />
    </Provider>
  //</StrictMode>,
)
