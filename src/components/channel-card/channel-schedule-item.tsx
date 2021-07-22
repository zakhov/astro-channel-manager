import * as React from 'react'
import { Box, Grid, Text } from 'grommet'
import { getDateTime } from 'helpers'

const ChannelScheduleItem: React.FC<TProgramProps> = ({
    index,
    is_live,
    datetime,
    title,
}) => {
    const subsequent_program = is_live && index && index > 0
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
                    weight={!subsequent_program ? 500 : 300}
                    color={
                        subsequent_program || !datetime || !is_live
                            ? 'text-xweak'
                            : 'text-strong'
                    }
                    size="small"
                >
                    {index === 0 && is_live
                        ? 'On Now'
                        : datetime
                        ? getDateTime(datetime).time
                        : 'N/A'}
                </Text>
            </Box>
            <Box gridArea="title">
                <Text
                    style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    }}
                    weight={!subsequent_program ? 500 : 300}
                    color={
                        subsequent_program || !title || !is_live
                            ? 'text-xweak'
                            : 'text-strong'
                    }
                    size="small"
                >
                    {title ?? 'No Information Available'}
                </Text>
            </Box>
        </Grid>
    )
}

ChannelScheduleItem.defaultProps = {
    is_live: true,
}

type TProgramProps = {
    index?: number
    is_live?: boolean
    datetime?: string
    title?: string
}

export default ChannelScheduleItem
