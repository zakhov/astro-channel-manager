import * as React from 'react'
import { Box, Heading } from 'grommet'
import { StatusWarning, Robot, Anchor } from 'grommet-icons'

const Page404: React.FC = () => (
    <Box fill pad="large">
        <Heading level="1" textAlign="center">
            404
        </Heading>
        <Box direction="column" pad="medium" justify="center" align="center">
            <Robot size="xlarge" />
            <StatusWarning size="xlarge" />
            <Anchor size="xlarge" />
        </Box>
        <Box direction="row" pad="large" justify="center" align="center">
            <Heading level="3">This page doesn't exist</Heading>
        </Box>
    </Box>
)

export default Page404
