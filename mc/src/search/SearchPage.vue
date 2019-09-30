<template>
      <div>
        <div class="content" id="add">
            <h2 class="content-head is-center">Search Results for {{results | cap(results)}}</h2>
            <!-- <h1>{{info.data.artist.name}}</h1> -->
            <!-- <p class="is-center">{{$route.params.results}}</p> -->
            <div class="pure-g">
                <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-4">
              <form action="">
              <input class="search-bar" type="text" placeholder="Narrow your search.." v-model="search">
              </form>
                </div>
                  <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-4">
            <select class="search-bar" id="selectThing" v-model="select">
      <option v-for="(searchitem, index) in searchTypes" :key="index" :value="searchitem">{{searchitem}}</option>
    </select> <br>
                  </div>
            </div>

    
        <div class="results-container">
          <div class="pure-g">
                  <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1 is-center">
                  <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-12">
                    <h3>Artwork</h3>
                  </div>
                  <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-5">
                    <h3>Name</h3>
                  </div>                  
                  <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-6">
                    <h3>Type</h3>
                  </div>
                  <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-6">
                    <h3>Artist(s)</h3>
                  </div>
                  <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-6">
                    <h3>Source</h3>
                  </div>     
                  <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-12">
                    <h3>Options</h3>                    
                  </div>
                  <hr class="hr-header">                                                 
                  </div>
              <div v-if="filteredResults.length > 0" class="pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center search-box" v-for="(item, index) in filteredResults"  :key="index">
                  <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-12">

                    <img v-if="item.image && item.image[0]['#text'] == ''" src="https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png">
                    <img v-else-if="item.image && item.image[1]" :src="item.image[1]['#text']" alt="">
                    <img v-else-if="!item.images" :src="item.album.images[2].url" alt="">

                    <img v-if="item.images &&item.images.length >0  &&item.images[2]" :src="item.images[2].url" style="height:64px;width:64px;" alt="">
                    <img v-else-if="item.images && item.images.length ==0" src="https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/0d7f88f0-96da-11e6-9120-00163ed833e7/932972095/spotify-logo.png" alt="">
                    <img v-else-if="item.images&&item.images.length >0&&item.images[1] && item.type=='artist'" src="https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/0d7f88f0-96da-11e6-9120-00163ed833e7/932972095/spotify-logo.png" alt="">
                    <img v-else-if="item.images &&item.images.length >0&&item.images[0]&& item.type=='artist'" src="https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/0d7f88f0-96da-11e6-9120-00163ed833e7/932972095/spotify-logo.png" alt="">
                    <img v-else-if="item.images &&item.images.length <0&& item.type=='artist'" src="https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/0d7f88f0-96da-11e6-9120-00163ed833e7/932972095/spotify-logo.png" alt="">
                  </div>
                   <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-5">
                     <!-- {{item.name}} -->
                     <p v-if="item.artist && item.artist.name">{{item.artist}}</p>
                    <router-link v-if="item.type =='artist' && item.api =='lastfm' && item.name" :to="{name: 'ArtistPage', params:{name: item.name} }"><h4>{{item.name}}</h4></router-link>
                    <!-- <router-link v-else><h4>No Name</h4></router-link>                     -->
                    <router-link v-if="(item.type =='album' || item.type =='track') && item.api =='lastfm'" :to="{name: 'AlbumPage', params:{name: item.artist, albumname: item.name} }"><h4>{{item.name}}</h4></router-link>
                    
                    <router-link v-if="item.type =='artist' && item.api =='spotify' && !item.artists" :to="{name: 'ArtistPage', params:{name: item.name} }"><h4>{{item.name}}</h4></router-link>
                    <router-link v-if="(item.type =='album' || item.type =='track') && item.api =='spotify'&& item.artists && item.artists[0]" :to="{name: 'AlbumPage', params:{name: item.artists[0].name, albumname: item.name} }"><h4>{{item.name}}</h4></router-link>
                  </div>
                  <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-6">
                    <h5>{{item.type | cap}}</h5>
                  </div>
                  <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-6">
                    <!-- <div v-if="item.artist">{{item.artist}}</div> -->
                    <!-- <div v-else>N/A</div> -->
                    <router-link v-if="(item.type =='album' || item.type =='track') && item.api =='lastfm'" :to="{name: 'ArtistPage', params:{name: item.artist, albumname: item.name} }"><h4>{{item.artist}}</h4></router-link>
                    <router-link v-if="(item.type =='album' || item.type =='track') && item.api =='spotify'&& item.artists && item.artists[0]" :to="{name: 'ArtistPage', params:{name: item.artists[0].name} }"><h4>{{item.artists[0].name}}</h4></router-link>
                    <router-link v-if="(item.type =='album' || item.type =='track') && item.api =='spotify'&& item.artists && item.artists[1]" :to="{name: 'ArtistPage', params:{name: item.artists[1].name} }"><h4>{{item.artists[1].name}}</h4></router-link>
                  </div>
                  <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-6">
           <a v-if="!item.external_urls" :href="item.url" target="_blank" >
          <i v-if="item.api == 'lastfm'" class="fab fa-lastfm-square"></i>
          <i v-else-if="item.api == 'spotify'" class="fab fa-spotify"></i>
          <i v-else class="fab fa-lastfm-square"></i>
          </a>
            <a v-if="item.external_urls" :href="item.external_urls.spotify" target="_blank" >
          <i v-if="item.api == 'lastfm'" class="fab fa-lastfm-square"></i>
          <i v-else-if="item.api == 'spotify'" class="fab fa-spotify"></i>
          <i v-else class="fab fa-lastfm-square"></i>
          </a>
                  </div>
            <div v-if="authUser" class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-12">
               <div class="pure-menu-horizontal dropdown">
                <ul class="pure-menu-list">
                    <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                        <a id="menuLink1" class="pure-menu-link">Options</a>
                        <ul v-if="authUser" class="pure-menu-children">
                            <li class="pure-menu-item">
                              <div class="pure-menu-link">
                              <div @click="buttonOnClick(index)" id="myBtn">Add</div>
                              
                <div :id="`myModal${index}`" class="modal">
                  <div class="modal-content">
                    <span @click="spanOnClick(index)" class="close">&times;</span>
                            <h2 class="playlist-header is-center">Choose Playlist</h2> 
                             <div v-if="playlistsObjects.length > 0" class="pure-g">

            <div v-for="(playlist, holder) in playlistsObjects" class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-4" :key="holder">
                                <div class="pure-u-1 pure-u-md-1 pure-u-lg-1">
              <div @click="addToPlaylist(index, holder)" class="playlistItem is-center">
                     <h3 id="`playlistBtn${holder}`" v-if="playlist.name">{{playlist.name | cap(playlist.name)}}</h3>
              </div>
               
            </div>
                                </div>
                                <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center">
                            <button v-if="!showForm" @click="showPlaylistForm($event)" class="pure-button is-center">Create Playlist</button>
                            <button v-else @click="showPlaylistForm($event)" class="button-error pure-button is-center">Cancel</button>
                            <form v-show="showForm" class="pure-form" v-on:submit.prevent="createPlaylist">
                    <fieldset>
                        <input class="search-bar" v-model="newPlaylistObject.name" placeholder="Playlist Name">
                        <input class="search-bar" v-model="newPlaylistObject.description" placeholder="Playlist Description">

                        <button v-if="valdiation" type="submit" class="button-add pure-button">Create</button>
                        <button v-else disabled type="submit" class="button-add pure-button">Create</button>
                    </fieldset>
                                                      <ul id="errors">
                                        <!-- {{newPlaylistObject.name.trim().length == 0}} -->
    <li v-show="newPlaylistObject.name &&newPlaylistObject.name.toString().trim().length == 0 ">Name cannot be empty.</li>
    <li v-show="newPlaylistObject.description &&newPlaylistObject.description.toString().trim().length == 0  ">Description cannot be empty.</li>
    <!-- <li v-show="!validation.description">Please provide a valid description.</li> -->
  </ul>
                </form>
                              </div>
                              <!-- </div> -->

             </div>
              </div>
              </div>
                              </div>
                            </li>
                            <li class="pure-menu-item">
                              <div @click="addToFavorites(index)" class="pure-menu-link">
                                Favorite
                              </div>
                            </li>
                            <li class="pure-menu-item">
                              <!-- {{`alreadyInTopFive${index}`}} -->
                              <div  @click="addToTopFive(index)" class="pure-menu-link">
                                Add to Top Five
                              </div>
                              <!-- <div v-else class="pure-menu-link">
                                Remove from Top Five
                              </div> -->
                            </li>
                        </ul>
                        <ul v-else>
                          <p>Login for more options</p>
                        </ul>
                    </li>
                </ul>
            </div>

                    <!-- <button class="pure-button" @click="getSearchItemInfo(index)"></button> -->
                  </div>
                  <hr>
              </div>
              <div v-if="filteredResults.length ==0" class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">
                  <h1>No Results</h1>
              </div>
          </div>
        </div>

        </div>
        <!-- <div class="footer">This footer will always be positioned at the bottom of the page, but <strong>not fixed</strong>.</div> -->
    <!-- <div class="footer l-box is-center">
          HSanchez
        </div> -->

  </div>
