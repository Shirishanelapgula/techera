import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './Components/Home'
import NotFound from './Components/NotFound'
import MiniPage from './Components/MiniPage'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/courses/:id" component={MiniPage} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
