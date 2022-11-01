import ReactDOM from "react-dom/client";
import { AuthorizationApp } from './AuthorizationApp'
import { AuthChecker } from './hocs/AuthChecker'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'antd/dist/antd.min.css'
import './index.css'
import { store } from './store'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthChecker>
          <AuthorizationApp />
        </AuthChecker>
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
)
