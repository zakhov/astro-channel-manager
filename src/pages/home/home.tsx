import * as React from 'react'
import { Box, Card, Image, Grid, ResponsiveContext, Text } from 'grommet'
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
        <Box pad="small" width="xxlarge">
            <Grid
                columns={{
                    count: size === 'small' || size === 'medium' ? 1 : 3,
                    size:
                        size === 'small' || size === 'medium'
                            ? '100%'
                            : 'small',
                }}
                gap="large"
            >
                {channels_list.map((channel: any, index: number) => (
                    <Card
                        pad="medium"
                        key={index}
                        onClick={(e) => selectChannel(e, channel.id)}
                    >
                        <Text weight="bold">CH{channel.stbNumber}</Text>
                        <Text weight="bold">{channel.title}</Text>
                        <Image
                            fallback="https://via.placeholder.com/72x40.png"
                            width="72px"
                            height="40px"
                            src={channel.imageUrl}
                        />
                        <Box
                            margin="small"
                            pad="small"
                            border={{
                                size: 'medium',
                                side: 'top',
                            }}
                        >
                            {channel.currentSchedule
                                .slice(0, 3)
                                .map((program: any, index: number) => (
                                    <Grid
                                        key={index}
                                        fill
                                        areas={[['date', 'title']]}
                                        columns={['1/4', '3/4']}
                                        rows={['flex']}
                                        gap="small"
                                    >
                                        <Box gridArea="date">
                                            <Text>
                                                {program.datetime ?? 'N/A'}
                                            </Text>
                                        </Box>
                                        <Box gridArea="title">
                                            <Text>
                                                {program.title ??
                                                    'No Information Available'}
                                            </Text>
                                        </Box>
                                    </Grid>
                                ))}
                        </Box>
                    </Card>
                ))}
            </Grid>
        </Box>
    )
}

export default Home
