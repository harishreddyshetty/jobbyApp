import {Switch, Route} from 'react-router-dom'

import './App.css'
import LoginPage from './Components/LoginPage'
import ProtectedRoute from './Components/ProtectedRoute'
import HomeRoute from './Components/HomeRoute'
import JobsRoute from './Components/JobsRoute'
import JobItemDetails from './Components/JobItemDetails'
import NotFound from './Components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={HomeRoute} />
      <ProtectedRoute exact path="/jobs" component={JobsRoute} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
