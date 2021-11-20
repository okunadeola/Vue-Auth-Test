<template>
  <div class="container-fluid">
    <div class="bg-light">
      <form @submit.prevent="login" class="form p-5 md-w-50">
        <div class="display-6 text-secondary text-center my-2">Sign in</div>
        <div class="row mx-md-1">
          <div class="col-md-6 form">
            <div class="form-group mb-3">
              <label for="">Mobile: </label>
              <i class="fa fa-mail-bulk my-4"></i>
              <input
                type="text"
                placeholder="Phone Number"
                @blur="v$.mobile.$touch"
                v-model="mobile"
                class="mb-3 w-100 form-control"
              />
              <small v-if="v$.mobile.$error" class="text-danger">
                {{ v$.mobile.$errors[0].$message }}
              </small>
            </div>

            <div class="form-group mb-3">
              <label for="">Password: </label>
              <i class="fa fa-key my-4" aria-hidden="true"></i>
              <input
                type="password"
                @blur="v$.password.$touch"
                placeholder="password"
                v-model="password"
                class="mb-3 w-100 form-control"
              />
              <small v-if="v$.password.$error" class="text-danger">
                {{ v$.password.$errors[0].$message }}
              </small>
            </div>
            <input
              type="submit"
              class="form-control bg-secondary text-light"
              value="login"
            />

            <span>Don't have an account Register!</span>
            <router-link class="mx-2" to="/Register">Signup</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { request } from "../api";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      v$: useValidate(),
      mobile: "",
      password: "",
    };
  },

  validations() {
    return {
      mobile: { required },
      password: { required, minLength: minLength(6) },
    };
  },

  methods: {
    ...mapActions({ auth: "setAuthentication" }),

    async login() {
      this.v$.$validate();  // validating the form
      if (!this.v$.$error) {
        const body = {
          mobile: this.mobile,
          password: this.password,
        };
        await request
          .post("/api/v1/login", body)
          .then((res) => {     
             //the api required otp verification which is not sent on sign up. therefore manual auth is use here
            this.auth({ payload: res.data.token });
            this.$route.push("/");
          })
          .catch((_) => {
            //the api required otp verification which is not sent on sign up. therefore manual auth is use here
            console.log(_);
            this.auth({ payload: "authenticated" });
            this.$router.push("/");
          });
      }
    },
  },
};
</script>
<style scoped>
.form {
  margin: 20px auto;
}
</style>