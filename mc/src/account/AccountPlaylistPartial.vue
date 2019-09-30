<template>
    <div>
        <div class="content" id="add">
                                <div id="notification-success"><div id="img"><i class="fas fa-check"></i></div><div id="desc-success">Successfully added</div></div>
<div id="notification-error"><div id="img"><i class="fas fa-times"></i></div><div id="desc-error">Not added</div></div>
            <h2 class="content-head is-center">{{playlistsObjects[parseInt(playlistid)].name | cap(playlistsObjects[parseInt(playlistid)].name)}}</h2>
            <p class="content-head is-center">Description: {{playlistsObjects[parseInt(playlistid)].description}}</p>
        <div class="pure-g">
          <!-- {{spotifySongs.length}}
          {{album.tracks.track.length}} -->
          <div v-if="playlistsObjectsSongs.length > 0" class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 left-contents">
            <!-- {{"BORK"}} -->
        <div class="pure-g">
          <!-- <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1"> -->
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-5-6">
              <!-- <img class="pure-img" :src="albumImg" > -->
                       <div class="image-placeholder is-center">IMG</div>          
          </div> 
                   <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12">
                  <!-- <ul id="drop-down">
			<li>
				<i class="fas fa-plus"></i>
				<ul>
					<li class="dropdownItem"><div @click="addAlbumToFavorites()">Add album to Favorites</div></li>
			
          {{itemInTopFiveCopy}}
					<li v-show="!itemInTopFiveCopy" class="dropdownItem"><div @click="addAlbumToTopFive()">Add album to Top Five</div></li>
					<li v-show="itemInTopFiveCopy" class="dropdownItemRemove"><div @click="addToList($event)">Remove from Top Five</div></li>
				</ul>
			</li>
		</ul>  -->

          <!-- </div> -->
          </div>

        </div>
          </div>
          <div v-else-if="playlistsObjectsSongs.length < 0" class="pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">
            <!-- {{"BORK2"}} -->
           <div class="pure-g">
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1">
            <!-- {{spotifySongs.length}} -->
            <!-- {{album.tracks.track.length}} -->
              <!-- <img v-if="albumImg" :src="albumImg" > -->
              <!-- <img v-else src="https://i.kym-cdn.com/entries/icons/original/000/017/533/unnamed.png">  -->

             <p>
               <!-- {{album.wiki === 'undefined' || album.wiki == ' '}} -->
                <!-- {{spotifySongs.length ==0}} -->
              </p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-3">

          </div>
          <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-3 is-center">

          </div>
          <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-3">

          </div>
        </div>
          </div>
          <!-- {{spotifySongs.length}} -->
            <div v-if=" playlistsObjectsSongs.length > 0" class="pure-u-1 pure-u-md-1-2 pure-u-lg-2-3 tracks-box">
<div v-if="playlistsObjectsSongs.length > 0" class="l-box">
            <div v-for="(albumInfo, index) in playlistsObjectsSongs" class="pure-u-1 pure-u-md-1-2 pure-u-lg-1" :key="index">
            
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12">
            <strong>{{index+1}}.</strong>
            </div>
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12">
            {{albumInfo.duration | duration}}
            </div>
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
            {{albumInfo.name}}

