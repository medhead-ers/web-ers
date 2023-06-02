import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'


import  '@/scss/style.scss';
import axios from "axios";
import {getAuthCredentials, getDigestUsername, isLoggedIn} from "@/utils/auth";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)

axios.defaults.baseURL = 'http://medhead.localhost';

const websocketServer = {
  host: "medhead.localhost",
  port : 3500
}
const refreshOnEventTable  = {
  refreshHospitals: ['HospitalCreated', 'EmergencyBedroomBooked', 'EmergencyBedroomsCreated'],
  refreshEmergencyBedrooms: ['EmergencyBedroomBooked', 'EmergencyBedroomsCreated'],
  refreshEmergencies :  ['EmergencyCreated', 'EmergencyUpdated'],
  refreshPatients : ['PatientCreated']
};


const store = new Vuex.Store({
  state: {
    hospitals : [],
    emergencyBedroomsForHospital : {
      hospitalId : null,
      emergencyBedrooms: []
    },
    emergencies : [],
    patients: [],
    pendingEmergencyId : null,
    emergencyUpdatedNotification : {},
    appError: null,
    username: null,
    mapMedicalSpecialities : new Map([
      ["CARDIOLOGY", "Cardiologie"],
      ["OPHTHALMOLOGY", "Ophtalmologie"],
      ["NEUROPATHOLOGY", "Neuropathologie"],
      ["IMMUNOLOGY", "Immunologie"],
      ["DIAGNOSTIC", "Diagnostique"],
    ]),
    mapPatientGender : new Map([
      ["MALE", "Masculin"],
      ["FEMALE", "Féminin"],
      ["UNKNOWN", "Indéterminé"],
    ]),
    mapEmergencyStatus : new Map([
      ["PENDING", "En attente"],
      ["DISPATCHED", "Dispatché"]
    ])
  },

  mutations: {
    refreshHospitals() {
      axios.get('/hms/hospitals')
        .then( response => this.state.hospitals = response.data )
        .catch( error => this.state.appError = error );
    },
    refreshEmergencies() {
      axios.get('/ems/emergencies')
          .then ( response => this.state.emergencies = response.data )
          .catch( error => this.state.appError = error );
    },
    refreshEmergencyBedroomsForHospital(state, hospitalId) {
      axios.get('/hms/hospitals/'+hospitalId+'/emergency-bedrooms')
        .then ( response =>this.state.emergencyBedroomsForHospital = {hospitalId : hospitalId, emergencyBedrooms : response.data})
        .catch( error => this.state.appError = error );
    },
    refreshPatients() {
      axios.get('/pms/patients')
        .then( response => this.state.patients = response.data )
        .catch( error => this.state.appError = error );
    },
  }
})

new Vue({
  router,
  store,
  render: app => app(App),
  beforeCreate() {
    if(isLoggedIn()){
      axios.defaults.auth = getAuthCredentials();
      this.$store.state.username = getDigestUsername();
    }
  },

  created() {
    this.websocketServer();
  },

  methods : {
    websocketServer(){
      const ws = new WebSocket("ws://"+websocketServer.host+":"+3500+"/");
      ws.onerror =  () =>
        this.$store.state.appError = "Connexion avec le serveur interrompue. Les pages ne seront pas rechargées automatiquement.";
      ws.onmessage = ({data}) => {

        let wsEvent = JSON.parse(data);
        this.refreshOnEvent(wsEvent.eventType);

        if(wsEvent.eventType === 'EmergencyUpdated'
          && wsEvent.metadata.emergency !== undefined
          && wsEvent.metadata.emergency.id === this.$store.state.pendingEmergencyId
        ){
          this.notifEmergencyUpdated(wsEvent.metadata.emergency)
        }
      }
    },

    refreshOnEvent(event){
      if(refreshOnEventTable.refreshPatients.find(x => x === event))
        this.$store.commit('refreshPatients');
      if(refreshOnEventTable.refreshHospitals.find(x => x === event))
        this.$store.commit('refreshHospitals');
      if(refreshOnEventTable.refreshEmergencies.find(x => x === event))
        this.$store.commit('refreshEmergencies');
      if(refreshOnEventTable.refreshEmergencyBedrooms.find(x => x === event)
          && this.$store.state.emergencyBedroomsForHospital.hospitalId !== null)
          this.$store.commit('refreshEmergencyBedroomsForHospital', this.$store.state.emergencyBedroomsForHospital.hospitalId);
    },

    notifEmergencyUpdated(emergency){
      this.$store.state.emergencyUpdatedNotification = emergency;
      this.$root.$emit('bv::show::modal', 'emergency-dispatched-notification');
    }
  }
}).$mount('#app')
