import * as React from 'react'
import { Box, Spinner, Text } from 'grommet'
import { RouteComponentProps } from 'react-router-dom'
import { channelById } from 'config'
import { fetchData } from 'helpers'
import ChannelDetails from 'components/channel-details/channel-details'

const Channel: React.FC<RouteComponentProps<{ channelId: string }>> = ({
    match,
    history,
}) => {
    const { useEffect, useState } = React
    const { channelId } = match.params
    const [is_fetching, setIsFetching] = useState(true)
    const [channel_data, setChannelData]: any = useState({})

    useEffect(() => {
        const numberId = channelId.substring(channelId.indexOf(':') + 1)
        fetchData(channelById(numberId)).then((data: any) => {
            setChannelData(data)
            setIsFetching(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (is_fetching)
        return (
            <Box
                align="center"
                justify="center"
                style={{ height: 'calc(100vh - 1.6rem)' }}
            >
                <Spinner color="text-weak" size="large" />
            </Box>
        )
    return (
        <Box
            align="center"
            justify="center"
            width="large"
            height="100%"
            pad={{ vertical: 'large', horizontal: 'medium' }}
        >
            <Box
                alignSelf="start"
                direction="row"
                align="center"
                justify="center"
                gap="4px"
                margin={{ bottom: 'small' }}
            >
                <Text
                    weight={300}
                    size="small"
                    color="text-strong"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                        e.preventDefault()
                        history.goBack()
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    Content
                </Text>
                <Text
                    weight={300}
                    size="small"
                    color="text-strong"
                >{`> CH${channel_data.stbNumber}`}</Text>
            </Box>
            <ChannelDetails
                id={channel_data.id}
                category={channel_data.category}
                description={channel_data.description}
                filters={channel_data.filters}
                isAstroGoExclusive={channel_data.isAstroGoExclusive}
                isHd={channel_data.isHd}
                stbNumber={channel_data.stbNumber}
                language={channel_data.language}
                originalImage={channel_data.originalImage}
                title={channel_data.title}
                imageUrl={channel_data.imageUrl}
                schedule={channel_data.schedule}
            />
        </Box>
    )
}

export default Channel
