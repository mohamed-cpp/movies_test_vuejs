<script setup></script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Posters Movie</router-link>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link
              class="nav-link"
              v-if="$store.getters['user/getToken']"
              :to="{ name: 'createMoive' }"
              >Add Movie</router-link
            >
            <router-link
              class="nav-link"
              v-if="$store.getters['user/getToken']"
              :to="{ name: 'categories' }"
              >Show All Categories</router-link
            >
          </div>
        </div>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup2"
        >
          <div class="navbar-nav">
            <router-link
              class="nav-link"
              v-if="!$store.getters['user/getToken']"
              :to="{ name: 'login' }"
              >Login</router-link
            >
            <a
              href="#"
              class="nav-link"
              v-else
              @click="
                () => {
                  $store.dispatch('user/logout');
                }
              "
              >Logout</a
            >
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavPage",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("user/updateCookie");
  },
};
</script>
