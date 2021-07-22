import * as React from 'react'
import { Box, Select } from 'grommet'
import { Filter } from 'grommet-icons'
import { FILTER_TYPES } from 'config'

const ChannelFilter: React.FC<TChannelFilterProps> = ({
    default_option,
    onChange,
}) => {
    const { useState } = React
    const options = FILTER_TYPES
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(default_option.value)

    return (
        <Box
            direction="row"
            alignSelf="end"
            align="center"
            gap="small"
            width="260px"
        >
            <Filter
                onClick={() => setOpen(!open)}
                size="28px"
                color="icon"
                cursor="pointer"
            />
            <Select
                name="channel_filter"
                value={value}
                labelKey="label"
                open={open}
                valueKey={{ key: 'value', reduce: true }}
                onChange={({ value: nextValue }) => {
                    setValue(nextValue)
                    onChange(nextValue)
                }}
                options={options}
            />
        </Box>
    )
}

type TChannelFilterProps = {
    default_option: { label: string; value: string }
    onChange: Function
}

export default ChannelFilter
