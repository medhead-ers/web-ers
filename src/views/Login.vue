<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <form class="form-signin text-center" @submit.prevent="login()">
      <div class="fs-2 font-weight-bold pb-2">
        <brand-name/>
      </div>
      <h1 class="h4 mb-4 mt-4 font-weight-normal">Authentification</h1>

      <b-alert :show="loginError !== null" variant="danger">Erreur : {{loginError}}</b-alert>
      <input v-model="username" type="string" class="form-control" placeholder="Identifiant" required autofocus>
      <input v-model="password" type="password" class="form-control" placeholder="Mot de passe" required>
      <div class="col-10 mx-auto mt-4 pt-2">
        <button class="btn btn-lg btn-success btn-block" type="submit">Se connecter</button>
      </div>
      <p class="mt-5 mb-3 text-muted">&copy; Medhead 2023</p>
    </form>

  </div>
</template>

<script>
import BrandName from "@/components/layouts/BrandName.vue";
import {loginUser} from "@/utils/auth";

export default {
  name: "Login",
  components: {BrandName},
  data() {
    return {
      username: null,
      password: null,
      loginError : null,
    }
  },

  methods: {
    login() {
      this.loginError = null;
      loginUser(this.username, this.password).then(() => {
        this.$router.push('/');
      }).catch(err => {
        this.loginError = err;
      })
    }
  }
}
</script>

<style scoped>

</style>