<div id="notification-success"><div id="img"><i class="fas fa-check"></i></div><div id="desc-success">Successfully added</div></div>
<div id="notification-error"><div id="img"><i class="fas fa-times"></i></div><div id="desc-error">Not added</div></div>

            </div>
            <div v-if="!albumInfo.hasOwnProperty('spotify_url')" class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12">
           <a :href="albumInfo.url" target="_blank" >
          <i v-if="albumInfo.api == 'lastfm'" class="fab fa-lastfm-square"></i>
          <i v-else-if="albumInfo.api == 'spotify'" class="fab fa-spotify"></i>
          <i v-else class="fab fa-lastfm-square"></i>
          </a>
            </div>
            <!-- {{albumInfo.api}} -->
            <!-- {{getCookie('access_token') !== 'undefined'}} -->
            <div v-if="albumInfo.hasOwnProperty('spotify_url') && albumInfo.api =='lastfm-spotify'" class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12">
            <a :href="albumInfo.spotify_url" target="_blank" >
          <i class="fab fa-spotify"></i>
          </a>
            </div>
            <div v-if="albumInfo.hasOwnProperty('lastfm_url') && albumInfo.api =='lastfm-spotify'" class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12">
            <a :href="albumInfo.lastfm_url" target="_blank" >
          <i class="fab fa-lastfm-square"></i>
          </a>
            </div>
            <!-- (authUser && !checkboxesVisible) && (authUser && !allCheckboxesVisible) -->
            <div v-if="authUser" class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-6">
               <div class="pure-menu-horizontal dropdown">
                <ul class="pure-menu-list">
                    <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                        <a id="menuLink1" class="pure-menu-link">Options</a>
                        <ul v-if="authUser" class="pure-menu-children">
                          <!-- {{alreadyInTopFive}} -->
                            <li class="pure-menu-item">
                              <div class="pure-menu-link">
                              <div @click="buttonOnClick(index)" id="myBtn">Add to playlist</div>
                              
                <div :id="`myModal${index}`" class="modal">
                  <div class="modal-content">
                    <span @click="spanOnClick(index)" class="close">&times;</span>
                            <h2 class="is-center playlist-header">Choose Playlist</h2> 
                            <!-- {{playlistsObjects}} -->
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
                                Add to Top Five<input v-model="topFiveCount" class="numberCircle">
                              </div>
                              <!-- <div v-else class="pure-menu-link">
                                Remove from Top Five
                              </div> -->
                            </li>
                            <li class="pure-menu-item">
                              <div @click="removeFromPlaylist(index)" class="pure-menu-link">
                                Remove from {{playlistsObjects[parseInt(playlistid)].name}}
                              </div>
                            </li>
                        </ul>
                        <ul v-else>
                          <p>Login for more options</p>
                        </ul>
                    </li>
                </ul>
            </div>
            </div>

        </div>
</div>


            </div>
<div v-else class="pure-u-1 pure-u-md-1-2 pure-u-lg-1  is-center">
    <h3>No tracks found</h3> 
</div>
    </div>
        </div>
    </div>
</template>

