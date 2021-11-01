import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context/auth.context'
import { UIProvider } from './context/UI.context'
import { UsersProvider } from './context/users.context'
import { OrderProvider } from './context/order.context'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UIProvider>
        <AuthProvider>
          <UsersProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </UsersProvider>
        </AuthProvider>
      </UIProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
