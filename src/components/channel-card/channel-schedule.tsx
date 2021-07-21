import * as React from 'react'
import { Box, Grid, Text } from 'grommet'

const ChannelSchedule: React.FC<TChannelScheduleProps> = ({
    datetime,
    title,
}) => {
    return (
        <Grid
            fill
            areas={[['date', 'title']]}
            columns={['1/4', '3/4']}
            rows={['flex']}
            gap="small"
        >
            <Box gridArea="date">
                <Text>{datetime ?? 'N/A'}</Text>
            </Box>
            <Box gridArea="title">
                <Text>{title ?? 'No Information Available'}</Text>
            </Box>
        </Grid>
    )
}

type TChannelScheduleProps = {
    datetime: string
    title: string
}

export default ChannelSchedule
