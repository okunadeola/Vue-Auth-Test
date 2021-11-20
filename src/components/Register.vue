<template>
  <div class="container-fluid">
    <div class="bg-light height-100">
      <div class="body w-100 rounded p-3">
        <p class="text-center h5">SignUp</p>
        <div class="row mx-md-1">
          <div class="col-md-6 form">
            <div class="form-group mb-3">
              <label for="">Firstname: </label>

              <i class="fa fa-user my-4"></i>
              <input
                type="text"
                @blur="v$.firstname.$touch"
                placeholder="Firstname"
                v-model="firstname"
                class="w-100 form-control"
              />
              <small v-if="v$.firstname.$error" class="text-danger">
                {{ v$.firstname.$errors[0].$message }}
              </small>
            </div>
            <div class="form-group mb-3">
              <label for="">Lastname: </label>

              <i class="fa fa-user my-4"></i>
              <input
                type="text"
                @blur="v$.lastname.$touch"
                placeholder="Lastname"
                v-model="lastname"
                class="w-100 form-control"
              />
              <small v-if="v$.lastname.$error" class="text-danger">
                {{ v$.lastname.$errors[0].$message }}
              </small>
            </div>

            <div class="form-group mb-3">
              <label for="">Mobile: </label>

              <i class="fa fa-user my-4"></i>
              <input
                type="text"
                @blur="v$.mobile.$touch"
                placeholder="mobile"
                v-model="mobile"
                class="w-100 form-control"
              />
              <small v-if="v$.mobile.$error" class="text-danger">
                {{ v$.mobile.$errors[0].$message }}
              </small>
            </div>

            <div class="row">
            <div class="col-md-6 form-group mb-3">
              <label for="">Email: </label>
              <i class="fa fa-mail-bulk my-4"></i>
              <input
                type="email"
                placeholder="email"
                @blur="v$.email.$touch"
                v-model="email"
                class="mb-3 w-100 form-control"
              />
              <small v-if="v$.email.$error" class="text-danger">
                {{ v$.email.$errors[0].$message }}
              </small>
            </div>

              <div class="col-md-6 form-group mb-3">
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

              
            </div>

            <button
              @click="register"
              class="btn btn-sm btn-primary shadow text-white my-3 form-control"
            >
              Signup
            </button>
            <span>Already Register!</span>
            <router-link class="mx-2" to="/Login">Signin</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { request } from "../api";
export default {
  name: "Register",
  data() {
    return {
      v$: useValidate(),
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    };
  },
  validations() {
    return {
      firstname: { required },
      lastname: { required },
      mobile: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
    };
  },

  methods: {
    async register() { 
      this.v$.$validate();  // validating form input
      if (!this.v$.$error) {
        this.v$.$validate();
        if (!this.v$.$error) {
          const body = {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            mobile: this.mobile,
            password: this.password,
          };
          await request.post("/api/v1/register", body).then((res) => {
            if (res.data) {
               this.$router.push("/Login"); 
            }
          });
        }
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