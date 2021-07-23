import * as React from 'react'
import {
    Box,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Text,
} from 'grommet'
import ChannelSchedule from './channel-schedule'
import { Add, Checkmark } from 'grommet-icons'
import {
    getFavouritesFromStorage,
    isFavouriteChannel,
    removeChannelFromFavouritesStorage,
    saveFavouritesInStorage,
} from 'helpers'

const ChannelDetails: React.FC<TChannelDetailsProps> = ({
    id,
    category,
    description,
    filters,
    isAstroGoExclusive,
    isHd,
    stbNumber,
    language,
    originalImage,
    title,
    imageUrl,
    schedule,
}) => {
    const { useState } = React

    const [isFavourite, setIsFavourite] = useState(
        isFavouriteChannel(stbNumber)
    )

    const toggleFavouriteChannel = (stbNumber: string) => {
        const favourites = getFavouritesFromStorage()
        if (Array.isArray(favourites)) {
            if (isFavouriteChannel(stbNumber)) {
                removeChannelFromFavouritesStorage(stbNumber)
                setIsFavourite(false)
            } else {
                saveFavouritesInStorage(stbNumber)
                setIsFavourite(true)
            }
        } else {
            saveFavouritesInStorage(stbNumber)
            setIsFavourite(true)
        }
    }

    return (
        <Card pad="medium">
            <CardHeader
                border={{
                    size: 'small',
                    side: 'bottom',
                    color: 'status-disabled',
                }}
                pad={{ bottom: 'small' }}
            >
                <Box direction="row" width="100%" justify="between">
                    <Box direction="row">
                        <Box align="center" justify="start">
                            <Image
                                fallback="https://via.placeholder.com/72x40.png"
                                width="72px"
                                height="40px"
                                src={imageUrl}
                            />
                            <Box
                                pad={{ top: 'small' }}
                                style={{ outline: 'none', boxShadow: 'none' }}
                            >
                                <Button
                                    icon={
                                        isFavourite ? (
                                            <Checkmark size="medium" />
                                        ) : (
                                            <Add size="medium" />
                                        )
                                    }
                                    size="small"
                                    primary
                                    color={isFavourite ? 'dark-1' : 'light-2'}
                                    label="Favourite"
                                    onClick={() =>
                                        toggleFavouriteChannel(stbNumber)
                                    }
                                ></Button>
                            </Box>
                        </Box>
                        <Box
                            justify="start"
                            align="start"
                            pad={{ left: 'small' }}
                        >
                            <Text weight={300}>CH{stbNumber}</Text>
                            <Text weight={500}>{title}</Text>
                        </Box>
                    </Box>
                    <Box justify="end" align="end">
                        <Text as="p" size="xsmall" weight={500}>
                            {category}
                        </Text>
                        {isHd && (
                            <Box>
                                <Text size="xsmall" weight={500}>
                                    Available in HD
                                </Text>
                            </Box>
                        )}
                        {isAstroGoExclusive && (
                            <Box>
                                <Text size="xsmall" weight={500}>
                                    Only on Astro Go
                                </Text>
                            </Box>
                        )}
                        <Text as="p" size="xsmall" weight={500}>
                            Language: {language}
                        </Text>
                        <Box direction="row" alignSelf="end">
                            {filters.map((filter: string, idx: number) => (
                                <Text
                                    key={idx}
                                    as="p"
                                    alignSelf="center"
                                    size="xsmall"
                                    weight={300}
                                    margin={{ horizontal: 'xsmall' }}
                                >
                                    {filter}
                                </Text>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </CardHeader>
            <CardBody>
                <Box pad={{ vertical: 'small' }}>
                    <Text as="p" weight={300} size="small">
                        {description}
                    </Text>
                </Box>
            </CardBody>
            <CardFooter>
                <Box pad={{ vertical: 'small' }}>
                    <ChannelSchedule schedule={schedule} />
                </Box>
            </CardFooter>
        </Card>
    )
}

type TChannelDetailsProps = {
    id: number
    category: string
    description: string
    filters: string[]
    isAstroGoExclusive: boolean
    isHd: boolean
    language: string
    originalImage: string
    stbNumber: string
    title: string
    imageUrl?: string
    schedule: any
}

export default ChannelDetails
