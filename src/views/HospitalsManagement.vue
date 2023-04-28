<template>
  <main-layout>
    <div class="row">
      <div class="col-12 row">
        <h1 class="col-8 h2 pt-3 pb-1 mb-3">Hôpitaux</h1>
        <div class="col-4 pt-3 pb-1 mb-3 text-right">
          <create-hospital></create-hospital>
          <b-button v-b-modal:create-hospital variant="success">Ajouter un nouvel hôpital
            <b-icon icon="plus-square" aria-hidden="true" style="position: relative; top : 2px; left: 3px;"></b-icon>
          </b-button>
        </div>
        <div class="col-12">
          <hospitals-table :hospitals="$store.state.hospitals" />
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>

import HospitalsTable from "@/components/HospitalsTable.vue";
import MainLayout from "@/components/layouts/MainLayout.vue";
import CreateHospital from "@/components/modals/CreateHospital.vue";

export default {
  components : {
    CreateHospital,
    MainLayout,
    HospitalsTable
  }
}
</script>
