<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary navigation">
        <div class="container-fluid">
            <a class="navbar-brand" href="/dashboard">Vet App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" />
            </button>
            <div id="navbarText" class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <router-link to="/dashboard" class="nav-link" active-class="active">
                        Home
                    </router-link>
                    <router-link to="/users" class="nav-link" active-class="active">
                        Users
                    </router-link>
                    <router-link to="/appointments" class="nav-link" active-class="active">
                        Appointments
                    </router-link>
                    <router-link 
                    to="/customers" active-class="active"
                    router-link-active="active" class="nav-link"
                    >
                        Customers
                    </router-link>
                    <router-link
                    v-if="admin"
                    to="/users" active-class="active"
                    router-link-active="active" class="nav-link"
                    >
                        Users and Roles
                    </router-link>
                </ul>

                <div class="text-white">
                    <button @click="logout()" type="button" class="btn btn-outline-light">Logout</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import LoginService from '../store/loginStore';
import Cookies from 'js-cookie'
export default {
    name: 'Navigation',
    props: {
        admin: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    methods: {
         async logout() {
            try {
                const token = await Cookies.get("token");
                const email = await this.$route.query.email;
                await LoginService.logoutUser(email, token);
                Cookies.remove("token");
                await this.$router.push("/login");
            }
            catch (err) {
                return err;
            }
        },
    }
}
</script>
<style>
</style>