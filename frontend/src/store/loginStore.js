import axios from 'axios';

const url = 'http://127.0.0.1:3000/';

class LoginService {
    static async registerUser(user) {
        const register = await axios.post(`${url}registerUser`, { user });
        return register;
    }
    static async getUser(email, token) {
        const user = await axios.get(`${url}getUser/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return user;
    }
    static async deleteUser(email, token) {
        const user = await axios.delete(`${url}deleteUser/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return user;
    }
    static async emailCheck(email) {
        const status = await axios.post(`${url}checkUserEmail`, { email });
        return status;
    }
    static async passwordCheck(password, email) {
        const token = await axios.post(`${url}checkUserPassword?email=${email}`, { password });
        return token;
    }

    static async logoutUser(email, token) {
        const user = await axios.delete(`${url}logout/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return user;
    }
}
export default LoginService;