import { deepMerge } from 'grommet/utils'
import { grommet } from 'grommet/themes'

const tabStyles = {
    tab: {
        color: 'text-xweak',
        active: {
            color: 'text-strong',
            weight: 500,
        },
        hover: {
            color: 'text-strong',
            weight: 500,
        },
        border: {
            side: 'bottom',
            color: 'transparent',
            active: {
                color: 'text-strong',
            },
            hover: {
                color: 'transparent',
            },
        },
    },
}

const colorStyles = {
    colors: {
        focus: 'text-weak',
        selected: 'text-weak',
    },
}

export const themeStyle = deepMerge(grommet, {
    global: {
        ...colorStyles,
    },
    ...tabStyles,
})
