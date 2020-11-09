import axios from 'axios'
import { apiUri } from '../constants';
import IAuditor from '../interfaces/IAuditor';

export const getComments = async (commentor: string) => {
    const comment = await axios.get(`${apiUri}/get-comments?commentor=${commentor}`)
    return comment;
}

export const getUsers = async () => {
    const users = await axios.get(`${apiUri}/get-users`)
    return users;
}

export const getFiles = async (commentor: string) => {
    const users = await axios.get(`${apiUri}/get-files?commentor=${commentor}`)
    return users;
}

export const getFileComments = async (fileId: string) => {
    const users = await axios.get(`${apiUri}/get-file-comments?fileId=${fileId}`)
    return users;
}

export const createUser = async (name: string) => {
    const user = await axios.post(`${apiUri}/create-user`, {name: name});
    return user;
}

export const loginAuditor = async ({email, password}: IAuditor) => {
    const auditor = await axios.post(`${apiUri}/login-auditor`, {email, password})
    return auditor;
}
