import axios from 'axios'

export const getComments = async () => {
    const comment = await axios.get('http://localhost:5000/get-comments?commentor=sheril')
    return comment;
}

export const getUsers = async () => {
    const users = await axios.get('http://localhost:5000/get-users')
    return users;
}

export const getFiles = async (commentor: string) => {
    const users = await axios.get('http://localhost:5000/get-files?commentor=' + commentor)
    return users;
}