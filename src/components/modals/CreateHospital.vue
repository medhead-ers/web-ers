<template>
    <b-modal id="create-hospital" ref="createHospital" size="lg" hide-header hide-footer>
    <form v-if="!form.hospitalCreatedWithSuccess" @submit.prevent="submitCreateHospital()">
      <div class="py-2 text-center mb-1">
        <h2>Création d'un hôpital</h2>
      </div>
      <div class="row">
        <div class="col-md-11 mx-auto">
          <div class="row">
            <div class="col-md-8">
              <label for="hospitalName">Nom</label>
              <input type="text" class="form-control" id="hospitalName" required v-model="hospital.name" min="3">
            </div>
            <div class="col-md-4">
              <label for="hospitalCode">Code</label>
              <input type="text" class="form-control" id="hospitalCode" required v-model="hospital.code"
                     maxlength="5" pattern="[A-Z0-9]{5}" min="5">
              <small class="text-muted">Format : [A-Z] ou [0-9]</small>
            </div>
          </div>
          <div class="row">
            <div class="col-12 mb-3">
              <label for="hospitalAddressNumberAndStreetName">Numéro et rue</label>
              <input type="text" class="form-control" id="hospitalAddressNumberAndStreetName" required v-model="hospital.address.numberAndStreetName">
            </div>
          </div>
          <div class="row">
            <div class="col-12 mb-3">
              <label for="hospitalAddressComplement">Complément d'adresse</label>
              <input type="text" class="form-control" id="hospitalAddressComplement" v-model="hospital.address.addressComplement">
              <small class="text-muted">(Optionnel)</small>
            </div>
          </div>

          <div class="row">
            <div class="col-md-2 mb-3">
              <label for="hospitalAddressPostCode">Code postal</label>
              <input type="text" class="form-control" id="hospitalAddressPostCode" required v-model="hospital.address.postCode" maxlength="10">
            </div>
            <div class="col-md-5 mb-3">
              <label for="hospitalAddressCity">Ville</label>
              <input type="text" class="form-control" id="hospitalAddressCity" required v-model="hospital.address.city">
            </div>
            <div class="col-md-5 mb-3">
              <label for="hospitalAddressCountry">Pays</label>
              <input type="text" class="form-control" id="hospitalAddressCountry" v-model="hospital.address.country" required>
            </div>
          </div>

          <div class="row">
            <div class="d-flex align-items-center col-md-3 mb-3 pt-3">
              <div class="font-weight-bold">Coordonnées GPS : </div>
            </div>
            <div class="offset-1 col-md-4 mb-3">
              <label for="hospitalGpsLatitude">Lat.</label>
              <input type="text" class="form-control" id="hospitalGpsLatitude" v-model="hospital.gpsCoordinates.latitude" required />
            </div>
            <div class="col-md-4 mb-3">
              <label for="hospitalGpsLongitude">Long.</label>
              <input type="text" class="form-control" id="hospitalGpsLongitude" v-model="hospital.gpsCoordinates.longitude" required />
            </div>
          </div>
          <hr class="mb-4">
          <h5 class="mb-3 mt-2">Information complémentaires</h5>
          <div class="row">
            <div class="col-md-7 mb-3">
              <label for="hospitalMedicalSpecialities">Spécialités disponibles</label>
              <select class="custom-select d-block w-100" id="hospitalMedicalSpecialities" required v-model="hospital.medicalSpecialities" multiple style="height: 130px; overflow: hidden">
                <option v-for="item in $store.state.mapMedicalSpecialities" :value="item[0]">{{ item[1] }}</option>
              </select>
              <small class="text-muted">CTRL + Click (Windows) ou CMD + Click (Mac) pour sélectionner plusieurs</small>
            </div>
            <div class="offset-2 col-md-3 mb-3">
              <label for="nbEmergencyBedrooms">Nombre de chambres</label>
              <input type="number" class="form-control" id="nbEmergencyBedrooms" v-model="nbEmergencyBedrooms" min="0" max="50" required>
              <small class="text-muted">(Chambres des urgences)</small>
            </div>
          </div>

          <div class="row mt-2">
            <div class="offset-1 col-md-5 mb-3">
              <button class="btn btn-secondary btn-md btn-block" type="button" @click="reset">Annuler</button>
            </div>
            <div class="col-md-5 mb-3">
              <button class="btn btn-primary btn-md btn-block">Valider</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div v-else>
      <div class="py-2 text-center">
        <h4>Création d'un hôpital</h4>
      </div>
      <div class="row">
        <div class="col-md-11 mx-auto">
          <div class="text-center mt-4">
            <img src="@/assets/success.png" width="75" alt="success"/>
          </div>
          <h5 class="text-center mt-4 ">Nouvel hôpital créé</h5>
          <div class="m-3 mt-4">
            <div class="row py-2">
              <div class="col-3 font-weight-bold">Code / Nom :</div>
              <div class="col-9">
                (<span class="font-weight-bold">{{hospital.code}}</span>)
                {{hospital.name}}
              </div>
            </div>
            <div class="row py-2">
              <div class="col-3 font-weight-bold">Adresse :</div>
              <div class="col-9">
                <div>{{ hospital.address.numberAndStreetName}}</div>
                <div>{{ hospital.address.addressComplement}}</div>
                <div>{{ hospital.address.postCode}}</div>
                <div>{{ hospital.address.city}}</div>
                <div>{{ hospital.address.country}}</div>
              </div>
            </div>
            <div class="row py-2">
              <div class="col-3 font-weight-bold">Coordonnées GPS (lat / long) :</div>
              <div class="col-9">{{hospital.gpsCoordinates.latitude}} | {{hospital.gpsCoordinates.longitude}}</div>
            </div>
            <div class="row py-2">
              <div class="col-5 font-weight-bold">Urgence médicale traitée:</div>
              <div class="col-7">{{ formatedMedicalSpecialities }}</div>
            </div>
            <div class="row  py-2">
              <div class="col-5 font-weight-bold">Nombre de chambres disponibles :</div>
              <div class="col-7">{{ hospital.totalEmergencyBedrooms }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-10 mx-auto mt-4 mb-3">
              <button @click="close" class="btn btn-success btn-md btn-block">Terminer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>

</template>

<script>
import axios from "axios";

export default {
  name : 'CreateHospital',
  data() {
    return {
      form : {
        hospitalCreatedWithSuccess : false
      },
      nbEmergencyBedrooms : 0,

      hospital : {
        id : null,
        name : null,
        code : null,
        address : {
          numberAndStreetName : null,
          addressComplement : null,
          city : null,
          postCode : null,
          country : null
        },
        medicalSpecialities : [],
        gpsCoordinates : {latitude : 51.5168739071931, longitude : -0.10158713368240736},
        totalEmergencyBedrooms : 0
      }
    }
  },

  computed: {
    formatedMedicalSpecialities() {
      return this.hospital.medicalSpecialities.map(e => this.$store.state.mapMedicalSpecialities.get(e)).join(', ');
    }
  },

  methods : {
    async submitCreateHospital(){
      await this.createHospital();
      await this.createEmergencyBedrooms();
    },

    async createHospital(){
      return axios.post('http://medhead.localhost/hms/hospitals', this.hospital)
        .then(response =>{
          this.hospital = response.data;
      })
        .catch(error => {
          this.$store.state.appError = error;
      })
    },

    async createEmergencyBedrooms(){
      return axios.post('http://medhead.localhost/hms/hospitals/'+this.hospital.id + '/emergency-bedrooms/' + this.nbEmergencyBedrooms)
        .then(response =>{
          this.hospital.totalEmergencyBedrooms = response.data.length;
          this.form.hospitalCreatedWithSuccess = true;
        })
        .catch(error => {
          this.$store.state.appError = error;
        })
    },

    reset() {
      this.nbEmergencyBedrooms = 0;
      this.hospital =  {
        id : null, name : null, code : null, medicalSpecialities : [], gpsCoordinates : {latitude : null, longitude : null}, totalEmergencyBedrooms : 0,
        address : { numberAndStreetName : null, addressComplement : null, city : null, postCode : null, country : null}
        }
      this.form.hospitalCreatedWithSuccess = false;
    },

    close(){
      this.$bvModal.hide('create-hospital');
    }
  }
}
</script>
