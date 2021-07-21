import * as React from 'react'
import { Box, Grid, ResponsiveContext } from 'grommet'
import ChannelCard from 'components/channel-card'
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

    const size = useContext(ResponsiveContext)

    return (
        <Box pad="small" width="xxlarge">
            <Grid
                columns={{
                    count: size === 'small' ? 1 : 3,
                    size: size === 'small' ? '100%' : 'small',
                }}
                gap="medium"
            >
                {channels_list.map((channel: any, index: number) => (
                    <ChannelCard
                        key={index}
                        id={channel.id}
                        stbNumber={channel.stbNumber}
                        title={channel.title}
                        imageUrl={channel.imageUrl}
                        currentSchedule={channel.currentSchedule}
                    />
                ))}
            </Grid>
        </Box>
    )
}

export default Home
