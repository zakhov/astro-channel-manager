import * as React from 'react'
import { Box, TextInput } from 'grommet'
import { Search } from 'grommet-icons'
import debounce from 'lodash.debounce'

const ChannelSearch: React.FC<TChannelSearchProps> = ({ onChange }) => {
    const { useCallback, useState } = React
    const [value, setValue] = useState('')

    const debouncedSearch = React.useMemo(
        () => debounce((newValue) => onChange(newValue), 300),
        [onChange]
    )

    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value)
            debouncedSearch(e.currentTarget.value)
        },
        [debouncedSearch]
    )

    return (
        <Box gap="small" alignSelf="start">
            <TextInput
                icon={<Search />}
                placeholder="Search..."
                onChange={handleChange}
                value={value}
            />
        </Box>
    )
}

type TChannelSearchProps = {
    onChange: Function
}

export default ChannelSearch