<script>
import * as firebase from "firebase";
export default {
  data() {
    return {
      name: "AccountPlaylistPartialPage",
      playlistsObjects: [],
      playlistsObjectsKeys: [],
      playlistsObjectsSongs: [],
      playlistsObjectsSongsKeys: [],
      allPlaylistsSongs: [],
      mykeys: [],
      showForm: false,
            newPlaylistObject: {
        songs: [],
        name: "",
        description: ""
      },
      authUser: true,
      showForm: false,
      topFiveCount: 0
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
  props: {
    playlistid: { type: String }
  },
  methods: {
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
    grabAlbumInfo(index) {
      //   console.log(this.album.tracks.track[index]);
    },
    onClick: function(event) {
      for (var i = 0; i < this.playlistsObjectsSongs.length; i++) {
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
        .once("value", function(snapshot) {})
        .then(
          function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
              var obj = {
                name: childSnapshot.val().name,
                description: childSnapshot.val().description
              };
              ref.playlistsObjects.push(obj);
              //   console.log(ref.playlistsObjects);
            });
          },
          function(error) {
            // The Promise was rejected.
            console.error(error);
          }
        );
      ///
      firebase
        .database()
        .ref("userObjects/" + user.uid + "/playlists/" + "/songs/")
        .once("value", function(snapshot) {
          //   console.log(snapshot.val());
        })
        .then(function(snap) {
          var playlistKey = "";
          var songsInPlaylist = [];
          var keys = [];
          snap.forEach(function(childNodes) {
            console.log(childNodes);
            // playlistKey = childNodes.key;
          });
          //   console.log(playlistKey);
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
              //   console.log(ref.playlistsObjectsKeys[ref.playlistid]);
              firebase
                .database()
                .ref(
                  "userObjects/" +
                    user.uid +
                    "/playlists/" +
                    ref.playlistsObjectsKeys[ref.playlistid] +
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
                    ref.playlistsObjectsSongsKeys.push(item.key);
                    ref.playlistsObjectsSongs.push(item.val());
                  });
                  console.log(ref.playlistsObjectsSongs);
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
            });
        });
    },
    addToFavorites(ind) {
      console.log(ind);
      var database = firebase.database();
      var ref = this;
      var user = firebase.auth().currentUser;
      var selectedSong = this.playlistsObjectsSongs[ind];
      selectedSong.type = "song";
      console.log(selectedSong);
      ///Read favorites
      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/favorites")
        .once("value")
        .then(function(snapshot) {
          var arr = [];
          snapshot.forEach(function(childNodes) {
            // console.log(childNodes.val());
            arr.push(childNodes);
          });

          var inArray = false;
          var badIndex = 0;
          for (var i = 0; i < arr.length; i++) {
            console.log(arr[i].val());
            if (arr[i].val().type == "song") {
              if (
                (selectedSong.artist.mbid == arr[i].val().artist.mbid &&
                  selectedSong.name == arr[i].val().name) ||
                arr[i].val().inFavorites
              ) {
                inArray = true;
                badIndex = i;
              }
            }
          }
          if (!inArray) {
            var allSongs = [];
            // firebase
            //   .database()
            //   .ref("userObjects/" + user.uid + "/favorites")
            //   .push(selectedSong, function(error) {
            //     if (error) {
            //       // The write failed...
            //       console.log(error);
            //     } else {
            //       console.log("no error");
            // Data saved successfully!
            console.log(ref.playlistsObjectsKeys.length);
            console.log(ref.playlistsObjectsSongs);
            // allSongs = ref.grabEachPlaylistsSongs();
            for (var k = 0; k < ref.playlistsObjectsKeys.length; k++) {
              firebase
                .database()
                .ref(
                  "/userObjects/" +
                    user.uid +
                    "/playlists/" +
                    ref.playlistsObjectsKeys[k] +
                    "/songs/"
                )
                .once("value", function(snapshot) {})
                .then(
                  function(snapshot) {
                    //   console.log(snapshot.val());
                    var arr = [];
                    var allPlaylistsSongKeys = [];
                    snapshot.forEach(function(childSnapshot) {
                      //   console.log(childSnapshot.key);
                      var obj = {
                        songKey: childSnapshot.key,
                        val: childSnapshot.val()
                      };
                      arr.push(obj);

                      //   allPlaylistsSongKeys.push(childSnapshot.key);
                    });
                    //   ref.allPlaylistsSongs.push(arr);
                    allSongs.push(arr);
                    console.log(allSongs);
                    // console.log(allSongs[k].length);
                    for (var j = 0; j < ref.playlistsObjectsKeys.length; j++) {
                      // console.log(allSongs[j].length);
                      for (var s = 0; s < allSongs[j].length; s++) {
                        firebase
                          .database()
                          .ref(
                            "/userObjects/" +
                              user.uid +
                              "/playlists/" +
                              ref.playlistsObjectsKeys[j] +
                              "/songs/" +
                              allSongs[j][s].songKey
                          )
                          .once("value", function(snapshot) {
                            console.log(snapshot.val());
                            if (
                              selectedSong.type == snapshot.val().type &&
                              selectedSong.mbid == snapshot.val().artist.mbid
                            ) {
                              firebase
                                .database()
                                .ref(
                                  "/userObjects/" +
                                    user.uid +
                                    "/playlists/" +
                                    ref.playlistsObjectsKeys[j] +
                                    "/songs/" +
                                    allSongs[j][s].songKey
                                )
                                .update({
                                  inFavorites: true
                                });
                              console.log(true);
                            } else {
                              console.log(false);
                            }
                          })
                          .then(
                            function(snapshot) {
                              snapshot.forEach(function(childSnapshot) {});
                              // console.log(ref.playlistsObjects);
                            },
                            function(error) {
                              // The Promise was rejected.
                              console.error(error);
                            }
                          );
                      }
                    }
                  },
                  function(error) {
                    // The Promise was rejected.
                    console.error(error);
                  }
                );
            }
            //     }
            //   });
          } else {
            //   if (selectedSong.inFavorites) {
            alert("Already in Favorites.");
            //   }
          }
        });
    },
    removeFromPlaylist(ind) {
      console.log(ind);
      var database = firebase.database();
      var ref = this;
      var user = firebase.auth().currentUser;
      var selectedSong = this.playlistsObjectsSongs[ind];
      //   console.log(ref.playlistsObjectsKeys[ref.playlistid]);
      //   console.log(ref.playlistsObjectsSongsKeys[ind]);
      var songsRef = firebase
        .database()
        .ref(
          "userObjects/" +
            user.uid +
            "/playlists/" +
            ref.playlistsObjectsKeys[ref.playlistid] +
            "/songs/" +
            ref.playlistsObjectsSongsKeys[ind]
        );
      songsRef.remove();
      ref.launch_success(`Successfully removed ${selectedSong.name}`);
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    grabEachPlaylistsSongs() {
      var database = firebase.database();
      var ref = this;
      var all = [];
      var user = firebase.auth().currentUser;
      for (var k = 0; k < ref.playlistsObjectsKeys.length; k++) {
        firebase
          .database()
          .ref(
            "/userObjects/" +
              user.uid +
              "/playlists/" +
              ref.playlistsObjectsKeys[k] +
              "/songs/"
          )
          .once("value", function(snapshot) {})
          .then(
            function(snapshot) {
              var arr = [];
              snapshot.forEach(function(childSnapshot) {
                // console.log(childSnapshot.val());
                arr.push(childSnapshot.val());
              });
              //   ref.allPlaylistsSongs.push(arr);
              all.push(arr);
              console.log(all);
              return all;
            },
            function(error) {
              // The Promise was rejected.
              console.error(error);
            }
          );
        // console.log(k);
      }
      return all;
    }
  },
  created() {
    document.addEventListener("click", this.onClick);
    this.getUsersPlaylists();
  }
};
</script>

