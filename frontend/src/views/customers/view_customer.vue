<template>
    <NavigationBar></NavigationBar>
    <div class="container">
        <h3 class="justify-content-center mt-3">
            Customer - {{customer.firstName + " " + customer.lastName}}
        </h3>
        <div class="d-flex justify-content-between mb-2">
            <input type="submit" class="btn btn-secondary" value="Back to customers" @click="goBack()">
            
            <div v-if="!error">
                <button type="button" class="btn btn-warning ms-2" @click="editCustomer(customer.customer_id)">
                    Edit
                </button>
            </div>
        </div>
        <div class="row justify-content-center overflow-auto">
            <div>
                <p v-if="error" class="alert alert-danger w-25 mx-auto mb-3">
                    {{ error }}
                </p>
                <table v-if="!error" class="table table-bordered table-sm">
                    <thead class="table-secondary">
                        <tr>
                            <th scope="col">
                                Property
                            </th>
                            <th scope="col">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Customer ID</th>
                            <td>{{customer.customer_id}}</td>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <td>{{customer.firstName}}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>{{customer.lastName}}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{{customer.phone}}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{{customer.email}}</td>
                        </tr>
                        <tr>
                            <th>Adress</th>
                            <td>{{customer.address}}</td>
                        </tr>
                        <tr>
                            <th>Appointments</th>
                            <td v-if="customer.appoints.length > 0">
                                <div v-for="appoint in appoints">
                                    {{appoint + '\n'}} 
                                </div>
                            </td>
                            <td v-else="customer.appoints.length === 0">No appointments</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<script>
import NavigationBar from '../../components/navigationBar.vue';
import Footer from '../../components/footer.vue';
import CustomerService from '../../store/customerStore';
import AppointService from '../../store/appointsStore';
import Cookies from "js-cookie";
export default {
    name: "ViewCustomer",
    components: { NavigationBar, Footer },
    data() {
        return {
            customer: {
                appoints: [],
            },
            error: '',
            result: '',
            customerBeforeEdit: {},
            customer_id: '',
            oem_label: '',
            customer_id: '',
            appoints: [],
        }
    },
    async created() {
        try { 
            await this.list_customer();
        } catch( error ) {
            this.error = error;
        }
    },
    methods: {
        async list_customer() {
            try{
                const customer_id = await this.$route.query.customer_id,
                    token = Cookies.get("token")
                const res = await CustomerService.getCustomer(customer_id, token);
                this.customer = res.data

                if(this.customer.appoints.length > 0) {
                    for(let app_id in this.customer.appoints) {
                        console.log(this.customer.appoints[app_id])
                        const res1 = await AppointService.getAppoints(this.customer.appoints[app_id], token);
                        this.appoints.push(res1.data.date)
                    }
                }

            } catch (error) {
                this.error = error
            }
        },
        async editCustomer (customer_id) {
            this.$router.push(`/customers/edit_customer?customer_id=${customer_id}`);
        },
        async goBack(){
            this.$router.go(-1);
        }
    }
};
</script>

<style>
</style>