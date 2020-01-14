<template>
  <div>
      <div style="text-align:left"> <md-button class="md-primary" @click="$router.go(-1)"> &lt; Back </md-button></div>
   
    <h1>The menu</h1>

    <h1 class="md-title">Dishes</h1>
    <md-table v-model="plats" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="nom">{{ item.nom }}</md-table-cell>
        <md-table-cell md-label="Price" md-sort-by="prix">{{ item.prix }} €</md-table-cell>
        <md-table-cell md-label="Description" md-sort-by="description">{{ item.description }}</md-table-cell>
      </md-table-row>
    </md-table>

     <h1 class="md-title">Desserts</h1>
    <md-table v-model="desserts" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="nom">{{ item.nom }}</md-table-cell>
        <md-table-cell md-label="Price" md-sort-by="prix">{{ item.prix }} €</md-table-cell>
        <md-table-cell md-label="Description" md-sort-by="description">{{ item.description }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "RestaurantMenu",
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
      plats: [
        {
          nom: "Pâtes à la bolognaise",
          prix: 8,
          description: "Des pâtes"
        },
        {
          nom: "Endives au jambon",
          prix: 6,
          description: "Des endives"
        },
        {
          nom: "Hachis Parmentier",
          prix: 8,
          description: "Hachis Parmentier du jour"
        }
      ],
      desserts: [
        {
          nom: "Yaourt",
          prix: 3,
          description: "A la vanille"
        },
        {
          nom: "Gateau chocolat",
          prix: 5,
          description: "Fait maison"
        },
        {
          nom: "Fruits",
          prix: 4,
          description: "Salades de fruits"
        }
      ],
      apiURL: "http://localhost:8080/api/restaurants",
      restaurant: []
    };
  },
  mounted() {
    
  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
