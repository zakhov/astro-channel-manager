import * as React from 'react'
import { Box, Grid, Text } from 'grommet'
import { getDateTime } from 'helpers'

const ChannelScheduleItem: React.FC<TProgramProps> = ({
    index,
    datetime,
    title,
}) => {
    const is_first_item = index && index > 0
    return (
        <Grid
            fill
            areas={[['date', 'title']]}
            columns={['1/4', '3/4']}
            rows={['flex']}
            gap="small"
        >
            <Box gridArea="date">
                <Text
                    weight={!is_first_item ? 'bold' : 300}
                    color={is_first_item ? 'text-xweak' : 'text-strong'}
                >
                    {index === 0
                        ? 'On Now'
                        : datetime
                        ? getDateTime(datetime).time
                        : 'N/A'}
                </Text>
            </Box>
            <Box gridArea="title">
                <Text color={is_first_item ? 'text-xweak' : 'text-strong'}>
                    {title ?? 'No Information Available'}
                </Text>
            </Box>
        </Grid>
    )
}

type TProgramProps = {
    index?: number
    datetime?: string
    title?: string
}

export default ChannelScheduleItem
