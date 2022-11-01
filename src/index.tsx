import ReactDOM from 'react-dom'
import { AuthorizationApp } from './AuthorizationApp'
import { BrowserRouter } from 'react-router-dom'
import { AuthChecker } from './hocs/AuthChecker'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ApiProvider } from './hocs/ApiProvider'
import { BrowserRouter as Router } from 'react-router-dom'

import 'antd/dist/antd.css'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'

const queryClient = new QueryClient()

ReactDOM.render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <ApiProvider>
            <AuthChecker>
              <AuthorizationApp />
            </AuthChecker>
          </ApiProvider>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </Router>,

  document.getElementById('root'),
)
