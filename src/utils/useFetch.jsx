import { useState, useEffect } from 'react'

export function useFetch(userID, urlAPI, urlMockedData) {
	const [apiData, setApiData] = useState(null)
	const [mockedData, setMockedData] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const [errorAPI, setErrorAPI] = useState(false)
	const [errorMocked, setErrorMocked] = useState(false)
	useEffect(() => {
		setLoading(true)
		async function fetchData(fetchURL, isDataMocked, errorSetState) {
			try {
				const data = await fetch(fetchURL).then(r => r.json())
				if (isDataMocked === false) {
					setApiData(data.data)
				} else if (isDataMocked === true) {
					if (userID) {
						setMockedData(
							data.find(
								(item) =>
									item.id === parseInt(userID) ||
									item.userId === parseInt(userID)
							)
						)
					}
				}
			} catch (err) {
				console.log(err)
				if (urlMockedData) {
					fetchData(urlMockedData, true, setErrorMocked)
				}
				errorSetState(true)
			} finally {
				setLoading(false)
			}
		}
		fetchData(urlMockedData, true, setErrorAPI)
	}, [urlAPI, userID, urlMockedData])
	return { isLoading, apiData, mockedData, errorAPI, errorMocked }
}
