<template>
  <div>
    <div class="content" id="add">
      <h2 class="content-head is-center">My Top Five</h2>
      <div id="notification-success">
        <div id="img">
          <i class="fas fa-check"></i>
        </div>
        <div id="desc-success">Successfully added</div>
      </div>
      <div id="notification-error">
        <div id="img">
          <i class="fas fa-times"></i>
        </div>
        <div id="desc-error">Not added</div>
      </div>
      <div v-if="topfive.length >0" class="pure-g">
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
            <hr class="hr-header" />
          </div>
          <div
            v-for="(item, index) in topfive"
            class="pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center"
            :key="index"
          >
            <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-12">
              <img v-if="item.value && item.value.image" :src="item.value.image[1].text" />
              <img
                v-else-if="item.value.image_url"
                :src="item.value.image_url"
                style="height:64px;width:64px;"
              />
              <img
                v-else-if="!item.value.image && !item.value.image_url"
                src="https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png"
              />
            </div>
            <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-5">
              <router-link
                v-if="item.value.type == 'artist'"
                :to="{name: 'ArtistPage', params: {name: item.value.name}}"
              >{{item.value.name | cap(item.value.name)}}</router-link>
              <router-link
                v-else-if="item.value.type == 'album'"
                :to="{name: 'AlbumPage', params: {name: item.value.artist, albumname: item.value.name}}"
              >{{item.value.name | cap(item.value.name)}}</router-link>
              <div v-else>{{item.value.name | cap(item.value.name)}}</div>
            </div>
            <div
              class="pure-u-1 pure-u-md-1 pure-u-lg-1-6"
            >{{item.value.type | cap(item.value.type)}}</div>
            <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-6">
              <router-link
                v-if="item.value.type == 'track'"
                :to="{name: 'ArtistPage', params: {name: item.value.artist.name}}"
              >{{item.value.artist.name}}</router-link>
              <router-link
                v-else-if="item.value.type == 'album'"
                :to="{name: 'ArtistPage', params: {name: item.value.artist}}"
              >{{item.value.artist}}</router-link>
            </div>
            <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-6">
              <a v-if="item.value.api =='spotify'" :href="item.value.url" target="_blank">
                <i class="fab fa-spotify"></i>
              </a>
              <a v-else-if="item.value.api =='lastfm'" :href="item.value.url" target="_blank">
                <i class="fab fa-lastfm-square"></i>
              </a>
              <div
                v-if="item.value.hasOwnProperty('spotify_url') && item.value.api =='lastfm-spotify'"
                class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12"
              >
                <a :href="item.value.spotify_url" target="_blank">
                  <i class="fab fa-spotify"></i>
                </a>
              </div>
              <div
                v-if="item.value.hasOwnProperty('lastfm_url') && item.value.api =='lastfm-spotify'"
                class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12"
              >
                <a :href="item.value.lastfm_url" target="_blank">
                  <i class="fab fa-lastfm-square"></i>
                </a>
              </div>
            </div>
            <div class="pure-u-1 pure-u-md-1 pure-u-lg-1-12">
              <div class="pure-menu-horizontal dropdown">
                <ul class="pure-menu-list">
                  <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                    <div class="pure-menu-link clickable">
                      <a id="menuLink1">Options</a>
                    </div>
                    <ul class="pure-menu-children items">
                      <li class="pure-menu-item">
                        <div @click="addToFavorites(index)" class="pure-menu-link">Add to Favorites</div>
                      </li>
                      <li v-if="item.value.type == 'track' " class="pure-menu-item">
                        <!-- <div @click="addToPlaylist(index)" class="pure-menu-link"> -->
                        <div
                          class="pure-menu-link"
                          @click="buttonOnClick(index)"
                          id="myBtn"
                        >Add to playlist</div>

                        <div :id="`myModal${index}`" class="modal">
                          <div class="modal-content">
                            <span @click="spanOnClick(index)" class="close">&times;</span>
                            <h2 class="playlist-header is-center">Choose Playlist</h2>
                            <!-- {{playlistsObjects}} -->
                            <div v-if="playlistsObjects.length > 0" class="pure-g">
                              <div
                                v-for="(playlist, holder) in playlistsObjects"
                                class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-4"
                                :key="holder"
                              >
                                <div class="pure-u-1 pure-u-md-1 pure-u-lg-1">
                                  <div
                                    @click="addToPlaylist(index, holder)"
                                    class="playlistItem is-center"
                                  >
                                    <h3
                                      id="`playlistBtn${holder}`"
                                      v-if="playlist.name"
                                    >{{playlist.name | cap(playlist.name)}}</h3>
                                  </div>
                                </div>
                              </div>
                              <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center">
                                <button
                                  v-if="!showForm"
                                  @click="showPlaylistForm($event)"
                                  class="pure-button is-center"
                                >Create Playlist</button>
                                <button
                                  v-else
                                  @click="showPlaylistForm($event)"
                                  class="button-error pure-button is-center"
                                >Cancel</button>
                                <form
                                  v-show="showForm"
                                  class="pure-form"
                                  v-on:submit.prevent="createPlaylist"
                                >
                                  <fieldset>
                                    <input
                                      class="search-bar"
                                      v-model="newPlaylistObject.name"
                                      placeholder="Playlist Name"
                                    />
                                    <input
                                      class="search-bar"
                                      v-model="newPlaylistObject.description"
                                      placeholder="Playlist Description"
                                    />
                                    <button
                                      v-if="valdiation"
                                      type="submit"
                                      class="button-add pure-button"
                                    >Create</button>
                                    <button
                                      v-else
                                      disabled
                                      type="submit"
                                      class="button-add pure-button"
                                    >Create</button>
                                  </fieldset>
                                  <ul id="errors">
                                    <!-- {{newPlaylistObject.name.trim().length == 0}} -->
                                    <li
                                      v-show="newPlaylistObject.name &&newPlaylistObject.name.toString().trim().length == 0 "
                                    >Name cannot be empty.</li>
                                    <li
                                      v-show="newPlaylistObject.description &&newPlaylistObject.description.toString().trim().length == 0  "
                                    >Description cannot be empty.</li>
                                  </ul>
                                </form>
                              </div>
                              <!-- </div> -->
                            </div>
                          </div>
                        </div>
                      </li>
                      <li class="pure-menu-item">
                        <div @click="remove(index)" class="pure-menu-link">Remove</div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <hr />
          </div>
      </div>
        </div>
      <div v-else class="pure-g is-center">
        <div class="l-box pure-u-1">None set</div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "AccountTopFive",
  data() {
    return {
      topfive: [],
      playlistsObjects: [],
      mykeys: [],
      errors: [],
      itemInFavorites: false,
      showForm: false,
      // topFiveCount: 0,
      newPlaylistObject: {
        songs: [],
        name: "",
        description: ""
      }
    };
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
    }
  },
  methods: {
    getUsersTopFive() {
      var database = firebase.database();
      var ref = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var userId = firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("userObjects/" + user.uid + "/topfive")
            .on("value", function(snap) {
              snap.forEach(function(childNodes) {
                var topFiveObject = {
                  key: childNodes.key,
                  value: childNodes.val()
                };
                console.log(topFiveObject);
                ref.topfive.push(topFiveObject);
                // if (!Number.isInteger(childNodes.val())){
                //   ref.topfive.push(childNodes.val());
                // }
              });
            });
        } else {
          // No user is signed in.
        }
      });
    },
    onClick: function(event) {
      for (var i = 0; i < this.topfive.length; i++) {
        var modal = document.getElementById(`myModal${i}`);
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      var btn = document.getElementById("myBtn");
      var span = document.getElementsByClassName("close")[0];
      // this.hideCheckboxes();
    },
    buttonOnClick(ind) {
      var modal = document.getElementById(`myModal${ind}`);
      modal.style.display = "block";
    },
    spanOnClick(ind) {
      var modal = document.getElementById(`myModal${ind}`);
      modal.style.display = "none";

      // this.hideCheckboxes();
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
              ref.launch_success(
                `Playlist '${ref.newPlaylistObject.name}' created`
              );
              ref.newPlaylistObject.name = "";
              ref.newPlaylistObject.description = "";
            } else {
              // alert("Playist name already exists");
              ref.launch_error(
                `Playlist '${ref.newPlaylistObject.name}' already exists`
              );
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
            ref.launch_success(
              `Playlist '${ref.newPlaylistObject.name}' created`
            );
            ref.newPlaylistObject.name = "";
            ref.newPlaylistObject.description = "";
          }
        });

      // });
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
    remove(ind) {
      var database = firebase.database();
      var ref = this;
      var user = firebase.auth().currentUser;
      var selectedItem = this.topfive[ind];

      var songsRef = firebase
        .database()
        .ref("userObjects/" + user.uid + "/topfive/" + selectedItem.key);
      songsRef.remove();
      ref.launch_success(`${selectedItem.value.name} removed`);
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

    addToFavorites(ind) {
      var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      var selectedItem = this.topfive[ind];
      ref.itemInFavorites = false;
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

          for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == "album" && selectedItem.value.type == "album") {
              if (
                selectedItem.value.artist == arr[i].artist &&
                selectedItem.value.name == arr[i].name
              ) {
                ref.itemInFavorites = true;
              }
            } else if (
              arr[i].type == "artist" &&
              selectedItem.value.type == "artist"
            ) {
              if (
                // selectedItem.value.artist.name == arr[i].artist.name &&
                selectedItem.value.name == arr[i].name
              ) {
                ref.itemInFavorites = true;
              }
            } else if (
              arr[i].type == "track" &&
              selectedItem.value.type == "track"
            ) {
              // console.log('track hi');
              if (
                selectedItem.value.artist.name == arr[i].artist.name &&
                selectedItem.value.name == arr[i].name
              ) {
                ref.itemInFavorites = true;
              }
            }
          }

          console.log(ref.itemInFavorites);
          if (!ref.itemInFavorites) {
            // if (
            //   ref.songObject.api == "spotify" ||
            //   ref.songObject.api == "lastfm-spotify"
            // ) {
            var newPostRef = firebase
              .database()
              .ref("userObjects/" + user.uid + "/favorites/")
              .push(selectedItem.value);
            //   ref.launch_success(`${ref.songObject.name} added to favorites`);
            // } else {
            //   var newPostRef = firebase
            //     .database()
            //     .ref("userObjects/" + user.uid + "/favorites/")
            //     .push(ref.songObject);
            ref.launch_success(`${selectedItem.value.name} added to favorites`);
            // }
          } else {
            // alert("already in favorites");
            ref.launch_error(`${selectedItem.value.name} already in favorites`);
          }
        });
    },
    getUsersFavorites() {
      var database = firebase.database();
      var ref = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var userId = firebase.auth().currentUser.uid;
          return firebase
            .database()
            .ref("/userObjects/" + userId + "/favorites")
            .once("value")
            .then(function(snapshot) {
              // ref.favorites = snapshot.val();
              snapshot.forEach(snapshot => {
                // console.log(snapshot.val());
                var favoriteObject = {
                  key: snapshot.key,
                  value: snapshot.val()
                };
                ref.favorites.push(favoriteObject);
              });
              console.log(ref.favorites);
            });
        } else {
          // No user is signed in.
        }
      });
    },
    addToPlaylist(ind, playlistIndex) {
      var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      this.songObject = this.topfive[ind].value;
      // this.songObject.type = "track";
      // ref.songObject.image_url = ref.albumImg;
      // delete ref.songObject.streamable;
      // console.log(this.songObject);
      firebase
        .database()
        .ref("userObjects/" + user.uid + "/playlists")
        .once("value", function(snapshot) {})
        .then(function(snap) {
          var playlistKey = "";
          var songsInPlaylist = [];
          var keys = [];
          snap.forEach(function(childNodes) {
            console.log(childNodes.key);
            ref.mykeys.push(childNodes.key);
            playlistKey = childNodes.key;
          });
          console.log(playlistKey);
          firebase
            .database()
            .ref("userObjects/" + user.uid + "/playlists/" + playlistKey)
            .once("value", function(snapshot) {})
            .then(
              function(snap) {
                snap.forEach(function(item) {
                  var itemVal = item.val();
                  keys.push(itemVal);
                  console.log(keys);
                });
                // console.log(snap.val());
                // console.log(snap.val()[0]);

                snap.forEach(function(childNodes) {
                  console.log(childNodes.val());
                  var songKVObject = {
                    key: childNodes.key,
                    value: childNodes.val()
                  };
                  // if (childNodes.val().songs) {
                  songsInPlaylist.push(childNodes.val().songs);
                  // console.log(songsInPlaylist.length);
                  // }
                  // console.log(ref.mykeys);
                });
                // console.log(songsInPlaylist[0].length);
                // console.log(ref.retrieveInfo(keys)[0]);
                // console.log(songsInPlaylist.length);
                if (songsInPlaylist == null) {
                  console.log("if");
                  firebase
                    .database()
                    .ref("userObjects/" + user.uid + "/playlists/" + "songs")
                    .orderByChild("songs")
                    .equalTo("")
                    .once("value", snapshot => {
                      if (snapshot.exists()) {
                        console.log("exists!");
                        // const userData = snapshot.val();
                      } else {
                        console.log("Does not exist");
                        const data = snap.val() || null;
                        if (data) {
                          const id = Object.keys(data)[0];
                          console.log(id);
                          console.log(ref.songObject);
                          var d = new Date();
                          var n = d.getTime();
                          ref.songObject.time_stamp = n;
                          var newPostRef = firebase
                            .database()
                            .ref("userObjects/" + user.uid + "/playlists/" + id)
                            .push(ref.songObject);

                          ref.launch_success(`Added to `);
                          // console.log(newPostRef.key);
                        }
                      }
                    });
                } else {
                  console.log("else");
                  // console.log(ref.mykeys);

                  console.log(playlistIndex);
                  console.log(ref.mykeys);

                  var newPostRef = firebase
                    .database()
                    .ref(
                      "userObjects/" +
                        user.uid +
                        "/playlists/" +
                        ref.mykeys[playlistIndex] +
                        "/songs"
                    )
                    .push();
                  if (ref.songObject.artist.mbid) {
                    var d = new Date();
                    var n = d.getTime();
                    ref.songObject.time_stamp = n;
                    var newPostRef = firebase
                      .database()
                      .ref(
                        "userObjects/" +
                          user.uid +
                          "/playlists/" +
                          ref.mykeys[playlistIndex] +
                          "/songs"
                      )
                      .push(ref.songObject);
                  } else if (ref.songObject.artist.url) {
                    var d = new Date();
                    var n = d.getTime();
                    ref.songObject.time_stamp = n;
                    var newPostRef = firebase
                      .database()
                      .ref(
                        "userObjects/" +
                          user.uid +
                          "/playlists/" +
                          ref.mykeys[playlistIndex] +
                          "/songs"
                      )
                      .push(ref.songObject);
                  } else {
                    var d = new Date();
                    var n = d.getTime();
                    ref.songObject.time_stamp = n;
                    var newPostRef = firebase
                      .database()
                      .ref(
                        "userObjects/" +
                          user.uid +
                          "/playlists/" +
                          ref.mykeys[playlistIndex] +
                          "/songs"
                      )
                      .push(ref.songObject);
                  }
                  ref.launch_success(
                    `Added to ${ref.playlistsObjects[playlistIndex].name}`
                  );
                }
              },
              function(error) {
                // The Promise was rejected.
                console.error(error);
              }
            );
        });
    }
  },
  created() {
    document.addEventListener("click", this.onClick);
    this.getUsersTopFive();
    this.getUsersPlaylists();
  }
};
</script>

<style scoped>
#add {
  margin: 0px;
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
li {
  cursor: pointer;
}
a {
  text-decoration: none;
}
.items {
  border: 2px solid black;
}

/* .playlistItem {
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
} */
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

.button-error {
  background-color: rgb(202, 60, 60); /* this is a maroon */
}
.button-add {
  background: rgb(28, 184, 65);
}
.dropdown {
  margin-bottom: 10px;
}
.pure-menu-link {
  color: #02d4db;
}
.pure-menu-link:hover {
  background: rgb(116, 116, 116);
  /* color: #02D4DB; */
}
.pure-menu-children {
  /* background: #696b76; */
}

.pure-menu-children li:hover {
  /* background: rgb(88, 89, 95); */
  color: #02d4db;
}
</style>
