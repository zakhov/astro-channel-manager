export const fetchData = async (url: string): Promise<void> => {
    const response = await fetch(url)
    const data = await response.json()
    return data.response
}
