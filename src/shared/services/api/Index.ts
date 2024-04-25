import axios from "axios";

const Api = axios.create({
    baseURL: 'https://resort-psi.vercel.app/'
})

export {Api}
