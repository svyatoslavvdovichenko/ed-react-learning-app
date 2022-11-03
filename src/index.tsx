import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Reference } from "./hocs/Reference";
import { store } from './store'
import { AuthChecker } from './hocs/AuthChecker'
import { AuthorizationApp } from './AuthorizationApp'

import 'antd/dist/antd.css'
import './index.css'

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
