import * as React from 'react'
import { Box, Grid, InfiniteScroll, ResponsiveContext } from 'grommet'
import ChannelCard from 'components/channel-card'
import ChannelFilter from 'components/channel-filter/channel-filter'
import { fetchData, sortChannels, filteredSearch } from 'helpers'
import { ALL_CHANNELS } from 'config'
import ChannelSearch from 'components/channel-search/channel-search'

const Home: React.FC = () => {
    const { useContext, useEffect, useState } = React
    const [channels_list, setChannelsList] = useState([])
    const [sortType, setSortType] = useState('stbNumber')
    const [search_input, setSearchInput] = useState('')

    useEffect(() => {
        fetchData(ALL_CHANNELS).then((list: any) => {
            setChannelsList(list)
        })
    }, [])

    const size = useContext(ResponsiveContext)

    const onSearch = (value: string) => {
        setSearchInput(value)
    }

    const getColumnCount = React.useCallback(() => {
        if (size === 'xsmall') {
            return 'fill'
        } else if (size === 'small') {
            return 2
        }
        return 3
    }, [size])

    return (
        <Box pad="small" width="xxlarge">
            <Box
                width="fill"
                pad="large"
                justify="between"
                style={{ flexFlow: 'wrap' }}
            >
                <ChannelSearch onChange={onSearch} />
                <ChannelFilter
                    default_option={{
                        label: 'Channel Number',
                        value: 'stbNumber',
                    }}
                    onChange={setSortType}
                />
            </Box>
            <Grid
                columns={{
                    count: getColumnCount(),
                    size: size === 'small' ? '100%' : 'small',
                }}
                gap="medium"
            >
                <InfiniteScroll
                    items={filteredSearch(
                        sortChannels(channels_list, sortType),
                        search_input,
                        ['title', 'stbNumber']
                    )}
                    step={24}
                >
                    {(channel: any, index: number) => (
                        <ChannelCard
                            key={index}
                            id={channel.id}
                            stbNumber={channel.stbNumber}
                            title={channel.title}
                            imageUrl={channel.imageUrl}
                            currentSchedule={channel.currentSchedule}
                        />
                    )}
                </InfiniteScroll>
            </Grid>
        </Box>
    )
}

export default Home
