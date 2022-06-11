<template>
    <NavigationBar></NavigationBar>
    <div class="container">
        <h1>
            VET App
        </h1>
        <p v-if="error" class="alert alert-danger w-25 mx-auto mb-3">
            {{ error }}
        </p>
        <div v-if="!error">
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                Customers
                            </h5>
                            <p class="card-text">
                                The customers registered in the database
                            </p>
                            <a href="/organizations" class="btn btn-secondary">See Organizations</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                Appointments
                            </h5>
                            <p class="card-text">
                                The appointments that been booked in past or future
                            </p>
                            <a href="/plans" class="btn btn-secondary">See Plans</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                Users
                            </h5>
                            <p class="card-text">
                                The users that have access to the paltform
                            </p>
                            <a href="/translations" class="btn btn-secondary">See Translations</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-if="seen" class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                Users and Roles
                            </h5>
                            <p class="card-text">
                                The users and rights
                            </p>
                            <a href="/users" class="btn btn-secondary">See Users</a>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </div>
    <Footer></Footer>
</template>

<script>
import LoginService from "../store/loginStore";
import Cookies from "js-cookie";
import NavigationBar from "../components/navigationBar.vue";
import Footer from "../components/footer.vue";
import NavigationBar1 from "../components/navigationBar.vue";
export default {
    name: "Dashboard",
    data() {
        return {
            user: {
                email: "",
                createdAt: "",
            },
            error: "",
        };
    },
    async created() {
        try {
            const email = await this.$route.query.email;
            const token = Cookies.get("token");
            const user = await LogicService.getUser(email, token);
            let date = new Date(user.data.createdAt);
            date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            this.user.createdAt = date;
            this.user.email = user.data.email;
        }
        catch (err) {
            //   if (err.response.status == 401) {
            //     Cookies.remove("token");
            //     await this.$router.push(`/login`);
            //   }
            return err;
        }
    },
    methods: {
    },
    components: { NavigationBar, Footer }
};
</script>