import { Route, Switch } from 'react-router-dom'
import Home from './pages/home/home'
import Channel from './pages/channel/channel'
import Page404 from './pages/page404/page404'

const Routes = () => (
    <Switch>
        <Route exact={true} path="/channel/:channelId" component={Channel} />
        <Route exact={true} path="/" component={Home} />
        <Route>
            <Page404 />
        </Route>
    </Switch>
)

export default Routes
