<template>
    <div>
    <div class="content" id="add">
            <h2 v-if="name" class="content-head is-center">{{name}}</h2>
                                  <div id="notification-success"><div id="img"><i class="fas fa-check"></i></div><div id="desc-success">Successfully added</div></div>
<div id="notification-error"><div id="img"><i class="fas fa-times"></i></div><div id="desc-error">Not added</div></div>
        <!-- <div class="pure-g" id="container"> -->
        <div class="pure-g">
            <!-- <div class="l-box pure-u-lg-1"> -->
              <div id="topHeader">
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-2-3 is-center">
              <img :src="artistUrl">

            </div>
                <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 is-center">
                  <ul id="drop-down">
			<li>
				<i class="fas fa-plus"></i>
				<ul>
					<li class="dropdownItem"><div @click="addArtistToFavorites()">Favorites</div></li>
					<!-- <li v-else class="dropdownItemRemove"><div @click="addToList($event)">Remove from Favorites</div></li> -->
					<li class="dropdownItem"><div @click="addArtistToTopFive()">Top Five</div></li>
					<!-- <li v-else class="dropdownItemRemove"><div @click="addToList($event)">Remove from Top Five</div></li> -->

				</ul>
			</li>
		</ul>  
            </div>
              </div>

            <!-- </div> -->
        </div>

          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">
            <button v-show="artistObject.ontour" class="is-center on-tour">On tour</button>
            <button v-show="!artistObject.ontour" class="is-center pure-button">Not on tour</button>
              <p v-if="artistObject.stats.listeners">
                Listeners: {{parseInt(artistObject.stats.listeners).toLocaleString()}}
              </p>
              <p v-else>
                Listeners: N/A
              </p>
              <p v-if="artistObject.stats.playcount">
                Playcount: {{parseInt(artistObject.stats.playcount).toLocaleString()}}
              </p>
              <p v-else>
                Playcount: N/A
              </p>
            <div v-if="artistObject.bio.content.length < 3000" class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">
            <p v-html="artistObject.bio.content"></p>
            </div>
            <div v-else class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">
            <button  @click="displayBio($event)" id="bioButton" class="pure-button is-center">Show Bio</button>
            <p class="l-box" v-html="artistObject.bio.content" v-if="display"></p>
            </div>
          </div>

        <!-- </div> -->
            <h3 class="content-head is-center">Similar Artists</h3>        
            <div class="pure-g">
            <div v-for="(similarArtist, index) in artistObject.similar.artist" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-5" :key="index">
            <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center" >
              <router-link :to="{name: 'ArtistPage', params: {name: similarArtist.name}}"><h4 class="childLink">{{similarArtist.name}}</h4></router-link>
            </div>
            <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center" >
                      <router-link :to="{name: 'ArtistPage', params: {name: similarArtist.name}}">                    
              <img class="clickable" :src="similarArtistUrls[index]" >
                      </router-link> 
            </div>
            </div>
        </div>
    </div>
    </div>
    			<!-- <li>
				<a href="">Playlists</a>
				<ul>
					<li>
						<a href="">Monotremes</a>
						<ul>
							<li><a href="">Echidnas</a></li>
							<li><a href="">Platypus</a></li>
						</ul>
					</li>
					<li>
						<a href="">Marsupials</a>
						<ul>
							<li><a href="">Opossums</a></li>
							<li><a href="">Numbats, etc.</a></li>
							<li><a href="">Bandicoots, etc.</a></li>
							<li><a href="">Kangaroos, koalas, wombats, etc.</a></li>
						</ul>
					</li>
					<li>
						<a href="">Placentals</a>
						<ul>
							<li><a href="">Primates, ungulates, etc.</a></li>
							<li><a href="">Anteaters, sloths, etc.</a></li>
							<li><a href="">Elephants, etc.</a></li>
						</ul>
					</li>
				</ul>
			</li> -->
</template>

<script>
import axios from "axios";
import firebase, { functions } from "firebase";
import { mapKeys } from "lodash";

