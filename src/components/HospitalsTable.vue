<template>
  <div>
    <b-table v-if="!lightTable" ref="hospitalsTableFull" striped hover :items="hospitals" :fields="fields"  :per-page="perPage" :current-page="currentPage"
             show-empty class="hospitals-table">
      <template #cell(address)="data">
        <div>{{ data.item.address.numberAndStreetName}}</div>
        <div>{{ data.item.address.addressComplement}}</div>
        <div>{{ data.item.address.postCode}}</div>
        <div>{{ data.item.address.city}}</div>
        <div>{{ data.item.address.country}}</div>
      </template>
      <template #cell(medicalSpecialities)="data">
        <span v-html="data.value"></span>
      </template>
      <template #empty>
        <div class="text-center">Aucun hôpital enregistré.</div>
      </template>
      <template #cell(availableEmergencyBedrooms)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(id)="data">
        <router-link :to="{ name: 'hospital-emergency-bedrooms', params: { hospitalId : data.value }}" class="btn btn-secondary">
          Détail des chambres <b-icon icon="eye-fill" />
        </router-link>
      </template>
    </b-table>
    <!-- Light table -->
    <b-table v-else ref="hospitalsTableLight" striped hover :items="hospitals" :fields="fields" show-empty  :per-page="perPage" :current-page="currentPage"
             :style="showPagination ? 'min-height:285px' : ''" show-empty class="hospitals-table light-hospitals-table" @row-clicked="onRowClicked">
      <template #cell(address)="data">
        <div>{{ data.item.address.numberAndStreetName}}</div>
        <div>{{ data.item.address.addressComplement}}</div>
        <div>{{ data.item.address.postCode}}</div>
        <div>{{ data.item.address.city}}</div>
        <div>{{ data.item.address.country}}</div>
      </template>
      <template #cell(medicalSpecialities)="data">
        <span v-html="data.value"></span>
      </template>
      <template #empty>
        <div class="text-center">Aucun hôpital enregistré.</div>
      </template>
      <template #cell(availableEmergencyBedrooms)="data">
        <span>{{ data.value }}</span>
      </template>
    </b-table>
    <b-pagination v-if="showPagination" v-model="currentPage" :total-rows="rows" :per-page="perPage" size="sm"></b-pagination>
  </div>
</template>

<script>

export default {
  name : 'HospitalsTable',
  props : {hospitals: { type : Array, default : []}, lightTable : {type : Boolean, default : false}},
  data() {
    return {
      perPage : 5,
      currentPage : 1,

      fields: [
        {key : 'code', sortable : true},
        {key : 'name', label : 'Nom', sortable : true},
        {key : 'address', label : 'Adresse',  thClass: this.lightTable ? 'd-none' :  null, tdClass: this.lightTable ? 'd-none' :  null},
        {key : 'medicalSpecialities', label : 'Spécialités médicales', formatter : (ms) => ms.map(e => this.$store.state.mapMedicalSpecialities.get(e)).join(', ')},
        {key : 'totalEmergencyBedrooms', label : 'Nombre de chambre total',  thClass: this.lightTable ? 'd-none' :  null, tdClass: this.lightTable ? 'd-none' :  null,  sortable : true},
        {key : 'availableEmergencyBedrooms', label : 'Chambres disponibles',  sortable : true},
        {key : 'id', label : "Action", thClass: this.lightTable ? 'd-none' :  null, tdClass: this.lightTable ? 'd-none' :  null}
      ]
    }
  },

  computed: {
    rows() {
      return this.hospitals.length
    },

    showPagination(){
      return this.hospitals.length > this.perPage;
    }
  },

  methods : {
    onRowClicked(item, index, event) {
      this.$router.push({ name: 'hospital-emergency-bedrooms', params: { hospitalId : item.id }})
    }
  }
}
</script>
