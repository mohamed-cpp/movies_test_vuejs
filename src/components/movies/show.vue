<template>
  <div>
    <div v-if="!$store.getters['movies/getLoading'] && movie">
      <div class="card text-bg-dark">
        <img :src="this.url + '/' + movie.image" class="card-img" />
        <div class="card-img-overlay">
          <h5 class="card-title border-cu">
            {{ movie.name }} - {{ movie.category.name }}
          </h5>
          <button
            type="button"
            @click="deleteMovie()"
            class="btn btn-danger float-end m-1"
          >
            Delete
          </button>
          <router-link :to="{ name: 'editMoive', params: { name: movie.name.replaceAll(' ', '_'), id:  movie.id }}" >
            <button type="button" class="btn btn-primary float-end m-1">
              Edit
            </button>
          </router-link>
          <p class="card-text border-cu">
            {{ movie.description }}
          </p>
        </div>
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
      movie: null,
    };
  },
  computed: {
    url() {
      return import.meta.env.VITE_API_SERVER_END_POINT;
    },
  },
  mounted() {
    // if found the movie in object but needs 'category'
    if (this.$store.getters["movies/getMovies"][this.$route.params.id] &&false) {
      this.movie =
        this.$store.getters["movies/getMovies"][this.$route.params.id];
    } else {
      this.$store
        .dispatch("movies/movie", { id: this.$route.params.id })
        .then(() => {
          this.movie = this.$store.getters["movies/getMovie"];
        });
    }
  },
  methods: {
    deleteMovie() {
      this.$store
        .dispatch("movies/delete", { id: this.$route.params.id })
        .then((res) => {
          alert(res.status)
        });
    },
  },
};
</script>
<style scoped>
.border-cu{
  text-shadow: 2px 2px 4px #000000
}
</style>