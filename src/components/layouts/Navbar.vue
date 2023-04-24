<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="sticky-top p-0">
    <b-navbar-brand class="col-md-3 col-lg-2 mr-0 px-3">
      <brand-name />
    </b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mr-auto ml-3">
        <declare-emergency />
        <b-button v-b-modal:declare-emergency variant="primary">Déclarer une urgence
          <b-icon icon="plus-square" aria-hidden="true" style="position: relative; top : 2px; left: 3px;"></b-icon>
        </b-button>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto mr-3">
        <b-button variant="outline-danger" @click="logout()">Déconnexion
          <b-icon icon="power" aria-hidden="true"></b-icon>
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import BrandName from "@/components/layouts/BrandName.vue";
import DeclareEmergency from "@/components/modals/DeclareEmergency.vue";
import {logoutUser} from "@/utils/auth";

export default {
  name: "navbar",
  methods: {
    logout(){
      logoutUser();
      this.$router.push('/login');
    }
  },
  components: {DeclareEmergency, BrandName}
}
</script>
