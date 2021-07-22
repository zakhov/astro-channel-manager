export const ALL_CHANNELS =
    'https://contenthub-api.eco.astro.com.my/channel/all.json'

export const channelById = (id: string) =>
    `https://contenthub-api.eco.astro.com.my/channel/${id}.json`

export const FILTER_TYPES = [
    { label: 'Channel Number', value: 'stbNumber' },
    { label: 'Channel Name', value: 'title' },
]
