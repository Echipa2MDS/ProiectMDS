<template>
    <NavigationBar></NavigationBar>
    <div class="container">
        <h3 class="justify-content-center mt-4">
            Users
        </h3>
        <p v-if="error" class="alert alert-danger w-25 mx-auto mb-3">
            {{ error }}
        </p>
        <div v-if="!error" class="d-flex justify-content-between mb-2 mt-3">            
            <input :v-if="admin" type="submit" class="btn btn-success" value="Create" @click="createUser()">
        </div>
        <div class="row justify-content-center overflow-auto">
            <div>
                <table v-if="!error" class="table table-bordered table-hover">
                    <thead class="table-secondary">
                        <tr>
                            <th scope="col">
                                User ID
                            </th>
                            <th scope="col">
                                Email
                            </th>
                            <th scope="col">
                                First Name
                            </th>
                            <th scope="col">
                                Last Name
                            </th>
                            <th scope="col">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="users.user_id">
                            <td>
                                {{user.user_id}}
                            </td>
                            <td>{{user.email}}</td>
                            <td>{{user.firstName}}</td>
                            <td>{{user.lastName}}</td>
                            <td>{{dateFormat(user.created)}}</td>
                            <!-- <td>
                                <input type="submit" class="btn btn-secondary" value="View" @click="viewOrganization(organization.organization_id)">
                                <input type="submit" class="btn btn-warning" value="Edit" @click="editOrganization(organization.organization_id)">
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import UserService from '../../store/usersStore';
import Cookies from 'js-cookie';
import Footer from '../../components/footer.vue';
import NavigationBar from '../../components/navigationBar.vue';
export default {
    name: "ListUsers",
    components: {
    Footer,
    NavigationBar
},
    data() {
        return {
            users: [],
            count: 0,
            admin: false,
            error: '',
            error_edit: '',
            result_edit: '',
            oem_label: '',
            organizationToEditId: '',
        }
    },
    async created() {
        this.list_users();

        this.admin = Cookies.get("admin");
    },
    methods: {
        async list_users(){
            try{
                const token = await Cookies.get("token")
                const res = await UserService.listUsers(token);
                this.count = res.data.count;
                this.users = res.data.users;
            } catch (error) {
                this.error = error;
            }
        },
        dateFormat(timestmp){
            const dateFormat = new Date(timestmp);
            const date = `${dateFormat.getDate()}/${dateFormat.getMonth() + 1}/${dateFormat.getFullYear()}`;
            return date;
        },
        createUser() {
            this.$router.push("/users/create_user");
        }
    }
};
</script>

<style>
</style>