</template>

<script>
import axios from "axios";
import * as firebase from "firebase";
import SpotifyWebApi from "spotify-web-api-node";

export default {
  name: "SearchPage",
  data() {
    return {
      info: null,
      searchItems: [],
      search: "",
      searchItemsCopy: [],
      select: "",
      searchTypes: ["All", "Artist", "Album", "Track"],
      access_token: "",
      loggedInToSpotify: this.checkCookie(),
      playlistsObjects: [],
      authUser: false,
      showForm: false,
      newPlaylistObject: {
        songs: [],
        name: "",
        description: ""
      }
    };
  },
  props: {
    results: { type: String }
    // info: 'ew'
  },
  watch: {
    $route: "grabData"
  },
  computed: {
    valdiation() {
      if (this.newPlaylistObject.name && this.newPlaylistObject.description) {
        console.log(this.newPlaylistObject.name.toString().trim().length);
        if (
          this.newPlaylistObject.name.toString().trim().length == 0 ||
          this.newPlaylistObject.name == undefined
        ) {
          return false;
        } else if (
          this.newPlaylistObject.description.toString().trim().length == 0 ||
          this.newPlaylistObject.description == undefined
        ) {
          return false;
        } else {
          return true;
        }
      }

      return false;
    },
    filteredResults: function() {
      let filtered = this.searchItems;
      if (this.search) {
        filtered = filtered.filter(
          m => m.name.toLowerCase().indexOf(this.search) > -1
        );
      }

      if (this.select) {
        if (this.select != "All") {
          filtered = filtered.filter(
            m => m.type.toLowerCase() === this.select.toLowerCase()
          );
        } else {
          filtered = this.searchItems;
        }
      }
      return filtered;
    }
  },
  methods: {
    getSearchItemInfo(index) {},
    createPlaylist() {
      var ref = this;
      console.log(ref.newPlaylistObject);
      var playlistObj = {};
      playlistObj = ref.newPlaylistObject;
      var database = firebase.database();
      console.log(playlistObj.name);
      var user = firebase.auth().currentUser;

      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/playlists")
        .once("value")
        .then(function(snapshot) {
          var arr = [];
          console.log(ref.newPlaylistObject.name);
          snapshot.forEach(function(childNodes) {
            // console.log(childNodes.val());
            arr.push(childNodes.val());
          });
          // console.log(arr);
          // console.log(arr.length);
          if (arr.length > 0) {
            var playlistExists = false;
            for (var i = 0; i < arr.length; i++) {
              // console.log(arr[i].name);
              // console.log(arr[i].name == ref.newPlaylistObject.name);
              if (arr[i].name == ref.newPlaylistObject.name) {
                playlistExists = true;
              }
            }
            // console.log(playlistExists);
            if (!playlistExists) {
              var newPostRef = firebase
                .database()
                .ref("userObjects/" + user.uid + "/playlists")
                .push();
              newPostRef.set({
                name: ref.newPlaylistObject.name,
                description: ref.newPlaylistObject.description,
                songs: []
              });
              ref.newPlaylistObject.name = "";
              ref.newPlaylistObject.description = "";
              ref.launch_toast();
            } else {
              alert("Playist name already exists");
            }
          } else {
            var newPostRef = firebase
              .database()
              .ref("userObjects/" + user.uid + "/playlists")
              .push();
            newPostRef.set({
              name: ref.newPlaylistObject.name,
              description: ref.newPlaylistObject.description,
              songs: []
            });
            ref.newPlaylistObject.name = "";
            ref.newPlaylistObject.description = "";
          }
        });

      // });
    },
    showPlaylistForm(event) {
      var str = event.target.innerHTML;
      str = str.toLowerCase();
      // console.log(str);
      if (str.toLowerCase() == "cancel") {
        this.showForm = false;
      } else {
        this.showForm = true;
      }
    },
    onClick: function(event) {
      for (var i = 0; i < this.searchItems.length; i++) {
        var modal = document.getElementById(`myModal${i}`);
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      var btn = document.getElementById("myBtn");
      var span = document.getElementsByClassName("close")[0];

      // this.songObject = {};
    },
    buttonOnClick(ind) {
      var modal = document.getElementById(`myModal${ind}`);
      modal.style.display = "block";
    },
    spanOnClick(ind) {
      var modal = document.getElementById(`myModal${ind}`);
      modal.style.display = "none";
      // this.songObject = {};
    },
    getUsersPlaylists() {
      var database = firebase.database();
      var ref = this;
      var user = firebase.auth().currentUser;

      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/playlists")
        .once("value", function(snapshot) {
          // console.log(snapshot.val());
        })
        .then(
          function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
              var obj = {
                name: childSnapshot.val().name,
                description: childSnapshot.val().description
              };
              // console.log(obj);
              ref.playlistsObjects.push(obj);
            });
          },
          function(error) {
            // The Promise was rejected.
            console.error(error);
          }
        );
    },
    grabData() {
      this.searchItems = [];
      this.select = "All";
      axios
        .all([
          axios.get(
            `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${
              this.results
            }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
          ),
          axios.get(
            `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${
              this.results
            }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
          ),
          axios.get(
            `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${
              this.results
            }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
          )
        ])
        .then(
          axios.spread((albumRes, artistRes, trackRes) => {
            console.log('album', albumRes);
            console.log('artist', artistRes);
            console.log('track', trackRes);
            for (var i = 0; i < 20; i++) {
              var names = [
                albumRes.data.results.albummatches.album[i].name,
                artistRes.data.results.artistmatches.artist[i].name,
                trackRes.data.results.trackmatches.track[i].name
              ];
              albumRes.data.results.albummatches.album[i].type = "album";
              artistRes.data.results.artistmatches.artist[i].type = "artist";
              trackRes.data.results.trackmatches.track[i].type = "track";

              albumRes.data.results.albummatches.album[i].api = "lastfm";
              artistRes.data.results.artistmatches.artist[i].api = "lastfm";
              trackRes.data.results.trackmatches.track[i].api = "lastfm";
              // console.log(albumRes.data.results.albummatches.album[i].name);
              // console.log(names[0]);
              // console.log(names[0] != null || names[0] !="(null)" || names[0] != "null" || names[0] != "" || names[0] != " " || names[0] !== "undefined");
              if (i < 15) {
                if (
                  names[0] != null &&
                  names[0] != "(null)" &&
                  names[0] != "null" &&
                  names[0] != "" &&
                  names[0] != " " &&
                  names[0] !== "undefined"
                ) {
                  console.log()
                  if (albumRes.data.results.albummatches.album[i].streamable != "FIXME") {
                    this.searchItems.push(
                      albumRes.data.results.albummatches.album[i]
                    );
                  }
                }
                if (
                  names[1] != null &&
                  names[1] != "(null)" &&
                  names[1] != "null" &&
                  names[1] != "" &&
                  names[1] != " " &&
                  names[1] !== "undefined"
                ) {
                  if (artistRes.data.results.artistmatches.artist[i].streamable != "FIXME") {
                    this.searchItems.push(
                      artistRes.data.results.artistmatches.artist[i]
                    );
                  }
                }
                if (
                  names[2] != null &&
                  names[2] != "(null)" &&
                  names[2] != "null" &&
                  names[2] != "" &&
                  names[2] != " " &&
                  names[2] !== "undefined"
                ) {
                  if (trackRes.data.results.trackmatches.track[i].streamable != "FIXME") {
                    this.searchItems.push(
                      trackRes.data.results.trackmatches.track[i]
                    );
                  }
                }
              } else {
                if (
                  names[1] != null &&
                  names[1] != "(null)" &&
                  names[1] != "null" &&
                  names[1] != "" &&
                  names[1] != " " &&
                  names[1] !== "undefined"
                ) {
                  if (artistRes.data.results.artistmatches.artist[i].streamable != "FIXME") {
                    this.searchItems.push(
                      artistRes.data.results.artistmatches.artist[i]
                    );
                  }
                }
              }
            }
            // this.searchItemsCopy = this.searchItems;
          })
        );
    },
    toArtist(itemIndex) {
      console.log(this.filteredResults[itemIndex]);
      // switch (this.filteredResults[itemIndex].type) {
      //   case "artist":
      //     this.$router.push({
      //       name: "ArtistPage",
      //       params: {
      //         name: this.filteredResults[itemIndex].name
      //       }
      //     });
      //     break;
      //   case "album":
      //     this.$router.push({
      //       name: "AlbumPage",
      //       params: {
      //         name: this.filteredResults[itemIndex].artist,
      //         albumname: this.filteredResults[itemIndex].name
      //       }
      //     });
      //     break;
      //   case "track":
      //     this.$router.push({
      //       name: "AlbumPage",
      //       params: {
      //         name: this.filteredResults[itemIndex].artist,
      //         albumname: this.filteredResults[itemIndex].name
      //       }
      //     });
      //     break;
      // }
    },
    toArtistAlbum(event) {
      console.log(event.target.innerHTML);
      // if (this.tracksInfo[albumIndex].album) {
      //   this.$router.push({
      //     name: "AlbumPage",
      //     params: {
      //       name: this.topTracks[0].artist.name,
      //       albumname: this.tracksInfo[albumIndex].album.title
      //     }
      //   });
      // } else {
      //   this.$router.push({
      //     name: "AlbumPage",
      //     params: {
      //       name: this.topTracks[0].artist.name,
      //       albumname: this.topTracks[albumIndex].name
      //     }
      //   });
      // }
    },
    toAlbum(albIndex) {
      this.$router.push({
        name: "AlbumPage",
        params: {
          name: this.topTracks[0].artist.name,
          albumname: this.topAlbums[albIndex].name
        }
      });
    },
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    checkCookie() {
      var user = this.getCookie("access_token");
      if (!user) {
        return true;
      } else {
        return false;
      }
    },
    setDropDown() {
      var dropDown = document.getElementById("selectThing");
      // console.log(dropDown);
      // console.log(dropDown.options);
      for (var i = 0; i < dropDown.options.length; i++) {
        // console.log(dropDown.options[i].text == "All");
        if (dropDown.options[i].text == "All") {
          dropDown.selectedIndex = i;
          break;
        }
      }
    },
    getSpotifyData() {
      var ref = this;
      this.access_token = this.getCookie("access_token");
      var spotifyApi = new SpotifyWebApi();
      var spotifySearchResults = [];
      spotifyApi.setAccessToken(this.access_token);
      // Search tracks whose name, album or artist contains 'Love'
      spotifyApi.searchTracks(ref.results).then(
        function(data) {
          console.log("Search by the bar", data.body);
          console.log(data.body);
          for (var i = 0; i < data.body.tracks.items.length; i++) {
            spotifySearchResults.push(data.body.tracks.items[i]);
          }

          // Search artists whose name contains 'Love'
          spotifyApi.searchArtists(ref.results).then(
            function(data) {
              console.log("Search artists by bar", data.body);
              for (var j = 0; j < data.body.artists.items.length; j++) {
                spotifySearchResults.push(data.body.artists.items[j]);
              }
              console.log(spotifySearchResults);
              for (var k = 0; k < spotifySearchResults.length; k++) {
                console.log(spotifySearchResults[k]);
                spotifySearchResults[k].image;
                spotifySearchResults[k].api = "spotify";

                ref.searchItems.push(spotifySearchResults[k]);
                ref.searchItems = ref.searchItems.sort(ref.compare).reverse();

                console.log(ref.searchItems);
              }
            },
            function(err) {
              console.error(err);
            }
          );
          // console.log(spotifySearchResults);
        },
        function(err) {
          console.error(err);
        }
      );
    },
    compare(a, b) {
      if (a.popularity < b.popularity) return -1;
      if (a.popularity > b.popularity) return 1;
      return 0;
    }
  },
  created() {
    var ref = this;
    document.addEventListener("click", this.onClick);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        ref.authUser = true;
      } else {
      }
    });
    this.getUsersPlaylists();
    this.grabData();
    this.getSpotifyData();
    console.log(this.searchItems);
  }
};
</script>

<style scoped>
#add {
  /* background: #77bfc7; */
}
.hr-header {
  margin: 5px;
  padding: 5px;
  border-top: 5px solid #fff;
}
hr {
  margin: 5px;
  padding: 5px;
  border-top: 1px solid #fff;
}
#main-content {
  justify-content: center;
}
.results-container {
  margin: 5px;
  padding: 10px;
}
.search-box {
  padding: 5px;
}
/* ///MODAL */
.button-error {
  background-color: rgb(202, 60, 60); /* this is a maroon */
}
.button-add {
  background: rgb(28, 184, 65);
}
.playlistItem {
  border: #888 solid 2px;
  border-radius: 15px;
}
.playlistItem:hover {
  background-color: rgb(189, 184, 184);
  cursor: pointer;
}
.playlistItem:hover h3 {
  color: #234;
  cursor: pointer;
}
#menuLink1 {
  vertical-align: middle;
  display: contents;
}
li,
#menuLink1,
a {
  text-decoration: none;
  cursor: pointer;
  text-decoration: none;
}
/* .pure-menu-link:hover {
  color: blue;
} */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #f81515;
  float: right;
  font-size: 32px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: rgb(255, 0, 0);
  text-decoration: none;
  cursor: pointer;
}

.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #efefef;
  text-align: center;
}
.pure-menu-link{
  color: #02D4DB;
} 
.pure-menu-link:hover{
  background: rgb(116, 116, 116);
  /* color: #02D4DB; */
} 
  .pure-menu-children {
    /* background: #696b76; */
  }
  
  .pure-menu-children li:hover {
    /* background: rgb(88, 89, 95); */
    color: #02D4DB;
  }
</style>
