import * as React from 'react'
import { Box, Grid, InfiniteScroll, ResponsiveContext } from 'grommet'
import { Filter } from 'grommet-icons'
import ChannelCard from 'components/channel-card'
import ChannelSort from 'components/channel-sort/channel-sort'
import {
    fetchData,
    sortChannels,
    filteredInputSearch,
    filteredPropertySearch,
} from 'helpers'
import { ALL_CHANNELS } from 'config'
import ChannelSearch from 'components/channel-search/channel-search'
import ChannelFilterModal from 'components/channel-filter/channel-filter-modal'

const Home: React.FC = () => {
    const { useContext, useEffect, useState } = React
    const [channels_list, setChannelsList] = useState([])
    const [is_fetching, setIsFetching] = useState(true)
    const [show_filters, setShowFilters] = useState(false)
    const [applied_filters, setAppliedFilters] = useState({
        category: [],
        language: [],
        isHd: false,
    })
    const [sortType, setSortType] = useState('stbNumber')
    const [search_input, setSearchInput] = useState('')

    useEffect(() => {
        fetchData(ALL_CHANNELS).then((list: any) => {
            setChannelsList(list)
            setIsFetching(false)
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

    const category_list_filter =
        applied_filters.category.length > 0
            ? filteredPropertySearch(
                  false,
                  channels_list,
                  applied_filters.category,
                  'category'
              )
            : channels_list

    const language_list_filter =
        applied_filters.language.length > 0
            ? filteredPropertySearch(
                  false,
                  category_list_filter,
                  applied_filters.language,
                  'language'
              )
            : category_list_filter

    const resolution_list_filter = applied_filters.isHd
        ? filteredPropertySearch(
              true,
              category_list_filter,
              applied_filters.isHd,
              'isHd'
          )
        : language_list_filter

    const filtered_search_list = filteredInputSearch(
        resolution_list_filter,
        search_input,
        ['title', 'stbNumber']
    )

    const sorted_list = sortChannels(filtered_search_list, sortType)

    return (
        <Box pad="small" width="xxlarge">
            <Box
                width="fill"
                pad="large"
                justify="between"
                style={{ flexFlow: 'wrap' }}
            >
                <Box>
                    <ChannelSearch onChange={onSearch} />
                    <Filter
                        style={{ paddingLeft: 'small' }}
                        size="medium"
                        color="text-weak"
                        onClick={() => setShowFilters(true)}
                    />
                </Box>
                <ChannelSort
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
                <InfiniteScroll items={sorted_list} step={24}>
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
            {!is_fetching && show_filters && (
                <ChannelFilterModal
                    default_values={applied_filters}
                    onApply={(x: any) => {
                        console.log(x)
                        setAppliedFilters(x)
                    }}
                    channels_list={channels_list}
                    size={size}
                    onClose={() => setShowFilters(false)}
                />
            )}
        </Box>
    )
}

export default Home
