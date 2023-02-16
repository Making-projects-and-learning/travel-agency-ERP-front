/** Libraries */
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

/** Router */
import { AppRouter } from './routers/AppRouter'

/** Store */
import { store } from './store'

/** Styles */
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
)
