<template>
  <main-layout>
    <h1 class="h3 pt-3 pb-1 mb-3">{{ hospital.name }} <small>({{ hospital.code }})</small></h1>
    <div class="row">
      <div class="col-lg-4">
        <h6 class="mb-2">Spécialités traités</h6>
        <div v-html=" hospitalMedicalSpecialities " />
      </div>
      <div class="col-lg-4">
        <h6 class="mb-2">Adresse</h6>
        <div>{{ hospital.address.numberAndStreetName}} {{ hospital.address.addressComplement}}</div>
        <div>{{ hospital.address.postCode}}, {{ hospital.address.city}}</div>
        <div>{{ hospital.address.country}}</div>
      </div>
      <div class="col-lg-4">
        <h6 class="mb-2">Chambres</h6>
        <div>Occupées : {{ countEmergencyBedroom('OCCUPIED') }}</div>
        <div>Disponibles : {{ countEmergencyBedroom('AVAILABLE') }}</div>
        <div>Indisponibles : {{ countEmergencyBedroom('UNAVAILABLE') }} </div>
      </div>
    </div>
    <hr class="mb-1 mt-3">
    <h2 class="h4 pt-3 pb-1 mb-3">Statut des chambres</h2>
    <div class="row justify-content-around">
      <b-card-group v-for="emergencyBedroom in $store.state.emergencyBedroomsForHospital.emergencyBedrooms"
                    deck class="emergency-bedroom-card col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-4" style="min-height: 165px;">
        <b-card
          :bg-variant="getEmergencyBedroomCardVariant(emergencyBedroom.state)"
          header-tag="header"
          class="text-center">
          <template #header>
            <h6 class="mb-1" v-b-tooltip.hover.right :title="emergencyBedroom.code">Chambre {{ emergencyBedroom.code.slice(-3) }}</h6>
          </template>
          <b-card-text v-if="emergencyBedroom.state === 'AVAILABLE'">
            <div class="font-weight-bold">Libre</div>
          </b-card-text>
          <b-card-text v-else-if="emergencyBedroom.state === 'OCCUPIED'"
                       v-b-tooltip.hover.bottom :title="getEmergencyDescriptionByEmergencyId(emergencyBedroom.emergencyId)"
          >
            <div class="font-weight-bold border-bottom border-light pb-2 mb-2">Occupée</div>
            <div>{{ getPatientById(emergencyBedroom.patientId) }}</div>
            <div> {{ getMedicalSpecialityByEmergencyId(emergencyBedroom.emergencyId) }}</div>
          </b-card-text>
          <b-card-text v-else-if="emergencyBedroom.state === 'UNAVAILABLE'">
            <div class="d-flex justify-content-center align-items-center">
              <div class="font-weight-bold">Indisponible</div>
            </div>
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </main-layout>
</template>

<script>

import MainLayout from "@/components/layouts/MainLayout.vue";

export default {
  components : {
    MainLayout,
  },

  data() {
    return {
      hospital : null,
    }
  },

  created() {
    this.$store.commit('refreshEmergencyBedroomsForHospital', this.$route.params.hospitalId );
    this.hospital = this.getHospitalById(this.$route.params.hospitalId);
    if (this.hospital === undefined)
      this.$router.push({ name: 'not-found'});
  },

  computed : {
    hospitalMedicalSpecialities(){
      return this.hospital.medicalSpecialities.map(e => this.$store.state.mapMedicalSpecialities.get(e)).join('<br>');
    }
  },

  methods : {
    getEmergencyBedroomCardVariant(state) {
      if (state === "OCCUPIED") return "primary";
      if (state === "UNAVAILABLE") return "secondary";
      if (state === "AVAILABLE") return "success";
      return "default";
    },

    getPatientById(patientId) {
      let patient = this.$store.state.patients.find(({id}) => id === patientId);
      if (patient !== null && patient !== undefined) {
        return patient.firstName + " " + patient.lastName;
      } else {
        return "Inconnu";
      }
    },

    getHospitalById(hospitalId) {
      let hospital = this.$store.state.hospitals.find(({id}) => id === hospitalId);
      if (hospital !== null && hospital !== undefined) {
        return hospital
      }
      else return undefined;
    },


    getMedicalSpecialityByEmergencyId(emergencyId){
      let emergency = this.$store.state.emergencies.find(({id}) => id === emergencyId);
      if(emergency !== null && emergency !== undefined){
        return this.$store.state.mapMedicalSpecialities.get(emergency.medicalSpeciality);
      } else {
        return "Inconnu";
      }
    },

    getEmergencyDescriptionByEmergencyId(emergencyId){
      let emergency = this.$store.state.emergencies.find(({id}) => id === emergencyId);
      if(emergency !== null && emergency !== undefined && emergency.description.trim() !== ''){
        return emergency.description;
      } else {
        return "Aucune description disponible";
      }
    },

    countEmergencyBedroom(status){
      return this.$store.state.emergencyBedroomsForHospital.emergencyBedrooms.filter(e => e.state === status).length;
    }

  }
}
</script>
