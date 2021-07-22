import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import { Box, Grommet, Main } from 'grommet'
import { themeStyle } from 'config'

const App: React.FC = () => {
    // const [darkMode, setDarkMode] = React.useState(false)

    return (
        <Grommet theme={themeStyle} themeMode="light">
            <Main>
                <Box align="center" justify="center" width="100%" height="100%">
                    <Router>
                        <Routes />
                    </Router>
                </Box>
            </Main>
        </Grommet>
    )
}

export default App
