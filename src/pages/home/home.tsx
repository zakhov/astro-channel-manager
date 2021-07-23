import * as React from 'react'
import {
    Box,
    Grid,
    CheckBox,
    InfiniteScroll,
    Spinner,
    ResponsiveContext,
} from 'grommet'
import { Filter } from 'grommet-icons'
import ChannelCard from 'components/channel-card'
import ChannelSort from 'components/channel-sort/channel-sort'
import {
    fetchData,
    sortChannels,
    filteredInputSearch,
    filteredPropertySearch,
    getFavouritesFromStorage,
} from 'helpers'
import { ALL_CHANNELS } from 'config'
import ChannelSearch from 'components/channel-search/channel-search'
import ChannelFilterModal from 'components/channel-filter/channel-filter-modal'

const Home: React.FC = () => {
    const { useContext, useEffect, useState } = React
    const [channels_list, setChannelsList] = useState([])
    const [is_fetching, setIsFetching] = useState(true)
    const [show_favourites, setShowFavourites] = useState(false)
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

    const favourites_list_filter = channels_list.filter((channel: any) => {
        const favourites = getFavouritesFromStorage()
        if (Array.isArray(favourites)) {
            return favourites.includes(String(channel.stbNumber))
        }
        return channels_list
    })

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
        show_favourites ? favourites_list_filter : resolution_list_filter,
        search_input,
        ['title', 'stbNumber']
    )

    const sorted_list = sortChannels(filtered_search_list, sortType)

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
        <Box pad="small" width="xxlarge">
            <Box
                width="fill"
                pad="large"
                justify="between"
                style={{ flexFlow: 'wrap' }}
            >
                <Box direction="row" align="center" justify="center">
                    <Box
                        border="all"
                        round="xsmall"
                        fill="vertical"
                        pad={{ horizontal: 'xsmall' }}
                        margin={{ right: 'xsmall' }}
                        align="center"
                        justify="center"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowFilters(true)}
                    >
                        <Filter size="36px" color="text-weak" />
                    </Box>
                    <ChannelSearch onChange={onSearch} />
                </Box>
                <Box>
                    {' '}
                    <CheckBox
                        color="text-weak"
                        name="favourites"
                        label="Only Favourites"
                        checked={show_favourites}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setShowFavourites(event.target.checked)
                        }}
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
            {show_filters && (
                <ChannelFilterModal
                    default_values={applied_filters}
                    onApply={(x: any) => setAppliedFilters(x)}
                    channels_list={channels_list}
                    size={size}
                    onClose={() => setShowFilters(false)}
                />
            )}
        </Box>
    )
}

export default Home
