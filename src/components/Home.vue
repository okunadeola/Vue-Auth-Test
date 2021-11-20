<template>
  <div class="container">
    <div class="mt-5 d-flex row">
      <div class="col-12 col-md-6 my-2">
        <h3>Welcome to your App</h3>
        <span>{{ getToken }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["getToken"]),
  },
};
</script>