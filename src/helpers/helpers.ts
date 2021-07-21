import dayjs from 'dayjs'

export const fetchData = async (url: string): Promise<void> => {
    const response = await fetch(url)
    const data = await response.json()
    return data.response
}

export const getDateTime = (dateTime: string) => {
    const formatted_date = dayjs(dateTime)
    return {
        year: formatted_date.get('y'),
        month: formatted_date.get('M'),
        day: formatted_date.get('d'),
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
