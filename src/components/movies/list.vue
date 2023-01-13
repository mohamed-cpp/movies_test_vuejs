<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Filter by Category</label>
      <select
        class="form-select"
        v-model="category_id"
        aria-label="Default select example"
      >
        <option
          v-for="category of $store.getters['category/getCategories']"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div
      class="row row-cols-1 row-cols-md-3 g-4"
      v-if="!$store.getters['movies/getLoading']"
    >
      <div
        class="col movies"
        v-for="movie of $store.getters['movies/getMovies']"
      >
        <router-link
          :to="'/movie/' + movie.name.replaceAll(' ', '_') + '/' + movie.id"
        >
          <div class="card h-100">
            <img :src="this.url + '/' + movie.image" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{ movie.name }}</h5>
              <p class="card-text">
                {{ movie.description }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script>
export default {
  name: "MoviesPage",
  data() {
    return {
      category_id: null,
    };
  },
  watch: {
    category_id() {
      this.$store.dispatch("movies/filterMovies", {
        category_id: this.category_id,
      });
    },
  },
  computed: {
    url() {
      return import.meta.env.VITE_API_SERVER_END_POINT;
    },
  },
  mounted() {
    this.$store.dispatch("movies/movies");
    this.$store.dispatch("category/list");
  },
};
</script>
<style scoped>
.movies a {
  color: #070707;
  text-decoration: none;
}
</style>
