import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'

const App: React.FC = () => {
    // const [darkMode, setDarkMode] = React.useState(false);

    return (
        <Grommet theme={grommet} themeMode="light">
            <Router>
                <Routes />
            </Router>
        </Grommet>
    )
}

export default App
