import * as React from 'react'
import { Box, Tabs, Tab, Text } from 'grommet'
import ChannelScheduleItem from 'components/channel-card/channel-schedule-item'
import { isSameDay } from 'helpers'

const ChannelSchedule: React.FC<TChannelScheduleProps> = ({ schedule }) => {
    const { useState } = React
    const [index, setIndex] = useState()
    const onActive = (nextIndex: any) => setIndex(nextIndex)
    return (
        <Tabs activeIndex={index} onActive={onActive}>
            {Object.keys(schedule).map((day: any, index: number) => (
                <Tab key={index} title={isSameDay(day)}>
                    <Box margin="small" align="center">
                        {schedule[day].length < 1 ? (
                            <Box pad={{ vertical: 'small' }} alignSelf="center">
                                <Text
                                    size="small"
                                    weight={500}
                                    color="text-strong"
                                >
                                    No Information Available
                                </Text>
                            </Box>
                        ) : (
                            schedule[day].map((program: any, idx: number) => (
                                <ChannelScheduleItem
                                    key={idx}
                                    is_live={false}
                                    index={index}
                                    datetime={program.datetime}
                                    title={program.title}
                                />
                            ))
                        )}
                    </Box>
                </Tab>
            ))}
        </Tabs>
    )
}

type TChannelScheduleProps = {
    schedule: any
}

export default ChannelSchedule
