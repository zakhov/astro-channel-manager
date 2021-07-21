import * as React from 'react'
import { Box, Card, Image, Text } from 'grommet'
import ChannelSchedule from './channel-schedule'

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

    return (
        <Card pad="medium" onClick={(e) => selectChannel(e, id)}>
            <Text weight="bold">CH{stbNumber}</Text>
            <Text weight="bold">{title}</Text>
            <Image
                fallback="https://via.placeholder.com/72x40.png"
                width="72px"
                height="40px"
                src={imageUrl}
            />
            <Box
                margin="small"
                pad="small"
                border={{
                    size: 'medium',
                    side: 'top',
                }}
            >
                {currentSchedule
                    .slice(0, 3)
                    .map((program: any, index: number) => (
                        <ChannelSchedule
                            key={index}
                            datetime={program.datetime}
                            title={program.title}
                        />
                    ))}
            </Box>
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
