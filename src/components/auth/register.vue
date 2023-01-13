<template>
  <div>
    <div>
      <div class="mb-3 mt-5">
        <label for="nameText" class="form-label">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          id="nameText"
        />
        <div class="input-errors" v-for="error of v$.form.name.$errors" :key="error.$uid">
          <div class="error-msg text-danger">{{ error.$message }}</div>
        </div>
      </div>
      <div class="mb-3 mt-5">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div class="input-errors" v-for="error of v$.form.email.$errors" :key="error.$uid">
          <div class="error-msg text-danger">{{ error.$message }}</div>
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
        <div class="input-errors" v-for="error of v$.form.password.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" @click="submintForm">Register</button>
    </div>
  </div>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'


export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        name: null,
        email: this.$route.query?.email ?? '',
        password: null,
      },
    };
  },
  setup () {
    return { v$: useVuelidate() }
  },
  validations () {
    return {
      form: {
        name: { required },
        email: { required, email },
        password: { required }
      }
    }
  },
  methods:{
    submintForm(){
      this.v$.$touch()
      if(!this.v$.$error){
        this.$store.dispatch("user/register", this.form);
      }
    }
  }
};
</script>
