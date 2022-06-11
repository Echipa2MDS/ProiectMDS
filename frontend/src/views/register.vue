<template>
  <form @submit.prevent="onSubmit" class="container login-box">
    <div class="login-space">
      <div class="login-snip">
        <div class="col-12">
          <div class="input-group w-25 mx-auto mb-3 title">
            <h1>Register</h1>
          </div>
        </div>

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
              class="btn btn-outline-light"
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
          <div class="col-12">
            <div class="input-group w-25 mx-auto mb-3">
              <p class="title">
                Do you have an account?
                <router-link class="title" to="/login"> Login</router-link>
              </p>
              <p class="title alert alert-light" v-if="loading">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Cookies from "js-cookie";
import LoginService from "../store/loginStore";
const emailRegex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
export default {
  name: "Register",
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
        const token = await LoginService.registerUser(this.user);
        Cookies.set("token", token.data, {
          expires: 1,
          secure: false,
          domain: "localhost",
          path: "/",
          sameSite: "strict",
        });
        await this.$router.push(`/dashboard/?email=${this.user.email}`);
      } catch (err) {
        this.error = err.response.data.message;
      }
    },
  },
};
</script>