<style scoped>
.image-placeholder {
  height: 300px;
  width: 300px;
  margin: auto;
  vertical-align: middle;
  justify-content: center;
  align-content: center;
  display: flex;
  align-items: center;
  border: 2px solid #384043;
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
.left-contents {
  padding: 0.5em;
}
.tracks-box {
  /* margin-left: 20px; */
  padding-left: 10%;
  padding-right: 20px;
}
.l-box {
  padding: 0.5em;
  /* padding-left: 10px;
  padding-right: 10px; */
}
h3{
  color: #000;
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

.search-bar {
  border-radius: 5px;
  border: 2px inset #696b76;
  padding: 5px;
}
/* dropdown */
#drop-down {
  float: left;
  margin-right: 20px;
}
.dropdownItem {
  color: #06c;
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

#drop-down ul {
  padding: 0;
  margin: 0;
  /* background: #fff; */
  float: left;
}

#drop-down li {
  float: left;
  display: inline;
  padding: 5px;
  position: relative;
  width: 120px;
  list-style: none;
}

#drop-down ul {
  position: absolute;
  left: 0;
  top: 100%;
  background: #ccc;
  display: none;
}

/* ul ul ul {
  left: 100%;
  top: 0;
  background: #999;
} */

#drop-down li:hover > ul {
  display: block;
}

/* checkboxes */
.my-checkbox {
  height: 25px;
  width: 25px;
  background: #2196f3;
}
input[type="checkbox"] + label {
  display: flex;
  margin: 0.2em;
  cursor: pointer;
  padding: 0.2em;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label:before {
  content: "\2714";
  border: 0.1em solid #000;
  border-radius: 0.2em;
  display: inline-block;
  height: 23px;
  width: 23px;
  /* padding: 0px; */
  padding-left: 0.2em;
  padding-bottom: 0.3em;
  margin-bottom: 0.2em;
  vertical-align: bottom;
  color: transparent;
  transition: 0.2s;
}

input[type="checkbox"] + label:active:before {
  transform: scale(0);
}

input[type="checkbox"]:checked + label:before {
  background-color: MediumSeaGreen;
  border-color: MediumSeaGreen;
  color: #fff;
}

input[type="checkbox"]:disabled + label:before {
  transform: scale(1);
  border-color: #aaa;
}

input[type="checkbox"]:checked:disabled + label:before {
  transform: scale(1);
  background-color: #bfb;
  border-color: #bfb;
}
.checkbox-l-box {
  padding: 4px;
}
.dropdwnvisible {
  visibility: hidden;
}
.items {
  border: 2px solid black;
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
