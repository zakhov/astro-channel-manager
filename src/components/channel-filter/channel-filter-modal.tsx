import * as React from 'react'
import ReactDOM from 'react-dom'
import Div100vh from 'react-div-100vh'
import { Button, Box, CheckBox, Form, FormField, Layer } from 'grommet'
import { getUniqueValuesByKey } from 'helpers'
import { SEMANTIC_FILTER_TYPES } from 'config'
import ChannelFilterGroup from './channel-filter-group'

import { Close } from 'grommet-icons'

const ChannelFilterModal: React.FC<TChannelFilterModalProps> = ({
    default_values,
    onApply,
    channels_list,
    onClose,
    size,
}) => {
    const { useState } = React
    const modal_root = document.getElementById('modal-root') as HTMLElement

    const [value, setValue] = useState(default_values)

    const ModalContent = () => (
        <Div100vh>
            <Box
                width="medium"
                pad={{ vertical: 'small', horizontal: 'medium' }}
            >
                <Form
                    value={value}
                    onChange={(nextValue) => {
                        setValue(nextValue)
                    }}
                    onSubmit={(e: any) => {
                        e.preventDefault()
                        // onClose()
                        onApply(e.value)
                    }}
                >
                    <Box justify="end" align="end" pad="medium">
                        <Close
                            cursor="pointer"
                            color="text-weak"
                            size="medium"
                            onClick={onClose}
                        />
                    </Box>
                    <Box>
                        {SEMANTIC_FILTER_TYPES.map(
                            (filter_type: any, index: number) => (
                                <ChannelFilterGroup
                                    key={index}
                                    name={filter_type.value}
                                    options={getUniqueValuesByKey(
                                        channels_list,
                                        filter_type.value
                                    )}
                                    label={filter_type.label}
                                />
                            )
                        )}
                        <FormField label="Resolution" name="isHd">
                            <CheckBox
                                color="text-weak"
                                name="isHd"
                                label="HD Content"
                            />
                        </FormField>
                    </Box>
                    <Box flex={false} as="footer" align="end" justify="end">
                        <Box
                            fill
                            direction="row"
                            justify="center"
                            align="center"
                            pad="small"
                        >
                            <Button
                                color="text-weak"
                                primary
                                type="submit"
                                label="Apply"
                            />
                        </Box>
                    </Box>
                </Form>
            </Box>
        </Div100vh>
    )

    return ReactDOM.createPortal(
        <Layer
            full={size === 'small' ?? 'vertical'}
            modal
            position="left"
            onClickOutside={onClose}
            onEsc={onClose}
        >
            <ModalContent />
        </Layer>,
        modal_root
    )
}

type TChannelFilterModalProps = {
    channels_list: any
    default_values: any
    size: string
    onApply: any
    onClose: any
}

export default ChannelFilterModal
