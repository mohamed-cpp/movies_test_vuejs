<script setup></script>

<template>
  <div>
    <button
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
      @click="() => {selectedItem = null, name =null }"
      class="btn btn-primary m-1 float-end"
    >
      Add Category
    </button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category of $store.getters['category/getCategories']">
          <th scope="row">{{ category.id }}</th>
          <td>{{ category.name }}</td>
          <td>
            <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="() => {selectedItem = category.id; name = category.name  }" class="btn btn-primary m-1">Edit</button>
            <button type="button" @click="deleteItem(category.id)" class="btn btn-danger m-1">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Add Caregory</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="nameCat" class="form-label">Name</label>
              <input
                type="text"
                required
                v-model="name"
                class="form-control"
                id="nameCat"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              id="close_modal"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" @click="saveData" class="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CategoriesPage",
  data() {
    return {
      name: null,
      selectedItem: null
    };
  },
  mounted() {
    this.$store.dispatch("category/list");
  },
  methods: {
    saveData() {
      let data = { name: this.name };
      if(this.selectedItem != null){
        data = {...data, '_method' : 'put', id: this.selectedItem}
      }
      this.$store.dispatch("category/save", data).then((res) => {
        if (res.status == "success") {
          document.getElementById("close_modal").click();
        }
      });
    },
    deleteItem(id){
      this.$store.dispatch("category/delete", { id });
    }
  },
};
</script>
