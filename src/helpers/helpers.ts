import dayjs from 'dayjs'

export const fetchData = async (url: string): Promise<void> => {
    const response = await fetch(url)
    const data = await response.json()
    return data.response
}

export const isSameDay = (dateTime: string) => {
    return (
        dayjs().format('ddd') === getDateTime(dateTime).day
            ? 'Today'
            : getDateTime(dateTime).day
    ).toUpperCase()
}

export const getDateTime = (dateTime: string) => {
    const formatted_date = dayjs(dateTime)
    return {
        day: formatted_date.format('ddd'),
        time: formatted_date.format('hh:mm A'),
        epoch: formatted_date.unix(),
    }
}

export const filterExpiredProgrammes = (currentSchedule: any) => {
    const filtered_schedule = currentSchedule.filter(
        (program: { datetime: string }) => {
            const program_timestamp = getDateTime(program.datetime).epoch
            const current_time = dayjs().unix()
            return current_time <= program_timestamp
        }
    )

    return filtered_schedule
}

export const sortChannels = (channels_list: any, sort_type: string) => {
    const sortedChannels = channels_list.sort((a: any, b: any) => {
        const value_a = a[sort_type]
        const value_b = b[sort_type]
        if (value_a > value_b) return 1
        else if (value_b > value_a) return -1
        return 0
    })
    return sortedChannels
}

export const filteredInputSearch = (
    channels_list: any,
    search: string,
    keys: string[]
) => {
    const lowerCaseSearch = search.toLowerCase()
    return channels_list.filter((channel: any) => {
        return keys.some((key) =>
            String(channel[key]).toLowerCase().includes(lowerCaseSearch)
        )
    })
}

export const filteredPropertySearch = (
    is_boolean_search: boolean,
    channels_list: any,
    values: string[] | boolean,
    key: string
) => {
    if (is_boolean_search || typeof values === 'boolean')
        return channels_list.filter((channel: any) => !!channel[key])
    return channels_list.filter((channel: any) =>
        values.some((value) =>
            !value ? true : String(channel[key]).includes(value)
        )
    )
}

export const getUniqueValuesByKey = (list: any, key: any) =>
    list
        .map((item: any) => item[key])
        .filter(
            (value: any, index: number, self: any) =>
                self.indexOf(value) === index
        )
