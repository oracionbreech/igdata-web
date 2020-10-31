import axios from 'axios'

export const getComments = async () => {
    const comment = await axios.get('http://localhost:5000/parse-comments')
    return comment;
}