import axios from 'axios';

const url = 'http://127.0.0.1:3000/';

class UserService {
    static async listUsers(token) {
        const users = await axios.get(`${url}users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return users;
    }

    static async insertUsers(user, token) {
        const users = await axios.post(`${url}users`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return users;
    }

    static async getUser(query, token) {
        const users = await axios.get(`${url}users/${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return users;
    }
}
export default UserService;