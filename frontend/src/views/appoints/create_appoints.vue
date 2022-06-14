<template>
    <NavigationBar></NavigationBar>
    <form @submit.prevent="onSubmit" class="container mt-4">
        <div class="col-12 mr-5">
            <h3>
                Create Appoint
            </h3>

            <div class="col-12">
                <div class="input-group w-25 mx-auto mb-3">
                    <label class="me-2">Customer</label>
                    <select class="form-select" aria-label="Default select example" v-model="customer">
                        <option v-for="(customer, index) in customers" :value="customer">{{ customer.firstName + " " +
                                customer.lastName }}</option>
                    </select>
                </div>

                <div class="input-group w-25 mx-auto mb-3">
                    <label class="me-2">Doctor</label>
                    <select class="form-select" aria-label="Default select example" v-model="user">
                        <option v-for="user in users" :value="user">{{ user.firstName + " " + user.lastName }}</option>
                    </select>
                </div>

                <div class="input-group w-25 mx-auto mb-3">
                    <label class="me-2">Data</label>
                    <span class="input-group-text bg-light"><i class="bi bi-person-plus-fill text-black"></i></span>
                    <input required type="date" v-model.trim="appoint.date" id="email" placeholder="Date" />
                </div>

                <p v-if="error" class="alert alert-danger w-25 mx-auto mb-3">
                    {{ error }}
                </p>
            </div>
            <div class="col-12">
                <div class="input-group w-25 mx-auto mb-3">
                    <input type="submit" value="Create" @click="create_appoint()" class="btn btn-light" />
                </div>
            </div>
        </div>
    </form>
    <Footer></Footer>
</template>

<script>
import Cookies from "js-cookie";
import appointService from "../../store/appointsStore";
import customerService from "../../store/customerStore";
import usersService from "../../store/usersStore";
import NavigationBar from "../../components/navigationBar.vue";
import Footer from "../../components/footer.vue";
export default {
    name: "CreateAppoint",
    data() {
        return {
            appoint: {
                user: {

                },
                customer: {

                }
            },
            customers: [],
            users: [],
            customer: {},
            user: {},
            error: "",
            token: '',
            loading: false,
        };
    },
    computed: {
    },
    created: async function () {
        this.token = Cookies.get("token");
        const res = await customerService.listCustomers(this.token);
        const res1 = await usersService.listUsers(this.token);
        this.customers = res.data.customers;
        this.users = res1.data.users;
    },
    methods: {
        async create_appoint() {
            try {
                this.appoint.user.user_id = this.user.user_id
                this.appoint.user.firstName = this.user.firstName
                this.appoint.user.lastName = this.user.lastName
                this.appoint.customer.customer_id = this.customer.customer_id
                this.appoint.customer.firstName = this.customer.firstName
                this.appoint.customer.lastName = this.customer.lastName
                const token = Cookies.get("token");
                console.log(this.appoint)
                await appointService.insertAppoints(this.appoint, token);

                await this.$router.push(`/appointments`);
            }
            catch (err) {
                console.log(err)
            }
        },
    },
    components: { NavigationBar, Footer }
};
</script>