<template>
  <div>
    <div class="content" id="add">
      <h2 class="content-head is-center">My Playlists</h2>

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
      <!-- {{playlistHolderWithSongs}} -->
      <!-- {{playlistHolderWithSongs[0].length}}
      {{playlistHolderWithSongs[1].length}}-->
      <div class="pure-g is-center">
        <div
          v-for="(playlist, index) in playlistsObjects"
          class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-5"
          :key="index"
        >
          <!-- <p> -->
          <div class="image-placeholder is-center">IMG</div>
          <h3>{{playlist.name}}</h3>
          <div
            v-if="playlistHolderWithSongs[index] && playlistHolderWithSongs[index].length >0"
          >Songs: {{playlistHolderWithSongs[index].length}}</div>
          <div v-else>
            0 songs in playlist. Try adding a track or album.
            <router-link :to="{name: 'DiscoverPage'}" exact>Discover Page</router-link>
          </div>

          <router-link
            :to="{name: 'AccountPlaylistPartialPage', params: {playlistid: index.toString()}}"
          >
            <button class="pure-button is-center link-button">View Playlist</button>
          </router-link>
          <button
            @click="deletePlaylist(index)"
            class="button-error pure-button link-button is-center"
          >Delete Playlist</button>
        </div>
        <!-- <div v-for="(track, ind) in playlistsObjects[index].songs" :key="ind" class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1">
                     {{track.artist}}
                     {{track.name}}
                     {{track.Album}}
        </div>-->
      </div>

      <div class="pure-g is-center">
        <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1">
          <div v-show="playlistsObjects.length > 0">
            <button
              v-if="!showForm"
              @click="showPlaylistForm($event)"
              class="pure-button is-center add-button"
            >Create Playlist</button>
            <button
              v-else
              @click="showPlaylistForm($event)"
              class="button-error pure-button is-center"
            >Cancel</button>
            <form v-show="showForm" class="pure-form" v-on:submit.prevent="createPlaylist">
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
                <button v-if="valdiation" type="submit" class="button-add pure-button">Create</button>
                <button v-else disabled type="submit" class="button-add pure-button">Create</button>
              </fieldset>
              <ul id="errors">
                <!-- {{newPlaylistObject.name.trim().length == 0}} -->
                <li
                  v-show="newPlaylistObject.name &&newPlaylistObject.name.toString().trim().length == 0 "
                >Name cannot be empty.</li>
                <li
                  v-show="newPlaylistObject.description &&newPlaylistObject.description.toString().trim().length == 0  "
                >Description cannot be empty.</li>
                <!-- <li v-show="!validation.description">Please provide a valid description.</li> -->
              </ul>
            </form>
          </div>
        </div>
      </div>

      <div v-if="playlistsObjects.length < 0" class="pure-g create-form is-center">
        <p v-if="playlistsObjects.length == 0">Empty</p>
        <button
          v-if="!showForm"
          @click="showPlaylistForm($event)"
          class="pure-button is-center add-button"
        >Create Playlist</button>
        <button v-else @click="showPlaylistForm($event)" class="pure-button is-center">Cancel</button>
        <form v-show="showForm" class="pure-form" v-on:submit.prevent="createPlaylist">
          <fieldset>
            <input class="search-bar" v-model="newPlaylistObject.name" placeholder="Playlist Name" />
            <input
              class="search-bar"
              v-model="newPlaylistObject.description"
              placeholder="Playlist Description"
            />
            <button v-if="valdiation" type="submit" class="button-add pure-button">Create</button>
            <button v-else disabled type="submit" class="button-add pure-button">Create</button>
          </fieldset>

          <!-- <ul id="errors">
                                   

    <li v-show="newPlaylistObject.name && newPlaylistObject.description &&newPlaylistObject.name.toString().trim().length == 0 || newPlaylistObject.name == undefined">Name cannot be empty.</li>
    <li v-show="newPlaylistObject.name && newPlaylistObject.description&&  newPlaylistObject.description.toString().trim().length ==0 || newPlaylistObject.description == undefined">Description cannot be empty.</li>
    
          </ul>-->
        </form>
      </div>
    </div>
          <div v-if="playlistsObjects.length == 0" class="pure-g is-center">
        <div class="l-box pure-u-1">None set</div>
      </div>
  </div>
</template>

<script>
import firebase, { database } from "firebase";

