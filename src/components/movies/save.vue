<template>
  <div>
    <div v-if="!$store.getters['movies/getLoading'] || $route.name == 'createMoive' ">
      <div class="mb-3 mt-5">
        <label for="nameText" class="form-label">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          id="nameText"
        />
        <div
          class="input-errors"
          v-for="error of v$.form.name.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-danger">{{ error.$message }}</div>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Category</label>
        <select
          class="form-select"
          v-model="form.category_id"
          aria-label="Default select example"
        >
          <option
            v-for="category of $store.getters['category/getCategories']"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <div
          class="input-errors"
          v-for="error of v$.form.category_id.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-danger">{{ error.$message }}</div>
        </div>
      </div>

      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label"
          >Description</label
        >
        <textarea
          v-model="form.description"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <div
          class="input-errors"
          v-for="error of v$.form.description.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-danger">{{ error.$message }}</div>
        </div>
      </div>

      <div class="mb-3">
        <label for="formFile" class="form-label"
          >Image</label
        >
        <input
          class="form-control"
          @change="getFile"
          type="file"
          ref="file"
          id="formFile"
        />
        <div
          class="input-errors"
          v-for="error of v$.form.image.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-danger">{{ error.$message }}</div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary" @click="submintForm">
        Save
      </button>
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf,minLength } from "@vuelidate/validators";

export default {
  name: "SaveMoviePage",
  data() {
    return {
      form: {
        name: null,
        category_id: null,
        description: null,
        image: [],
      },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      form: {
        name: { required, minLength: minLength(3) },
        category_id: { required },
        description: { required, minLength: minLength(10) },
        image: { required: requiredIf(() => this.$route.name !== "editMoive") },
      },
    };
  },
  mounted() {
    this.$store.dispatch("category/list");

    if (this.$route.name == "editMoive" && this.$route.params.id) {
      if (this.$store.getters["movies/getMovies"][this.$route.params.id]) {
        this.form= {...this.$store.getters["movies/getMovies"][this.$route.params.id]}
      } else if(this.$store.getters["movies/getMovie"]?.id){
        this.form= {...this.$store.getters["movies/getMovie"]}
      } else {
        this.$store
          .dispatch("movies/movie", { id: this.$route.params.id })
          .then(() => {
            this.form= {...this.$store.getters["movies/getMovie"]}
          });
      }
    }
  },
  methods: {
    submintForm() {
      this.v$.$touch();
      if (!this.v$.$error) {
        let data = {};
        data["id"] = this.$route.params?.id ?? "";
        let formData = new FormData();
        for (const [key, value] of Object.entries(this.form)) {
          formData.append(key, value);
        }
        if(this.$route.name == "editMoive"){
          formData.append('_method', 'put');
        }
        data["data"] = formData;
        this.$store.dispatch("movies/save", data);
      }
    },
    getFile() {
      this.form.image = this.$refs.file.files[0];
    },
  },
};
</script>
