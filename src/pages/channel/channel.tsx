import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

const Channel: React.FC<RouteComponentProps<{ channelId: string }>> = ({
    match,
    // history,
}) => {
    const { channelId } = match.params
    return <div>{channelId}</div>
}

export default Channel
