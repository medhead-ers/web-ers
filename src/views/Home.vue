<template>
  <main-layout>
    <div class="row">
      <div class="col-12">
        <h1 class="h3 pt-3 pb-1 mb-3">Dashboard - Urgences</h1>
        <emergencies-table :emergencies="$store.state.emergencies" />
      </div>
      <div class="col-lg-5 mt-2">
        <h2 class="h4 pt-3 pb-1 mb-3">Patients</h2>
        <patients-table :patients="$store.state.patients" />
      </div>
      <div class="col-lg-7 mt-2">
        <h2 class="h4 pt-3 pb-1 mb-3">Hôpitaux</h2>
        <hospitals-table :hospitals="$store.state.hospitals" light-table />
      </div>
    </div>
  </main-layout>
</template>

<script>

import HospitalsTable from "@/components/HospitalsTable.vue";
import PatientsTable from "@/components/PatientsTable.vue";
import EmergenciesTable from "@/components/EmergenciesTable.vue";
import MainLayout from "@/components/layouts/MainLayout.vue";

export default {
  components : {
    MainLayout,
    EmergenciesTable,
    HospitalsTable, PatientsTable
  }
}
</script>
