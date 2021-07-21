import * as React from 'react'
import { Box, Card, CardHeader, CardBody, Image, Text } from 'grommet'
import ChannelScheduleItem from './channel-schedule-item'

const ChannelCard: React.FC<TChannelCardProps> = ({
    id,
    stbNumber,
    title,
    imageUrl,
    currentSchedule,
}) => {
    const selectChannel = (
        event: React.MouseEvent<HTMLElement>,
        id: number
    ) => {
        event.preventDefault()
        console.log('channel selected:', id)
    }

    const schedule = currentSchedule.slice(0, 3)

    return (
        <Card pad="medium" onClick={(e) => selectChannel(e, id)}>
            <CardHeader
                border={{ size: 'small', side: 'bottom' }}
                pad={{ bottom: 'small' }}
            >
                <Image
                    fallback="https://via.placeholder.com/72x40.png"
                    width="72px"
                    height="40px"
                    src={imageUrl}
                />
                <Text weight="bold">CH{stbNumber}</Text>
                <Text weight="bold">{title}</Text>
            </CardHeader>
            <CardBody>
                <Box pad={{ vertical: 'small' }}>
                    {schedule.map((program: any, index: number) => (
                        <ChannelScheduleItem
                            key={index}
                            index={index}
                            datetime={program.datetime}
                            title={program.title}
                        />
                    ))}
                    {schedule.length < 3 &&
                        Array(3 - schedule.length)
                            .fill(null)
                            .map(() => (
                                <ChannelScheduleItem
                                    index={undefined}
                                    datetime={undefined}
                                    title={undefined}
                                />
                            ))}
                </Box>
            </CardBody>
        </Card>
    )
}

type TChannelCardProps = {
    id: number
    stbNumber: string
    title: string
    imageUrl?: string
    currentSchedule: string[]
}

export default ChannelCard
