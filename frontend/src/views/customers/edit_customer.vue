<template>
    <NavigationBar></NavigationBar>
    <div class="contrainer overflow-hidden">
        <div class="row justify-content-center">
            <div class="d-flex justify-content-center mb-2 mt-5 col-7 p-0">
                <h3>
                    Edit - {{ customer.firstName + " " + customer.lastName }}
                </h3>
                <div />
            </div>
            <div class="row justify-content-center">
                <form class="col-7 border border-secondary pt-3" @submit.prevent="onSubmit">
                    <p v-if="result.status === 0" class="alert alert-success mx-auto mb-3">
                        The customer has been successfully updated!
                    </p>
                    <p v-if="error" class="alert alert-danger mx-auto mb-3">
                        {{ error }}
                    </p>

                    <div class="form-group row ms-1">
                        <label class="col-sm-2 col-form-label">Email<strong v-if="required"
                                class="text-danger mr-1">*</strong></label>
                        <div class="col-sm-10">
                            <input v-model="customer.email" type="text" class="form-control">
                        </div>
                    </div>

                    <div class="form-group row  ms-1  mt-2">
                        <label class="col-sm-2 col-form-label">First Name<strong v-if="required"
                                class="text-danger mr-1">*</strong></label>
                        <div class="col-sm-10">
                            <input v-model="customer.firstName" type="text" class="form-control">
                        </div>
                    </div>

                    <div class="form-group row  ms-1  mt-2">
                        <label class="col-sm-2 col-form-label">Last Name<strong v-if="required"
                                class="text-danger mr-1">*</strong></label>
                        <div class="col-sm-10">
                            <input v-model="customer.lastName" type="text" class="form-control">
                        </div>
                    </div>

                    <div class="form-group row  ms-1  mt-2">
                        <label class="col-sm-2 col-form-label">Phone<strong v-if="required"
                                class="text-danger mr-1">*</strong></label>
                        <div class="col-sm-10">
                            <input v-model="customer.phone" type="text" class="form-control">
                        </div>
                    </div>

                    <div class="form-group row  ms-1  mt-2">
                        <label class="col-sm-2 col-form-label">Adress<strong v-if="required"
                                class="text-danger mr-1">*</strong></label>
                        <div class="col-sm-10">
                            <input v-model="customer.address" type="text" class="form-control">
                        </div>
                    </div>

                    <p> <strong class="text-danger mr-1">*</strong> At least one field should be updated in order to
                        perform this action</p>

                    <input type="submit" class="btn btn-success mb-2 me-4" value="Save" @click="editcustomer()">
                    <input type="submit" class="btn btn-warning mb-2" value="Discard" @click="discard()">
                </form>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<script>
import CustomerService from '../../store/customerStore';
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
            customer: {},
            customerBeforeEdit: '',
            error: '',
            result: '',
            customer_id: '',
            customer_name: '',
            oem_label: '',
            customerEdited: {},
            token: ''
        }
    },
    async created() {
        try {
            this.customer_id = await this.$route.query.customer_id;
            this.token = await Cookies.get("token")
            const res = await CustomerService.getCustomer(this.customer_id, this.token)
            this.customer = res.data
            console.log(this.customer)
            this.customerBeforeEdit = Object.assign({}, this.customer);
        } catch (error) {
            this.error = error;
        }

    },
    methods: {
        async editcustomer() {
            this.error = '';
            this.result = '';
            Object.assign(this.customerEdited, this.customer);

            try {
                this.customer_id = this.customer.customer_id;
                console.log(this.customer)
                const token = Cookies.get("token");
                this.result = await CustomerService.updateCustomer(this.customer, token);
                this.$router.go(-1);
            } catch (error) {
                console.log(error)
            }
            Object.assign(this.customer, this.customerEdited);
        },
        discard() {
            Object.assign(this.customer, this.customerBeforeEdit);
            this.$router.go(-1);
        },
    }
};
</script>

<style>
</style>