<template>
    <NavigationBar></NavigationBar>
    <div class="container">
        <h3 class="justify-content-center mt-4">
            Appointments
        </h3>
        <p v-if="error" class="alert alert-danger w-25 mx-auto mb-3">
            {{ error }}
        </p>
        <div v-if="!error" class="d-flex justify-content-between mb-2 mt-3">
            <input type="submit" class="btn btn-success" value="Create" @click="createappoint()">
        </div>
        <div class="row justify-content-center overflow-auto">
            <div>
                <table v-if="!error" class="table table-bordered table-hover">
                    <thead class="table-secondary">
                        <tr>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Date
                            </th>
                            <th scope="col">
                                Doctor
                            </th>
                            <th scope="col">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="appoint in appoints">
                            <td>{{appoint.customer.firstName + " " + appoint.customer.lastName}}</td>
                            <td>{{appoint.date}}</td>
                            <td>{{appoint.user.firstName + " " + appoint.user.lastName}}</td>
                            <td class="col-sm-3">
                                <input type="submit" class="btn btn-warning me-3" value="Edit" @click="editCustomer(appoint.appoint_id)">
                                <input type="submit" class="btn btn-danger" value="Delete" @click="deleteCustomer(appoint.appoint_id)">
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
import appointService from '../../store/appointsStore';
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
            appoints: [],
            count: 0,
            error: '',
            error_edit: '',
            result_edit: '',
            oem_label: '',
            organizationToEditId: '',
        }
    },
    async created() {
        this.list_appoints();
    },
    methods: {
        async list_appoints(){
            try{
                const token = await Cookies.get("token")
                const res = await appointService.listAppoints(token);
                this.count = res.data.count;
                this.appoints = res.data.appoints;
            } catch (error) {
                this.error = error;
            }
        },
        createappoint() {
            this.$router.push("/appointments/create_appointment");
        },
        viewCustomer(appoint_id) {
            this.$router.push(`/appoints/view_appoint?appoint_id=${appoint_id}`);
        },
        editCustomer(appoint_id) {
            this.$router.push(`/appointments/edit_appointment?appoint_id=${appoint_id}`);
        },
        async deleteCustomer(appoint_id) {
            const token = await Cookies.get("token")
            await appointService.deleteAppoints(appoint_id, token);
            await this.list_appoints()
        }

    }
};
</script>

<style>
</style>