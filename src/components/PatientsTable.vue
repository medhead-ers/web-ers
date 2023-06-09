<template>
  <div>
    <b-table striped hover :items="patients" :fields="fields"  :per-page="perPage" :current-page="currentPage" show-empty
             :style="showPagination ? 'min-height:285px' : ''" class="patients-table">
      <template #empty>
        <div class="text-center">Aucun patient disponibles</div>
      </template>
    </b-table>
    <b-pagination v-if="showPagination" v-model="currentPage" :total-rows="rows" :per-page="perPage" size="sm"></b-pagination>
  </div>
</template>
<script>

export default {
  name : 'PatientsTable',
  props : {patients: { type : Array, default : []}},
  data() {
    return {
      perPage : 5,
      currentPage : 1,

      fields: [
        {key : 'lastName', label :  "Nom", sortable : true},
        {key : 'firstName', label :  "Prénom", sortable : true},
        {key : 'age', label :  "Âge", sortable : true, formatter: (age) => age !== null ? age + " ans" : "Non précisé"},
        {key : 'gender', label :  "Genre", sortable : true, formatter: (gender)=>this.$store.state.mapPatientGender.get(gender)}
      ]
    }
  },

  computed: {
    rows() {
      return this.patients.length
    },

    showPagination(){
      return this.patients.length > this.perPage;
    }
  },

}
</script>
