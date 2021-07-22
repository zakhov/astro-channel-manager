import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import { Box, Grommet, Main } from 'grommet'
import { grommet } from 'grommet/themes'
import { deepMerge } from 'grommet/utils'

const App: React.FC = () => {
    // const [darkMode, setDarkMode] = React.useState(false);

    const colors = {
        focus: 'text-weak',
        selected: 'text-weak',
    }

    const customGrommetTheme = deepMerge(grommet, {
        global: {
            colors,
        },
    })

    return (
        <Grommet theme={customGrommetTheme} themeMode="light">
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
