<template>
    <NavigationBar></NavigationBar>
    <div class="container">
        <h3 class="justify-content-center mt-4">
            Customers
        </h3>
        <p v-if="error" class="alert alert-danger w-25 mx-auto mb-3">
            {{ error }}
        </p>
        <div v-if="!error" class="d-flex justify-content-between mb-2 mt-3">
            <input type="submit" class="btn btn-success" value="Create" @click="createcustomer()">
        </div>
        <div class="row justify-content-center overflow-auto">
            <div>
                <table v-if="!error" class="table table-bordered table-hover">
                    <thead class="table-secondary">
                        <tr>
                            <th scope="col">
                                First Name
                            </th>
                            <th scope="col">
                                Last Name
                            </th>
                            <th scope="col">
                                Email
                            </th>
                            <th scope="col">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="customer in customers" :key="customers.customer_id">
                            <td>{{customer.email}}</td>
                            <td>{{customer.firstName}}</td>
                            <td>{{customer.lastName}}</td>
                            <td class="col-sm-3">
                                <input type="submit" class="btn btn-secondary me-3" value="View" @click="viewCustomer(customer.customer_id)">
                                <input type="submit" class="btn btn-warning" value="Edit" @click="editCustomer(customer.customer_id)">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import customerService from '../../store/customerStore';
import Cookies from 'js-cookie';
import Footer from '../../components/footer.vue';
import NavigationBar from '../../components/navigationBar.vue';
export default {
    name: "ListCustomers",
    components: {
    Footer,
    NavigationBar
},
    data() {
        return {
            customers: [],
            count: 0,
            error: '',
            error_edit: '',
            result_edit: '',
            oem_label: '',
            organizationToEditId: '',
        }
    },
    async created() {
        this.list_customers();
    },
    methods: {
        async list_customers(){
            try{
                const token = await Cookies.get("token")
                const res = await customerService.listCustomers(token);
                this.count = res.data.count;
                this.customers = res.data.customers;
            } catch (error) {
                this.error = error;
            }
        },
        createcustomer() {
            this.$router.push("/customers/create_customer");
        },
        viewCustomer(customer_id) {
            this.$router.push(`/customers/view_customer?customer_id=${customer_id}`);
        },
        editCustomer(customer_id) {
            this.$router.push(`/customers/edit_customer?customer_id=${customer_id}`);
        }

    }
};
</script>

<style>
</style>