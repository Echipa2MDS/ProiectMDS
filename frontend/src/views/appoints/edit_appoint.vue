<template>
    <NavigationBar></NavigationBar>
    <div class="contrainer overflow-hidden">
        <div class="row justify-content-center">
            <div class="d-flex justify-content-center mb-2 mt-5 col-7 p-0">
                <h3>
                    Edit
                </h3>
                <div />
            </div>
            <div class="row justify-content-center">
                <form class="col-7 border border-secondary pt-3" @submit.prevent="onSubmit">
                    <p v-if="result.status === 0" class="alert alert-success mx-auto mb-3">
                        The appointment has been successfully updated!
                    </p>
                    <p v-if="error" class="alert alert-danger mx-auto mb-3">
                        {{ error }}
                    </p>

                    <div class="input-group w-25 mx-auto mb-3">
                        <label class="me-2">Customer</label>
                        <select class="form-select" aria-label="Default select example" v-model="customer">
                            <option :value="appoint.customer" selected>{{ appoint.customer.firstName + " " +
                                    appoint.customer.lastName
                            }}</option>
                            <option v-for="(customer, index) in customers" :value="customer">{{ customer.firstName + " "
                                    + customer.lastName
                            }}</option>
                        </select>
                    </div>

                    <div class="input-group w-25 mx-auto mb-3">
                        <label class="me-2">Doctor</label>
                        <select class="form-select" aria-label="Default select example" v-model="user">
                            <option :value="appoint.user" selected>{{ appoint.user.firstName + " " +
                                    appoint.user.lastName
                            }}</option>
                            <option v-for="user in users" :value="user">{{ user.firstName + " " + user.lastName }}
                            </option>
                        </select>
                    </div>

                    <div class="input-group w-25 mx-auto mb-3">
                        <label class="me-2">Data</label>
                        <span class="input-group-text bg-light"><i class="bi bi-person-plus-fill text-black"></i></span>
                        <input required type="date" v-model.trim="appoint.date" id="email" placeholder="Date" />
                    </div>

                    <p> <strong class="text-danger mr-1">*</strong> At least one field should be updated in order to
                        perform this action</p>

                    <input type="submit" class="btn btn-success mb-2 me-4" value="Save" @click="editappoint()">
                    <input type="submit" class="btn btn-warning mb-2" value="Discard" @click="discard()">
                </form>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<script>
import appointService from '../../store/appointsStore';
import usersService from '../../store/usersStore';
import customerService from '../../store/customerStore';
import Cookies from 'js-cookie'
import NavigationBar from '../../components/navigationBar.vue';
import Footer from '../../components/footer.vue';
export default {
    name: "EditCostumer",
    components: {
        NavigationBar,
        Footer
    },
    data() {
        return {
            appoint: {
                customer: {
                },
                user: {}
            },
            appointBeforeEdit: '',
            error: '',
            result: '',
            appoint_id: '',
            appoint_name: '',
            oem_label: '',
            appointEdited: {},
            token: '',
            customers: [],
            users: [],
            user: {},
            customer: {}
        }
    },
    async created() {
        try {
            this.appoint_id = await this.$route.query.appoint_id;
            this.token = await Cookies.get("token")
            const res = await appointService.getAppoints(this.appoint_id, this.token)
            this.appoint = res.data
            this.appointBeforeEdit = Object.assign({}, this.appoint);
            const res2 = await customerService.listCustomers(this.token);
            const res1 = await usersService.listUsers(this.token);
            this.customers = res2.data.customers;
            this.users = res1.data.users;
        } catch (error) {
            this.error = error;
        }

    },
    methods: {
        async editappoint() {
            this.error = '';
            this.result = '';
            Object.assign(this.appointEdited, this.appoint);

            try {
                if (typeof this.user.user_id !== 'undefined') {
                    this.appoint.user.user_id = this.user.user_id
                    this.appoint.user.firstName = this.user.firstName
                    this.appoint.user.lastName = this.user.lastName
                }

                if (typeof this.customer.customer_id !== 'undefined') {

                    this.appoint.customer.customer_id = this.customer.customer_id
                    this.appoint.customer.firstName = this.customer.firstName
                    this.appoint.customer.lastName = this.customer.lastName
                }
                this.appoint_id = this.appoint.appoint_id;
                const token = Cookies.get("token");
                this.result = await appointService.updateAppoints(this.appoint, token);
                this.$router.go(-1);
            } catch (error) {
                console.log(error)
            }
            Object.assign(this.appoint, this.appointEdited);
        },
        discard() {
            Object.assign(this.appoint, this.appointBeforeEdit);
            this.$router.go(-1);
        },
    }
};
</script>

<style>
</style>