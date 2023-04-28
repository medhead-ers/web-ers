<template>
    <b-modal id="declare-emergency" ref="declareEmergency" size="lg" hide-header hide-footer>
    <form @submit.prevent="submitDeclareEmergency()">
      <div class="py-2 text-center">
        <h2>Déclarer une urgence</h2>
      </div>
      <div class="row">
        <div class="col-md-11 mx-auto">
          <h5 class="mb-3">Information patient</h5>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="patientLastName">Nom</label>
              <input type="text" class="form-control" id="patientLastName" required v-model="patient.lastName">
            </div>
            <div class="col-md-6 mb-3">
              <label for="patientFirstName">Prénom</label>
              <input type="text" class="form-control" id="patientFirstName" required v-model="patient.firstName">
            </div>
          </div>

          <div class="row">
            <div class="col-md-8 mb-3">
              <label for="patientGender">Genre</label>
              <select class="custom-select d-block w-100" id="patientGender" required v-model="patient.gender">
                <option v-for="item in $store.state.mapPatientGender" :value="item[0]">{{ item[1] }}</option>
              </select>
            </div>
            <div class="col-md-4 mb-3">
              <label for="patientAge">Age</label>
              <input type="number" class="form-control" id="patientAge" v-model="patient.age" min="0" max="150">
              <small class="text-muted">En années - (Optionnel)</small>
            </div>
          </div>
          <hr class="mb-4">

          <h5 class="mb-3">Information sur l'urgence</h5>

          <div class="row">
            <div class="col-md-4 mb-3">
              <label for="emergencyType">Type d'urgence</label>
              <select class="custom-select d-block w-100" id="emergencyType" required v-model="emergency.medicalSpeciality">
                <option v-for="item in $store.state.mapMedicalSpecialities" :value="item[0]">{{ item[1] }}</option>
              </select>
            </div>
            <div class="col-md-8 mb-3">
              <label for="emergencyDescription">Description ou commentaire</label>
              <textarea rows="4" class="form-control" id="emergencyDescription" v-model="emergency.description" required />
            </div>
          </div>
          <hr class="mb-4">

          <h5 class="mb-3">Localisation</h5>
          <div class="row">
            <div class="col-md-4 mb-3">
              <label for="emergencyGpsLatitude">Lat.</label>
              <input type="text" class="form-control" id="emergencyGpsLatitude" v-model="emergency.gpsCoordinates.latitude" required />
            </div>
            <div class="col-md-4 mb-3">
              <label for="emergencyGpsLongitude">Long.</label>
              <input type="text" class="form-control" id="emergencyGpsLongitude" v-model="emergency.gpsCoordinates.longitude" required />
            </div>
            <div class="offset-1 col-md-2 mb-3">
              <div class="text-center geolocation" @click="getCurrentLocation">
                <div>
                  <img src="@/assets/localisation.png" alt="geolocalisation" width="50">
                </div>
                <div>Me localiser</div>
              </div>
            </div>
          </div>
          <small v-if="geolocationError" class="text-danger">Géolocalisation non supporté par votre navigateur (Saisir les coordonnées manuellement)</small>
          <hr class="mb-4">
          <div class="row">
            <div class="offset-1 col-md-5 mb-4">
              <button class="btn btn-secondary btn-md btn-block" type="button" @click="reset">Annuler</button>
            </div>
            <div class="col-md-5 mb-4">
              <button class="btn btn-primary btn-md btn-block">Valider</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </b-modal>

</template>

<script>
import axios from "axios";

export default {
  name : 'DeclareEmergency',
  data() {
    return {
      patient : {
        id : null,
        lastName : null,
        firstName : null,
        gender : null,
        age : null
      } ,
      emergency : {
        patientId : null,
        medicalSpeciality : null,
        description : null,
        gpsCoordinates : {latitude : null, longitude : null},
      },

      geolocationError: false,
    }
  },

  methods : {
    async submitDeclareEmergency(){
      await this.createPatient();
      await this.declareEmergency();
    },

    async createPatient(){
      return axios.post('http://medhead.localhost/pms/patients', this.patient)
        .then(response =>{
          this.patient = response.data;
          this.emergency.patientId = this.patient.id;
      })
        .catch(error => {
          this.$store.state.appError = error;
      })
    },

    declareEmergency() {
      return axios.post('http://medhead.localhost/ems/emergencies', this.emergency)
        .then(response =>{
          this.$store.state.pendingEmergencyId = response.data.id;
          this.$refs['declareEmergency'].hide();
          this.reset();
        })
        .catch(error => {
          this.$store.state.appError = error;
        })
    },

    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            this.geolocationError = false;
            this.emergency.gpsCoordinates.latitude = position.coords.latitude;
            this.emergency.gpsCoordinates.longitude = position.coords.longitude;
          },
          () => this.geolocationError = true);
      } else {
        this.geolocationError = true;
      }
    },

    reset() {
      this.patient =  {lastName : null, firstName : null, gender : null, age : null};
      this.emergency = {type : null, description : null, gpsCoordinates : {latitude : null, longitude : null}};
    }
  }
}
</script>
