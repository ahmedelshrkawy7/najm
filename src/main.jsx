import {ReactDOM,App,React} from "./import"
import './index.css'
import { UserContextProvider } from "./store/UserContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    <App />
    </UserContextProvider>
  </React.StrictMode>,
)
