<template>
  <div>
     <div style="text-align:left"> <md-button class="md-primary" @click="$router.go(-1)"> &lt; Back </md-button></div>
    <br />
    <br />
    <md-card md-with-hover style="width:60% ; margin:auto;">
      <md-ripple>
        <md-card-header>
          <div class="md-title">Restaurant {{restaurant.name}}</div>
          <br />
          <div>Cuisine : {{restaurant.cuisine}}</div>
          <div>Address : {{restaurant.address.building}} {{restaurant.address.street}} {{restaurant.address.zipcode}} {{restaurant.borough}}</div>
          <div>Coordinate : {{restaurant.address.coord}}</div>
          <div>Restaurant ID : {{restaurant.restaurant_id}}</div>
        </md-card-header>

        <md-card-actions>
          <md-button to="/Restaurants">Back</md-button>
          <md-button class="md-raised md-primary" :to= "restaurant._id + '/menu'">See menu</md-button>
         <!-- <router-link :to="restaurant._id+'/menu'">See menu</router-link> -->
        </md-card-actions>
      </md-ripple>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "RestaurantDetail",
  props: {},
  computed: {
    // computed data, permet de définir des data "calculées"
    id() {
      // on y accèdera par {{id}} dans le template, et par this.id
      // dans le code
      return this.$route.params.id;
    }
  },
  data: function() {
    return {
      apiURL: "http://localhost:8080/api/restaurants",
      restaurant: []
    };
  },
  mounted() {
    console.log("ID = " + this.id);
    this.getDataFromServer();
  },
  methods: {
    async getDataFromServer() {
      // ici on fait un fetch pour récupérer le détail du restaurant

      let responseJSON = await fetch(this.apiURL + "/" + this.id, {
        method: "GET"
      });
      let responseJS = await responseJSON.json();
      this.restaurant = responseJS.restaurant;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
