export const fetch_data = async (path, params = {}) => {
    const apiKey = 'G720MOYMb0NNIDXDmSJd3Mk0Jdc9E5Rh'
    const baseUrl = 'https://dataservice.accuweather.com/'
    const params2 = {
        apikey: apiKey,
        ...params
    }
    let finalUrl = baseUrl + path + '?'
    finalUrl += ( new URLSearchParams( params2 ) ).toString()

    const request = await fetch(finalUrl)

    return request.json()
}