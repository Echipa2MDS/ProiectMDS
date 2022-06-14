<template>
	<form @submit.prevent="onSubmit" class="container login-box">
		<div class="login-space">
			<div class="login-snip">
				<div class="col-12">
					<div class="input-group w-25 mx-auto mb-3 title">
						<h1>Login - Password</h1>
					</div>
				</div>

				<div class="col-12">
					<div class="input-group w-25 mx-auto mb-3">
						<span class="input-group-text bg-light"><i class="bi bi-key-fill text-black"></i></span>
						<input required :type="passwordFieldType" v-model="user.password" placeholder="Password"
							id="password" />
						<button type="button" id="showPasswordField" class="btn btn-outline-light" @click="showPassword"
							:disabled="!isFormValid">
							Show
						</button>
					</div>
					<p v-if="error" class="alert alert-danger w-25 mx-auto mb-3">
						{{ error }}
					</p>
				</div>
				<div class="col-12">
					<div class="input-group w-25 mx-auto mb-3">
						<input type="submit" :disabled="!isFormValid" value="Login" @click="loginPassword"
							class="btn btn-light" />
					</div>
				</div>
				<div class="col-12">
					<div class="input-group w-25 mx-auto mb-3">
						<p class="title alert alert-light" v-if="loading">Loading...</p>
					</div>
				</div>
			</div>
		</div>
	</form>
</template>

<script>
import { compileScript } from "@vue/compiler-sfc";
import Cookies from "js-cookie";
import LoginService from "../store/loginStore";
import UserService from "../store/usersStore";
export default {
	name: "LoginPassword",
	data() {
		return {
			user: {
				password: "",
			},
			passwordFieldType: "password",
			error: "",
			loading: false,
		};
	},
	computed: {
		isFormValid() {
			return this.isValidPassword;
		},
		isValidPassword() {
			return this.user.password.length >= 1;
		},
		isEmpty() {
			return this.user.password.length >= 1;
		},
	},
	methods: {
		showPassword() {
			this.passwordFieldType =
				this.passwordFieldType === "password" ? "text" : "password";
		},
		async loginPassword() {
			try {
				const email = await this.$route.query.email;
				const res = await LoginService.passwordCheck(
					this.user.password,
					email
				);
				const token = res
				if (!Cookies.get("token")) {
					Cookies.set("token", token.data, {
						expires: 1,
						secure: false,
						domain: "localhost",
						path: "/",
						sameSite: "strict",
					});
				}

				const user_id = Cookies.get("user_id")
				let res1 = await UserService.getUser(user_id, token.data);
				let admin = false;
				if (res1.data.role === "admin") {
					admin = true;
				}
				Cookies.set("admin", admin, {
					expires: 1,
					secure: false,
					domain: "localhost",
					sameSite: "strict",
				});

				Cookies.set("email", email);

				await this.$router.push(`/dashboard?email=${email}`);
			} catch (err) {
				this.error = err.response
			}
		},
	},
};
</script>