import * as React from 'react'
import { CheckBoxGroup, FormField } from 'grommet'

const ChannelFilterGroup: React.FC<TChannelFilterGroupProps> = ({
    onChange,
    options,
    label,
    name,
}) => {
    const { useState } = React
    const [values, setValues] = useState([])

    return (
        <FormField label={label} name={name}>
            <CheckBoxGroup
                name={name}
                align="start"
                justify="center"
                direction="column"
                options={options}
                onChange={(event: any) => {
                    setValues(event.value)
                    if (typeof onChange === 'function') {
                        onChange(values)
                    }
                }}
            />
        </FormField>
    )
}

type TChannelFilterGroupProps = {
    label: string
    name: string
    options: string[]
    onChange?: Function
}

export default ChannelFilterGroup
