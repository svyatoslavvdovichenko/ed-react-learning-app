import ReactDOM from 'react-dom'
import { AuthorizationApp } from './AuthorizationApp'
import { BrowserRouter } from 'react-router-dom'
import { AuthChecker } from './hocs/AuthChecker'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'antd/dist/antd.css'
import './index.css'
import { store } from './store'
import { Reference } from "./hocs/Reference";

const queryClient = new QueryClient()

ReactDOM.render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthChecker>
          <Reference>
            <AuthorizationApp />
          </Reference>
        </AuthChecker>
      </Provider>
    </QueryClientProvider>
  </Router>,

  document.getElementById('root'),
)