export default {
  name: "ArtistPage",
  data() {
    return {
      artistObject: {},
      similarArtistObject: {},
      itemInFavorites: false,
      itemInTopFive: false,
      simItemInFavorites: false,
      simItemInTopFive: false,
      itemExists: false,
      artistUrl: "",
      artistName: "",
      similarArtistUrls: [],
      removeKey: null,
      removeKeyTopFive: null,
      display: false,
      topFiveCount: 0
    };
  },
  props: {
    name: { type: String }
  },
  methods: {
    toArtist(artistIndex) {
      // console.log(this.artistObject.similar.artist[artistIndex].name);
      this.$router.push({
        name: "ArtistPage",
        params: {
          name: this.artistObject.similar.artist[artistIndex].name
        }
      });
    },
        launch_success(desc = "success", duration = 4500) {
      var x = document.getElementById("notification-success");
      var success_notifcation_desc = document.getElementById("desc-success");
      success_notifcation_desc.innerHTML = desc;
      x.className = "show";
      setTimeout(function() {
        x.className = x.className.replace("show", "");
      }, duration);
    },
    launch_error(desc = "something went wrong", duration = 4500) {
      var x = document.getElementById("notification-error");
      var error_notifcation_desc = document.getElementById("desc-error");
      error_notifcation_desc.innerHTML = desc;
      x.className = "show";
      setTimeout(function() {
        x.className = x.className.replace("show", "");
      }, duration);
    },
    getSimArtistIndex(ind) {
      console.log(ind);
    },
    displayBio(event) {
      // console.log(document.getElementById('bioButton').innerHTML);            
      // console.log(event.target.innerHTML);
      if (this.display) {
        this.display = false;
        document.getElementById('bioButton').innerHTML = "Show Bio";
      } else {
        this.display = true;
      document.getElementById('bioButton').innerHTML = "Close";            
}
    },
    myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
    },
    // Close the dropdown menu if the user clicks outside of it
    documentClick: function(event) {
      if (!event.target.matches(".fa-plus")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    },
    addArtistToFavorites(){
  var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      var selectedItem = this.artistObject;
      ref.itemInFavorites = false;
      console.log(selectedItem);
      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/favorites")
        .once("value")
        .then(function(snapshot) {
          var arr = [];
          snapshot.forEach(function(childNodes) {
            // console.log(childNodes.val());
            arr.push(childNodes.val());
          });
      // console.log(arr);
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == "album" && selectedItem.type == "album") {
              if (
                selectedItem.artist == arr[i].artist &&
                selectedItem.name == arr[i].name
              ) {
                ref.itemInFavorites = true;
              }
            } else if (
              arr[i].type == "artist" &&
              selectedItem.type == "artist"
            ) {
              if (
                // selectedItem.artist.name == arr[i].artist.name &&
                selectedItem.name == arr[i].name
              ) {
                ref.itemInFavorites = true;
              }
            } else if (
              arr[i].type == "track" &&
              selectedItem.type == "track"
            ) {
              // console.log('track hi');
              if (
                selectedItem.artist.name == arr[i].artist.name &&
                selectedItem.name == arr[i].name
              ) {
                ref.itemInFavorites = true;
              }
            }
          }

          console.log(ref.itemInFavorites);
          if (!ref.itemInFavorites) {
              var newPostRef = firebase
                .database()
                .ref("userObjects/" + user.uid + "/favorites/")
                .push(selectedItem);
              ref.launch_success(`${selectedItem.name} added to favorites`);
            // }
          } else {
            // alert("already in favorites");
            ref.launch_error(`${selectedItem.name} already in favorites`);
          }
        });
    },  addArtistToTopFive(){
  var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      var selectedItem = this.artistObject;
      ref.itemInTopFive = false;
      console.log(selectedItem);
      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/topfive")
        .once("value")
        .then(function(snapshot) {
          var arr = [];
          snapshot.forEach(function(childNodes) {
            // console.log(childNodes.val());
            arr.push(childNodes.val());
          });
      // console.log(arr);
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == "album" && selectedItem.type == "album") {
              if (
                selectedItem.artist == arr[i].artist &&
                selectedItem.name == arr[i].name
              ) {
                ref.itemInTopFive = true;
              }
            } else if (
              arr[i].type == "artist" &&
              selectedItem.type == "artist"
            ) {
              if (
                // selectedItem.artist.name == arr[i].artist.name &&
                selectedItem.name == arr[i].name
              ) {
                ref.itemInTopFive = true;
              }
            } else if (
              arr[i].type == "track" &&
              selectedItem.type == "track"
            ) {
              // console.log('track hi');
              if (
                selectedItem.artist.name == arr[i].artist.name &&
                selectedItem.name == arr[i].name
              ) {
                ref.itemInTopFive = true;
              }
            }
          }

          console.log(ref.itemInTopFive);

          if (!ref.itemInTopFive) {
            // console.log(snapshot.numChildren());
            if (snapshot.numChildren() < 5) {
              var newPostRef = firebase
                .database()
                .ref("userObjects/" + user.uid + "/topfive/")
                .push(selectedItem);
              ref.itemInTopFive = true;
              ref.launch_success(
                `${selectedItem.name} added to Top Five`
              );
            } else {
              ref.launch_error(`Top Five is set`);
            }
          } else {
            ref.launch_error(`${selectedItem.name} already in Top Five`);
          }
        });
    },
  },
  created() {
    document.addEventListener("click", this.documentClick);
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${
          this.name
        }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
      )
      .then(res => {
        this.artistObject = res.data.artist;
        this.artistObject.api = 'lastfm';

              var artist = this.artistObject;

      var textArray = [];
      var images = [];
      var similarArtistImages = [];
      for (var i = 0; i < this.artistObject.image.length; i++) {
        // textArray.push(artist.image[0]);
        const test = mapKeys(this.artistObject.image[i], (value, key) => {
          if (key === "#text") return "text";
          return key;
        });
        images.push(test);
      }
      for (var j = 0; j < this.artistObject.similar.artist.length; j++) {
        for (var k = 0; k < 6; k++) {
          const test = mapKeys(
            this.artistObject.similar.artist[j].image[k],
            (value, key) => {
              if (key === "#text") return "text";
              return key;
            }
          );
          // console.log(test);
          similarArtistImages[k] = test;
          // console.log(similarArtistImages[k]);
          delete this.artistObject.similar.artist[j].image[k];
          this.artistObject.similar.artist[j].image[k] = similarArtistImages[k];
        }
      }

      delete this.artistObject.image;
      delete this.artistObject.bio.links.link["#text"];
      this.artistObject.image = images;
      this.artistObject.type = "artist";

        console.log(this.artistObject);
        for (var i = 0; i < this.artistObject.similar.artist.length; i++) {
          this.similarArtistUrls.push(
            this.artistObject.similar.artist[i].image[1].text
          );
        }
        // console.log(this.artistObject.bio.content.length);
        this.artistUrl = this.artistObject.image[4].text;
      });
      console.log(this.artistObject);
  },
  destroyed() {
    // important to clean up!!
    document.removeEventListener("click", this.documentClick);
  }
};
</script>

<style scoped>
.on-tour {
  color: #fff;
  background: rgb(202, 60, 60);
  padding: 5px;
  margin-bottom: 10px; 
  border-radius: 10px;
  border: 1px solid rgb(202, 60, 60);
}
#topHeader{
    margin: 0 auto;
/* text-align:  */
}
#drop-down{
  float: left;
}
.dropdownItem {
  color: #06c;
  cursor: pointer;
}
.dropdownItem div {
  padding: 4px;
  cursor: pointer;
}
.dropdownItemRemove {
  color: red;
  cursor: pointer;
}
.dropdownItem:hover {
  color: white;
  background-color: rgb(51, 91, 124);
}

ul {
  padding: 0;
  margin: 0;
  /* background: #fff; */
  float: left;
}

li {
  float: left;
  display: inline;
  position: relative;
  width: 100px;
  list-style: none;
}

ul ul {
  position: absolute;
  left: 0;
  top: 100%;
  background: #ccc;
  display: none;
}

ul ul ul {
  left: 100%;
  top: 0;
  background: #999;
}

li:hover > ul {
  display: block;
}
</style>
