import axios from 'axios';

const url = 'http://127.0.0.1:3000/';

class AppointsService {
    static async listAppoints(token) {
        const appoints = await axios.get(`${url}appoints`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return appoints;
    }

    static async insertAppoints(appoints, token) {
        const res = await axios.post(`${url}appoints`, appoints, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res;
    }

    static async getAppoints(appoints_id, token) {
        const appoints = await axios.get(`${url}appoints/${appoints_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return appoints;
    }

    static async updateAppoints(appoints, token) {
        console.log(appoints.appoint_id)
        const res = await axios.patch(`${url}appoints/${appoints.appoint_id}`, {appoints}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res;xw
    }

    static async deleteAppoints(appoints_id, token) {
        const appoints = await axios.delete(`${url}appoints/${appoints_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return appoints;
    }
}
export default AppointsService;