import * as React from 'react'
import { Box, Card, Grid, ResponsiveContext, Text } from 'grommet'
import { fetchData } from 'helpers'
import { ALL_CHANNELS } from 'config'

const Home: React.FC = () => {
    const { useContext, useEffect, useState } = React
    const [channels_list, setChannelsList] = useState([])

    useEffect(() => {
        fetchData(ALL_CHANNELS).then((list: any) => {
            console.log(list)
            setChannelsList(list)
        })
    }, [])

    const selectChannel = (
        event: React.MouseEvent<HTMLElement>,
        id: number
    ) => {
        event.preventDefault()
        console.log('channel selected:', id)
    }

    const size = useContext(ResponsiveContext)

    return (
        <Box pad="large">
            <Grid
                columns={{
                    count: 3,
                    size: size !== 'small' ? 'small' : '100%',
                }}
                gap="small"
            >
                {channels_list.map((channel: any, index: number) => (
                    <Card
                        pad="large"
                        key={index}
                        onClick={(e) => selectChannel(e, channel.id)}
                    >
                        <Text>{channel.title}</Text>
                    </Card>
                ))}
            </Grid>
        </Box>
    )
}

export default Home
