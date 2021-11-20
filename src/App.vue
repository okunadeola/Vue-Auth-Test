<template>
  <div>
    <div class="bg-danger navContainer">
      <div>
        <router-link class="text-white text-lg brand" to="/"
          >Test App</router-link
        >
      </div>
      <div>
        <div v-if="getToken" @click="logout">
          <span class="btn text-sm">Logout</span>
        </div>

        <div v-else>
          <span class="">
            <router-link to="/Register" class="btn text-sm"
              >Register</router-link
            >
          </span>
          <span class="">
            <router-link to="/Login" class="btn text-sm">Login</router-link>
          </span>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      point: 1,
    };
  },

  computed: {
    ...mapGetters(["getToken"]),
  },

  methods: {
    ...mapActions(["removeToken"]),
    logout() {
      this.removeToken();
      this.$router.push("/Login"); 
    },
  },
};
</script>

<style scoped>
.navContainer {
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: space-between;
}

.brand {
  padding: 0 4px;
  text-decoration: none;
  font-size: 20px;
}
</style>
