import axios from 'axios'

export const getComments = async (commentor: string) => {
    const comment = await axios.get(`http://localhost:5000/get-comments?commentor=${commentor}`)
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

export const getFileComments = async (fileId: string) => {
    const users = await axios.get('http://localhost:5000/get-file-comments?fileId=' + fileId)
    return users;
}

