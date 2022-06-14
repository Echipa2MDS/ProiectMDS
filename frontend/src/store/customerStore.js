import axios from 'axios';

const url = 'http://127.0.0.1:3000/';

class CustomerService {
    static async listCustomers(token) {
        const customers = await axios.get(`${url}customers`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return customers;
    }

    static async insertCustomers(customer, token) {
        const customers = await axios.post(`${url}customers`, customer, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return customers;
    }

    static async getCustomer(customer_id, token) {
        const customer = await axios.get(`${url}customers/${customer_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return customer;
    }

    static async updateCustomer(customer, token) {
        const res = await axios.patch(`${url}customers/${customer.customer_id}`, {customer}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res;xw
    }
}
export default CustomerService;