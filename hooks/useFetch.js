import { useEffect, useState } from "react"
// import { RAPID_API_KEY } from 'react-native-dotenv'
import axios from "axios"

// const rapidApiKey = RAPID_API_KEY

const useFetch = (endpoint, query, data, method='GET') => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const options = {
    method: method,
    url: `https://dev-api.capacitor.software/v1/${endpoint}`,
    params: { ...query },
    headers: {
      'X-RapidAPI-Key': '03b71e1e67msh43ca6bda692d2f2p1800a9jsne92909b8cb69',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    data: { ...data }
  };

  const fetchData = async() => {
    setLoading(true)

    try {
      const response = await axios.request(options)
      setData(response.data.data)
      setLoading(false)
    } catch(error) {
      setError(error)
      alert('There is an error!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => {
    setLoading(true)
    fetchData()
  }

  return { data, isLoading, error, refetch }
}

export default useFetch