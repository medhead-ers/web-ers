<template>
  <b-modal id="emergency-dispatched-notification" ref="emergency-dispatched-notification" size="md"
           hide-header hide-footer
  >
    <div class="py-2 text-center">
      <h4>Confirmation de prise en charge</h4>
    </div>
    <div class="row">
      <div class="col-md-11 mx-auto">
        <div class="text-center mt-4">
          <img src="@/assets/success.png" width="75" alt="success"/>
        </div>
        <div class="m-3 mt-4">
          <div class="row py-2">
            <div class="col-5 font-weight-bold">Patient :</div>
            <div class="col-7">{{getPatientById}}</div>
          </div>
          <div class="row py-2">
            <div class="col-5 font-weight-bold">Urgence médicale :</div>
            <div class="col-7">{{ getMedicalSpeciality }}</div>
          </div>
          <div class="row  py-2">
            <div class="col-5 font-weight-bold">Hôpital affecté :</div>
            <div class="col-7" v-html="getHospitalById"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-10 mx-auto mt-2 mb-3">
            <button @click="close" class="btn btn-success btn-md btn-block">Teminer</button>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "EmergencyDispatchedNotification",
  props : ['emergency'],
  computed : {
    getPatientById() {
      let patient = this.$store.state.patients.find(({id}) => id === this.emergency.patientId);
      if(patient !== null && patient !== undefined){
        return patient.firstName + " " + patient.lastName;
      } else {
        return "Inconnu";
      }
    },
    getHospitalById() {
      let hospital = this.$store.state.hospitals.find( ({id}) => id === this.emergency.hospitalId);
      if(hospital !== null && hospital !== undefined){
        return `
          <div class="font-weight-bold">`+hospital.name+`</div>
          <div>`+hospital.address.numberAndStreetName+`</div>
          <div>`+hospital.address.postCode+`</div>
          <div>`+hospital.address.city+`</div>
          <div>`+hospital.address.country+`</div>
        `
      } else {
        return "Inconnu";
      }
    },

    getMedicalSpeciality() {
      return this.$store.state.mapMedicalSpecialities.get(this.emergency.medicalSpeciality)
    }
  },
  methods: {
    close(){
      this.$bvModal.hide('emergency-dispatched-notification');
    }
  }
}
</script>
