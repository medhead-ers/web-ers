<template>
  <div>
    <b-alert dismissible
             :show="$store.state.appError !== null"
             @dismissed = "$store.state.appError = null"
             variant="danger"
             class="app-error">
      Une erreur est survenue. {{ $store.state.appError }}
    </b-alert>
    <emergency-dispatched-notification :emergency="$store.state.emergencyUpdatedNotification" />
    <navbar />
    <div class="container-fluid" ref="container">
      <div class="row">
        <sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div class="justify-content-between pt-3 pb-2 mb-3 border-bottom">
            <slot></slot>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import EmergencyDispatchedNotification from "@/components/modals/EmergencyDispatchedNotification.vue";
import Navbar from "@/components/layouts/Navbar.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";

export default {
  name: "MainLayout",
  components: {Sidebar, Navbar, EmergencyDispatchedNotification},
  created() {
    this.$store.commit('refreshHospitals');
    this.$store.commit('refreshEmergencies');
    this.$store.commit('refreshPatients');
  }
}
</script>

<style scoped>

</style>