export default {
  name: "AccountPlaylists",
  data() {
    return {
      playlistsObjects: [],
      showForm: false,
      playlistIndex: 0,
      newPlaylistObject: {
        songs: [],
        name: "",
        description: ""
      },
      playlistsObjectsKeys: [],
      playlistsObjectsSongs: [],
      playlistsObjectsSongsKeys: [],
      allPlaylistsSongs: [],
      playlistHolderWithSongs: [],
      mykeys: [],
      newPlaylistObject: {}
    };
  },
  computed: {
    valdiation() {
      console.log("in validation");
      console.log(this.newPlaylistObject.name);
      // console.log(this.newPlaylistObject.name == undefined);
      // console.log(this.newPlaylistObject.description);
      // console.log(this.newPlaylistObject.description == undefined);
      // console.log(this.newPlaylistObject.name == "" ||
      //   this.newPlaylistObject.name == " " ||
      //   /^$|\s+/.test(this.newPlaylistObject.name));
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
    deletePlaylist(ind) {
      console.log(this.playlistsObjects[ind].key);
      var database = firebase.database();
      var ref = this;
      var user = firebase.auth().currentUser;
      var selectedItem = this.playlistsObjects[ind];

      var songsRef = firebase
        .database()
        .ref("userObjects/" + user.uid + "/playlists/" + selectedItem.key);
      songsRef.remove();
      ref.launch_success(`${selectedItem.name} removed`);
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
    getUsersPlaylists() {
      var database = firebase.database();
      var ref = this;
      var user = firebase.auth().currentUser;

      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/playlists")
        .once("value", function(snapshot) {})
        .then(
          function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
              var obj = {
                key: childSnapshot.key,
                name: childSnapshot.val().name,
                description: childSnapshot.val().description
              };
              ref.playlistsObjects.push(obj);
            });
          },
          function(error) {
            // The Promise was rejected.
            console.error(error);
          }
        );
      ///Getting the number of songs for each playlist
      firebase
        .database()
        .ref("userObjects/" + user.uid + "/playlists")
        .once("value", function(snapshot) {
          // console.log(snapshot.val());
        })
        .then(function(snap) {
          var playlistKey = "";
          var songsInPlaylist = [];
          var keys = [];
          snap.forEach(function(childNodes) {
            // console.log(childNodes);
            // playlistKey = childNodes.key;
          });
          // console.log(playlistKey);
          firebase
            .database()
            .ref("userObjects/" + user.uid + "/playlists/" + playlistKey)
            .once("value", function(snapshot) {})
            .then(function(snap) {
              snap.forEach(function(item) {
                var itemVal = item.val();
                keys.push(itemVal);
                ref.playlistsObjectsKeys.push(item.key);
                // console.log(item.key);
              });
              //   console.log(snap.val());
              //   ref.playlistsObjectsKeys.push(snap.val());

              snap.forEach(function(childNodes) {
                ref.mykeys.push(childNodes);
                // console.log(childNodes.val());
                // console.log(childNodes.val().songs);
                // ref.playlistsObjectsSongs.push(childNodes.val());
                // songsInPlaylist.push(childNodes.val().songs);
              });
              // console.log(ref.playlistsObjectsSongs[ref.playlistid].songs);
              // });
              // });
              //SongKeys for iteration
              // console.log(ref.playlistsObjectsKeys[0]);
              for (var f = 0; f < ref.playlistsObjectsKeys.length; f++) {
                var playlist = [];
                firebase
                  .database()
                  .ref(
                    "userObjects/" +
                      user.uid +
                      "/playlists/" +
                      ref.playlistsObjectsKeys[f] +
                      "/songs/"
                  )
                  .once("value", function(snapshot) {
                    //   console.log(snapshot.val());
                    //   ref.playlistsObjectsSongs.push(snapshot.val());
                    //   console.log(ref.playlistsObjectsSongsKeys);
                  })
                  .then(function(snap) {
                    snap.forEach(function(item) {
                      // console.log(item.key);
                      // console.log(item.val());
                      var song = {
                        key: item.key,
                        val: item.val()
                      };
                      // console.log(song);
                      ref.playlistsObjectsSongsKeys.push(item.key);
                      ref.playlistsObjectsSongs.push(item.val());
                      playlist.push(song);
                    });
                    console.log(playlist);
                    ref.playlistHolderWithSongs.push(playlist);
                    playlist = [];
                    console.log(f);
                    //   console.log(snap.val());
                    //   //   console.log(snap.val()[0]);

                    //   snap.forEach(function(childNodes) {
                    //     ref.mykeys.push(childNodes);
                    //     console.log(childNodes.val());
                    //     // console.log(childNodes.val().songs);
                    //     ref.playlistsObjectsSongs.push(childNodes.val());
                    //     // songsInPlaylist.push(childNodes.val().songs);
                    //   });
                  });
              }
            });
        });
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
    createPlaylist() {
      var ref = this;
      // console.log(ref.newPlaylistObject);
      var playlistObj = {};
      playlistObj = ref.newPlaylistObject;
      var database = firebase.database();
      // console.log(playlistObj.name);
      var user = firebase.auth().currentUser;
      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      // User is signed in.
      if (ref.newPlaylistObject === "undefined") {
        ref.launch_error(`Empty field`);
      }
      var newPostRef = firebase
        .database()
        .ref("userObjects/" + user.uid + "/playlists")
        .push();
      newPostRef.set({
        name: ref.newPlaylistObject.name,
        description: ref.newPlaylistObject.description,
        songs: []
      });
      ref.launch_success(`${ref.newPlaylistObject.name} created`);
      ref.newPlaylistObject.name = "";
      ref.newPlaylistObject.description = "";
      // });
    },
    writeUserData(userId, playlistName, playlistDescription) {
      firebase
        .database()
        .ref("usersObjects/" + userId + "/playlists")
        .set({
          name: playlistName,
          description: playlistDescription,
          songs: []
        });
    }
  },
  created() {
    this.getUsersPlaylists();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
a:hover {
  color: rgb(243, 253, 243);
}
#add {
  margin: 0px;
}
.button-error {
  background-color: rgb(202, 60, 60); /* this is a maroon */
}
.button-add {
  background: rgb(28, 184, 65);
}
.link-button {
  margin-top: 5px;
}
.add-button {
  background-color: rgb(51, 202, 51);
}
.add-button:hover {
  color: rgb(243, 253, 243);
}
.image-placeholder {
  height: 100px;
  width: 100px;
  margin: auto;
  vertical-align: middle;
  justify-content: center;
  align-content: center;
  display: flex;
  align-items: center;
  border: 2px solid #384043;
}
.create-form {
  background: rgb(243, 253, 243);
}
</style>
