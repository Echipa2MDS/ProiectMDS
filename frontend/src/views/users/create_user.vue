<template>
    <NavigationBar></NavigationBar>
  <form @submit.prevent="onSubmit" class="container mt-4" >
        <div class="col-12 mr-5">
          <h3>
            Create User
        </h3>

        <div class="col-12">
          <div class="input-group w-25 mx-auto mb-3">
            <span class="input-group-text bg-light"
              ><i class="bi bi-person-plus-fill text-black"></i
            ></span>
            <input
              required
              type="email"
              v-model.trim="user.email"
              id="email"
              placeholder="Email"
            />
          </div>

            <div class="input-group w-25 mx-auto mb-3">
            <span class="input-group-text bg-light"
              ><i class="bi bi-person-plus-fill text-black"></i
            ></span>
            <input
              type="text"
              v-model="user.role"
              id="role"
              placeholder="Role"
            />
          </div>

          <div class="input-group w-25 mx-auto mb-3">
            <span class="input-group-text bg-light"
              ><i class="bi bi-person-plus-fill text-black"></i
            ></span>
            <input
              type="text"
              v-model="user.fistName"
              id="firstName"
              placeholder="Fist Name"
            />
          </div>
          
          <div class="input-group w-25 mx-auto mb-3">
            <span class="input-group-text bg-light"
              ><i class="bi bi-person-plus-fill text-black"></i
            ></span>
            <input
              type="text"
              v-model="user.lastName"
              id="lastName"
              placeholder="Last Name"
            />
          </div>
          
          <p v-if="error" class="alert alert-danger w-25 mx-auto mb-3">
            {{ error }}
          </p>
        </div>
        <div class="col-12">
          <div class="input-group w-25 mx-auto mb-3">
            <span class="input-group-text bg-light"><i class="bi bi-key-fill text-black"></i></span>
            <input
              required
              :type="passwordFieldType"
              v-model="user.password"
              placeholder="Password"
              id="password"
            />
            <button
              type="button"
              id="showPasswordField"
              class="btn btn-secodnary"
              @click="showPassword"
              :disabled="!isEmpty"
            >
              Show
            </button>
          </div>
        </div>
        <div class="col-12">
          <div class="input-group w-25 mx-auto mb-3">
            <input
              type="submit"
              :disabled="!isFormValid"
              value="Register"
              @click="register"
              class="btn btn-light"
            />
          </div>
        </div>
        </div>
  </form>
    <Footer></Footer>
</template>

<script>
import Cookies from "js-cookie";
import UserService from "../../store/usersStore";
import NavigationBar from "../../components/navigationBar.vue";
import Footer from "../../components/footer.vue";
const emailRegex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
export default {
    name: "CreateUser",
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            passwordFieldType: "password",
            error: "",
            loading: false,
        };
    },
    computed: {
        isFormValid() {
            return this.isValidEmail && this.isValidPassword;
        },
        isValidEmail() {
            return emailRegex.test(this.user.email);
        },
        isValidPassword() {
            return this.user.password.length >= 1;
        },
        isEmpty() {
            return this.user.password.length >= 1;
        },
    },
    methods: {
        resetUser() {
            this.user.email = "";
            this.user.password = "";
        },
        showPassword() {
            this.passwordFieldType =
                this.passwordFieldType === "password" ? "text" : "password";
        },
        async register() {
            try {
                const token = Cookies.get("token");
                await UserService.insertUsers(this.user, token);
               
                await this.$router.push(`/users`);
            }
            catch (err) {
                this.error = err.response.data.message;
            }
        },
    },
    components: { NavigationBar, Footer }
};
</script>