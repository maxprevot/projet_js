<template>
  <div>
    <p>
      Number of restaurants for each page :
     <!--  <vue-material-slider :min="0" :max="20" v-model="pagesize"></vue-material-slider> -->
      <input
        type="range"
        min="2"
        max="100"
        value="10"
        v-on:input="getDataFromServer()"
        v-model="pagesize"
      />
      {{pagesize}}
    </p>
    <h1>Number of restaurants : {{nbRestaurants}}</h1>
    <h3>Current page : {{ page }}</h3>
    <md-button class="md-raised" v-on:click="firstPage()" v-bind:disabled="page==1">&lt;&lt;</md-button>
    <md-button class="md-raised" v-on:click="previousPage()" v-bind:disabled="page==1">Previous</md-button>
    <md-button class="md-raised" v-on:click="nextPage()" :disabled="page == nbPagesDeResultats">Next</md-button>
    <md-button class="md-raised" v-on:click="lastPage()" :disabled="page == nbPagesDeResultats">&gt;&gt;</md-button>

    <div class="md-layout">
      <h2 class="md-title, md-layout-item">Add a restaurant</h2>
      <md-field class="md-layout-item">
        <md-input placeholder="Name" v-model="nom" />
      </md-field>
      <span class="divider"></span>
      <md-field class="md-layout-item">
        <md-input placeholder="Cuisine" v-model="cuisine" />
      </md-field>
      <md-button class="md-raised md-primary" v-on:click="addRestaurant">Add</md-button>
    </div>

    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Name search</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Search by name..."
            v-model="nomRecherche"
            @input="getDataFromServer()"
          />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No users found"
        :md-description="`No user found for this '${nomRecherche}' query. Try a different search term or create a new user.`"
      ></md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
        <md-table-cell md-label="Details">
          <router-link :to="'restaurant/'+item._id">Details</router-link>
        </md-table-cell>
        <md-dialog class="update" :md-active.sync="update">
          <h2>Update restaurant id : {{ resto._id }}</h2>
          <br />
          <form>
            <md-field>
              <!-- <label> Name : </label> -->
              <!--  <md-input type ="text" placeHolder = "Restaurant name " v-model="resto.name"></md-input> -->
              <md-input type="text" placeholder="Name" v-model="resto.name"></md-input>
            </md-field>
            <br />
            <br />
            <md-field>
              <!--   <label> Cuisine : </label> -->
              <!--  <md-input type ="text" placeHolder = "Restaurant cuisine " v-model="resto.cuisine"></md-input> -->
              <md-input type="text" placeholder="Cuisine" v-model="resto.cuisine"></md-input>
            </md-field>
          </form>
          <md-dialog-actions>
            <md-button
              class="md-primary"
              @click="update = false"
              v-on:click="getDataFromServer()"
            >Close</md-button>
            <!-- on rafraichit pour restorer valeurs initiales -->
            <md-button
              class="md-primary"
              @click="update = false"
              v-on:click="updateRestaurant(resto)"
            >Save</md-button>
            <!-- on modifie le restaurant -->
          </md-dialog-actions>
        </md-dialog>
        <md-table-cell md-label="Update">
          <md-button class="md-primary md-raised" @click="update = true, resto= item">Update</md-button>
        </md-table-cell>

        <md-dialog class="update" :md-active.sync="del">
          <h2>Delete restaurant id : {{ resto._id }}</h2>
          <br />
          <p>Do you really want to delete this restaurant ?</p>
          <md-dialog-actions>
            <md-button
              class="md-primary"
              @click="del = false"
              v-on:click="getDataFromServer()"
            >Cancel</md-button>
            <!-- on rafraichit pour restorer valeurs initiales -->
            <md-button
              class="md-primary"
              @click="del = false"
              v-on:click="deleteRestaurant(resto._id)"
            >Confirm</md-button>
            <!-- on modifie le restaurant -->
          </md-dialog-actions>
        </md-dialog>
        <md-table-cell md-label="Delete">
          <md-button
            class="md-accent md-raised"
            @click="del = true, resto= item"
          >Delete</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "Restaurants",
  props: {},

  data: function() {
    return {
      resto: [],
      update: false,
      del: false,
      restaurants: [],
      nbRestaurants: 0,
      nom: "",
      cuisine: "",
      page: 1,
      pagesize: 10,
      nomRecherche: "",
      nbPagesDeResultats: 0,
      apiURL: "http://localhost:8080/api/restaurants"
    };
  },

  mounted() {
    console.log("Before print!");
    this.getDataFromServer();
  },

  methods: {
    getDataFromServer() {
      // ici on fait un fetch pour récupérer des
      // restaurants sur le serveur.
      let url =
        this.apiURL +
        "?page=" +
        this.page +
        "&pagesize=" +
        this.pagesize +
        "&name=" +
        this.nomRecherche;

      fetch(url)
        .then(reponseJSON => {
          return reponseJSON.json();
        })
        .then(reponseJS => {
          // ici on a la réponse sous la forme
          // d'un objet JS
          this.restaurants = reponseJS.data;
          this.nbRestaurants = reponseJS.count;
          this.nbPagesDeResultats = Math.floor(
            this.nbRestaurants / this.pagesize
          );
        });
    },

    async deleteRestaurant(id) {
      try {
        let reponseJSON = await fetch(this.apiURL + "/" + id, {
          method: "DELETE"
        });
        let reponseJS = await reponseJSON.json();
        console.log("Restaurant supprime : " + reponseJS.msg);
        this.getDataFromServer(); // on rafraichit l'affichage
      } catch (err) {
        console.log("Erreur dans le fetchs DELETE " + err.msg);
      }
    },

    async updateRestaurant(resto) {
      let dataForm = new FormData();
      dataForm.append("id", resto.id);
      dataForm.append("nom", resto.name);
      dataForm.append("cuisine", resto.cuisine);
      let responseJSON = await fetch(this.apiURL + "/" + resto._id, {
        method: "PUT",
        body: dataForm
      });
      let responseJS = await responseJSON.json();
      console.log(responseJS.msg);
      this.getDataFromServer();
    },
    /*  deleteRestaurant(index) {
      this.restaurants.splice(index, 1);
    }, */
    async addRestaurant(event) {
      // eviter le comportement par defaut
      event.preventDefault();
      let dataForm = new FormData();
      dataForm.append("nom", this.nom);
      dataForm.append("cuisine", this.cuisine);

      let reponseJSON = await fetch(this.apiURL, {
        method: "POST",
        body: dataForm
      });
      let reponseJS = await reponseJSON.json();
      console.log(reponseJS.msg);

      this.nom = "";
      this.cuisine = "";

      this.getDataFromServer(); // on rafraichit
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
    nextPage() {
      console.log("Next page");
      this.page++;
      this.getDataFromServer();
    },
    previousPage() {
      console.log("Previous page");
      this.page--;
      this.getDataFromServer();
    },
    firstPage() {
      this.page=1;
      this.getDataFromServer();
    },
    lastPage() {
      this.page=this.nbPagesDeResultats;
      this.getDataFromServer();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.divider {
  margin: 5px;
}
.update {
  padding: 20px;
}
</style>
