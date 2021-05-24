import axios from 'axios'
const APIURL = 'https://demo-api.now.sh/users'

export const addUser = async(user) => {
    const response = await axios.post(APIURL, user);
    return response;
}

export const retrieveUsers = async() => {
    const response = await axios.get(APIURL);
    return response.data;
}