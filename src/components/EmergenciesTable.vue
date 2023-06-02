<template>
  <div>
    <b-table ref="emergenciesTable" striped hover :items="emergencies" :fields="fields" :per-page="perPage" :current-page="currentPage" show-empty
      :style="showPagination ? 'min-height:285px' : ''" class="emergencies-table">
      <template #empty>
        <div class="text-center">Aucune urgence enregistrées</div>
      </template>
    </b-table>
    <b-pagination v-if="showPagination" v-model="currentPage" :total-rows="rows" :per-page="perPage" size="sm"></b-pagination>
  </div>
</template>

<script>

export default {
  name : 'EmergenciesTable',
  props : {emergencies: { type : Array, default : []}},
  data() {
    return {
      perPage : 5,
      currentPage : 1,

      fields: [
        {key : 'medicalSpeciality', label : "Type d'urgence", sortable : true, formatter: (ms) => this.$store.state.mapMedicalSpecialities.get(ms)},
        {key : 'description'},
        {key : 'patientId', label : "Patient",  sortable : true, formatter: "getPatientById"},
        {key : 'hospitalId', label : "Hôpital" , sortable : true, formatter: "getHospitalById"},
        {key : 'status', sortable : true, formatter: (status) => this.$store.state.mapEmergencyStatus.get(status) },
        {key : 'updatedAt', label: 'Mise à jour', sortable : true, formatter: "toLocalDatetime"},
      ]
    }
  },

  computed: {
    rows() {
      return this.emergencies.length
    },

    showPagination(){
      return this.emergencies.length > this.perPage;
    }
  },

  methods : {
    getPatientById(patientId) {
      let patient = this.$store.state.patients.find(({id}) => id === patientId);
      if(patient !== null && patient !== undefined){
        return patient.firstName + " " + patient.lastName;
      } else {
        return "Inconnu";
      }
    },

    getHospitalById(hospitalId) {
      let hospital = this.$store.state.hospitals.find( ({id}) => id === hospitalId);
      if(hospital !== null && hospital !== undefined){
        return "(" + hospital.code +") " + hospital.name
      } else {
        return "En attente";
      }
    },

    toLocalDatetime(stringDateTime) {
      let dateTime = new Date(stringDateTime)
      return dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString() ;
    },
  }
}
</script>
