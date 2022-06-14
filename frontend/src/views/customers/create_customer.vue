<template>
    <NavigationBar></NavigationBar>
    <form @submit.prevent="onSubmit" class="container mt-4">
        <div class="col-12 mr-5">
            <h3>
                Create Customer
            </h3>

            <div class="col-12">
                <div class="input-group w-25 mx-auto mb-3">
                    <span class="input-group-text bg-light"><i class="bi bi-person-plus-fill text-black"></i></span>
                    <input required type="email" v-model.trim="customer.email" id="email" placeholder="Email" />
                </div>

                <div class="input-group w-25 mx-auto mb-3">
                    <span class="input-group-text bg-light"><i class="bi bi-person-plus-fill text-black"></i></span>
                    <input type="text" v-model="customer.firstName" id="firstName" placeholder="First name" />
                </div>

                <div class="input-group w-25 mx-auto mb-3">
                    <span class="input-group-text bg-light"><i class="bi bi-person-plus-fill text-black"></i></span>
                    <input type="text" v-model="customer.lastName" id="lastName" placeholder="Last Name" />
                </div>

                <div class="input-group w-25 mx-auto mb-3">
                    <span class="input-group-text bg-light"><i class="bi bi-person-plus-fill text-black"></i></span>
                    <input type="text" v-model="customer.phone" id="phone" placeholder="Phone no." />
                </div>

                <div class="input-group w-25 mx-auto mb-3">
                    <span class="input-group-text bg-light"><i class="bi bi-person-plus-fill text-black"></i></span>
                    <input type="text" v-model="customer.address" id="address" placeholder="Address" />
                </div>

                <p v-if="error" class="alert alert-danger w-25 mx-auto mb-3">
                    {{ error }}
                </p>
            </div>
            <div class="col-12">
                <div class="input-group w-25 mx-auto mb-3">
                    <input type="submit" :disabled="!isFormValid" value="Create" @click="create_customer"
                        class="btn btn-light" />
                </div>
            </div>
        </div>
    </form>
    <Footer></Footer>
</template>

<script>
import Cookies from "js-cookie";
import customerService from "../../store/customerStore";
import NavigationBar from "../../components/navigationBar.vue";
import Footer from "../../components/footer.vue";
const emailRegex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
export default {
    name: "CreateCustomer",
    data() {
        return {
            customer: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                appoints: [],
            },
            error: "",
            loading: false,
        };
    },
    computed: {
        isFormValid() {
            return this.isValidEmail;
        },
        isValidEmail() {
            return emailRegex.test(this.customer.email);
        },
    },
    methods: {
        resetcustomer() {
            for (const field in this.customer) {
                if (typeof this.customer[field] === "array")
                    this.customer[field] = []
                this.customer[field] = ""
            }
        },
        async create_customer() {
            try {
                const token = Cookies.get("token");
                await customerService.insertCustomers(this.customer, token);

                await this.$router.push(`/customers`);
            }
            catch (err) {
                this.error = err.response.data.message;
            }
        },
    },
    components: { NavigationBar, Footer }
};
</script>