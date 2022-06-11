<template>
  <form @submit.prevent="onSubmit" class="container login-box">
    <div class="login-space">
      <div class="login-snip">
        <div class="col-12">
          <div class="input-group w-25 mx-auto mb-3 title">
            <h1>Login - Email</h1>
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
            <input
              type="submit"
              :disabled="!isFormValid"
              value="Cotinue"
              @click="loginEmail"
              class="btn btn-light"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="input-group w-25 mx-auto mb-3">
            <!-- <p class="title">
              Don't you have an account?
              <router-link class="title" to="/register"> Register</router-link>
            </p> -->
            <p class="title alert alert-light" v-if="loading">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import LoginService from "../store/loginStore";
const emailRegex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
export default {
  name: "LoginEmail",
  data() {
    return {
      user: {
        email: "",
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
      return emailRegex.test(this.user.email);
    },
  },
  methods: {
    async loginEmail() {
      try {
        const email = this.user.email;
        const res = await LoginService.emailCheck(email);
        console.log(res.status)
        if (res.status === 200) {
          await this.$router.push(`/password?email=${email}`);
        }
      } catch (err) {
        this.error = err.response.data.message;
      }
    },
  },
};
</script>