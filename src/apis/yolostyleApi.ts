import axios from 'axios'

const yolostyleApi = axios.create({
    baseURL: '/api'
})

export {
    yolostyleApi
}