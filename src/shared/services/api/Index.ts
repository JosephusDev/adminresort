import axios from "axios";

const Api = axios.create({
    baseURL: 'http://192.168.43.83:8800'
})

export {Api}
