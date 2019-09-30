<template>
  <div>
    <div class="splash-container">
      <div class="splash">
        <h1 class="splash-head">Married To The Music.</h1>
        <p class="splash-subhead">All the music you could ever want is here.</p>
        <p>
          <a href="http://localhost:8888" class="pure-button pure-button-spotify">
            Access even more
            <i class="fab fa-spotify"></i>
          </a>
        </p>
      </div>
    </div>

    <div class="content-wrapper" id="add">
      <div class="content">
        <h2 class="content-head is-center">Jump right in.</h2>

        <div class="pure-g">
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <router-link :to="{name: 'DiscoverPlaylistsPage'}" exact>
              <h3 class="content-subhead">
                <i class="fas fa-search"></i> Browse Playlists
              </h3>
            </router-link>
            <p>Check out some homemade playlists.</p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <router-link :to="{name: 'DiscoverPage'}" exact>
              <h3 class="content-subhead">
                <i class="fa fa-rocket"></i> Discover
              </h3>
            </router-link>
            <p>Start looking for your next favorite thing in the world.</p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <router-link :to="{name: 'DiscoverPlaylistsPage'}" exact>
              <h3 class="content-subhead">
                <i class="fas fa-fire"></i> Popular Hits
              </h3>
            </router-link>
            <p>See what the fuss is all about.</p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <router-link :to="{name: 'DiscoverPlaylistsPage'}" exact>
              <h3 class="content-subhead">
                <i class="fas fa-box-open"></i> New Releases
              </h3>
            </router-link>
            <p>Get a look at the latest releases.</p>
          </div>
        </div>
      </div>

      <!-- {{loggedInToSpotify}} -->
      <div class="ribbon l-box-lrg pure-g new-releases-container">
        <!-- <div class="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
              <img width="300" alt="File Icons" class="pure-img-responsive" src="img/common/file-icons.png">
        </div>-->
        <div v-if="!loggedInToSpotify" class="pure-u-1 pure-u-md-1-2 pure-u-lg-1">
          <h2 class="content-head content-head-ribbon is-center">New Releases</h2>
          <div
            v-if="newReleases.length >0"
            class="pure-menu pure-menu-horizontal pure-menu-scrollable scrollbar"
          >
            <div v-if="newReleases.length >0" class="slideshow">
              <div class="images">
                <!-- <a href="#" class="pure-menu-link pure-menu-heading">Yahoo</a> -->
                <!-- A slideshow of images in here (whatever you want to say for screen readers) -->
                <ul class="pure-menu-list" v-for="(item,index) in newReleases" :key="index">
                  <li class="pure-menu-item">
                    <router-link
                      :to="{name: 'AlbumPage', params: {name: item.artists[0].name, albumname:item.name}}"
                      exact
                    >
                      <img alt="Item Images" class="pure-img-responsive" :src="item.images[1].url" />
                    </router-link>
                    <router-link
                      :to="{name: 'ArtistPage', params: {name: item.artists[0].name}}"
                      exact
                    >
                      <p>{{item.artists[0].name}}</p>
                    </router-link>
                    <!-- <router-link :to="{name: 'AlbumPage', params: {name: item.artists[0].name, albumname:item.name}}" exact>
                <p>{{item.name}}</p>
                    </router-link>-->
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- <div v-else>
            <h3 class="content-head content-head-ribbon is-center" style="padding: 5">Coming Soon</h3>
          </div>
          <p class="is-center"><i class="fas fa-arrows-alt-h"></i></p>-->
        </div>
        <div v-else class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1">
          <h2 class="content-head content-head-ribbon is-center">The Mission</h2>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1">
            <p style="color: #fff;">
              The goal of music central is to bring all music together. The site currently makes use of the Last FM API and Spotify API (and hopefully more in the future). By gathering data from mulitple sources, the variety of music and features increases greatly.
              Popular features from each site may be implemented along with home-grown features to provide a familiar yet fresh experience.
            </p>
          </div>
        </div>
      </div>

      <div class="content" v-if="!loggedIn">
        <h2 class="content-head is-center">Get Connected!</h2>

        <div class="pure-g">
          <div class="l-box-lrg pure-u-1 pure-u-md-2-5">
            <form class="pure-form pure-form-stacked" v-on:submit.prevent="signUp">
              <label for="name">Username</label>
              <input id="name" type="text" v-model="newUser.name" placeholder="Username" />
              <label for="email">Your Email</label>
              <input id="email" type="email" v-model="newUser.email" placeholder="Your Email" />
              <label for="password">Your Password</label>
              <input
                id="password"
                type="password"
                v-model="newUser.password"
                placeholder="Your Password"
              />
              <button type="submit" class="pure-button">Sign Up</button>
            </form>
            <ul class="errors">
              <!-- <li v-show="!validation.name">Name cannot be empty.</li> -->
              <li v-show="newUser.email != '' && !validation.email">Please provide a valid email address.</li>
            </ul>
          </div>

          <div class="l-box-lrg pure-u-1 pure-u-md-3-5">
            <h4>Make your own playlists</h4>
            <p>Register now for the ability to create your own playlists!</p>

            <h4>Follow your favorites</h4>
            <p>By registering you can build up your personal list of favorite artist, genres, and songs.</p>
          </div>
        </div>
      </div>
      <div v-else-if="!loggedInToSpotify&& !loggedIn" class="content">
        <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1">
          <h2 class="content-head is-center">The Mission</h2>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1">
            <p style="color: #fff;">
              The goal of music central is to bring all music together. The site currently makes use of the Last FM API and Spotify API (and hopefully more in the future). By gathering data from mulitple sources, the variety of music and features increases greatly.
              Popular features from each site may be implemented along with home-grown features to provide a familiar yet fresh experience.
            </p>
          </div>
        </div>
      </div>
      <div v-else class="content">
        <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1">
          <h2 class="content-head is-center">Recently added to Playlists</h2>
          <div class="pure-g is-center">
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1"></div>
            <div
              v-for="(song, index) in allPlaylistsSongsWithKeys"
              class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-5"
              :key="index"
            >
              <!-- {{song.key}} -->
              <!-- <div v-for="(track, indextwo) in allPlaylistsSongsWithKeys.songs" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1" :key="indextwo">               -->
              <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1">
                <!-- {{song.song}} -->
                <!-- {{song.song.duration | duration}} -->
                <!-- <router-link :to="{name: 'AlbumPage', params: {name: song.song.artist.name, albumname:song.song.name}}" exact> -->
                <img alt="Item Images" class="pure-img-responsive" :src="song.song.image_url" />
                <!-- </router-link> -->
                <div class="pure-u-1 pure-u-md-1-4 pure-u-lg-1">{{song.song.name}}</div>
                <div class="pure-u-1 pure-u-md-1-4 pure-u-lg-1">
                  <router-link
                    :to="{name: 'ArtistPage', params: {name: song.song.artist.name}}"
                    exact
                  >{{song.song.artist.name}}</router-link>
                </div>
              </div>
              <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1">
                <router-link
                  :to="{name: 'AccountPlaylistPartialPage', params: {playlistid: song.key.toString()}}"
                >
                  <button class="pure-button is-center link-button">View in Playlist</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyWebApi from "spotify-web-api-node";
import * as firebase from "firebase";

var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  name: "HomePage",
  data() {
    return {
      access_token: "",
      logged: false,
      // loggedInToSpotify: this.checkCookie(),
      newUser: {
        email: "",
        password: "",
        name: ""
      },
      playlistsObjects: [],
      playlistsObjectsKeys: [],
      allPlaylistsSongs: [],
      allPlaylistsSongsWithKeys: [],
      newReleases: []
    };
  },
  computed: {
    loggedIn() {
      var ref = this;
      // var isLoggedIn = false;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          ref.logged = true;
        } else {
        }
      });
      return ref.logged;
      // console.log(isLoggedIn);
    },
    loggedInToSpotify() {
      console.log(this.checkCookie());
      return this.checkCookie();
    },
    validation: function() {
      return {
        // name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      };
    }
  },
  methods: {
    displayPopup() {
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
    },
    addFooter() {
      const div = document.createElement("div");
      div.className = "footer l-box is-center";
      div.innerHTML = "HSanchez";
      // console.log(div);
      const parent = document.getElementById("add");
      // console.log(parent);
      document.getElementById("add").appendChild(div);
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
      // console.log(user);
      // console.log(typeof user === "undefined");
      if (typeof user === "undefined" || user == "" || user === "undefined") {
        return true;
      } else {
        return false;
      }
    },
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.newUser.email,
          this.newUser.password
        )
        .then(user => {
          this.newUser.email = "";
          this.newUser.password = "";
          this.other();
          this.$router.replace("/login");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    other() {
      var database = firebase.database();
      let name = this.newUser.name;
      var ref = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(user);
          user
            .updateProfile({
              displayName: name
            })
            .then(
              function(response) {
                //Success
                ref.writeUserData(user.uid, user.displayName, user.email);
                ref.writeUserObjects(user.uid);
              },
              function(error) {
                //Error
                console.log(error);
              }
            );
          console.log(user);
        } else {
          // No user is signed in.
        }
      });
    },
    writeUserData: function(userId, name, email) {
      //users
      firebase
        .database()
        .ref("users/" + userId)
        .set({
          username: name,
          email: email
        });
    },
    writeUserObjects: function(userId) {
      //UserObjects
      // firebase
      //   .database()
      //   .ref("userObjects/" + userId)
      //   .set({
      //   });
    },
    grabRecentlyAddedItems() {
      firebase
        .database()
        .ref("userObjects")
        .orderByKey.limitToLast(2)
        .once("value", snapshot => {
          // take the last item with the lowest key in the snapshot
        });
    },
    grabEachPlaylistsSongs() {
      var database = firebase.database();
      var ref = this;
      var all = [];
      var user = firebase.auth().currentUser;

      firebase
        .database()
        .ref("userObjects/" + user.uid + "/playlists/")
        .once("value", function(snapshot) {
          // console.log(snapshot.val());
        })
        .then(function(snap) {
          var playlistKey = "";
          var songsInPlaylist = [];
          var keys = [];
          snap.forEach(function(childNodes) {
            // console.log(childNodes.key);
            console.log(childNodes.val());
            ref.playlistsObjects.push(childNodes.val());
            ref.playlistsObjectsKeys.push(childNodes.key);
            // console.log(ref.playlistsObjectsKeys);
          });
          var newArray = [];
          console.log(ref.playlistsObjectsKeys);
          for (var k = 0; k < ref.playlistsObjectsKeys.length; k++) {
            var refer = firebase
              .database()
              .ref(
                "/userObjects/" +
                  user.uid +
                  "/playlists/" +
                  ref.playlistsObjectsKeys[k] +
                  "/songs/"
              );
            refer
              .orderByChild("time_stamp")
              .limitToLast(5)
              .on("child_added", function(snapshot) {
                // This callback will be triggered exactly two times, unless there are
                // fewer than two dinosaurs stored in the Database. It will also get fired
                // for every new, heavier dinosaur that gets added to the data set.
                console.log(snapshot.key);
                var obj2 = {
                  key: snapshot.key,
                  val: snapshot.val()
                };
                newArray.push(obj2);
              });
            console.log(newArray);
            for (var iz = 0; iz < newArray.length; iz++) {
              if (newArray[iz].val.time_stamp) {
                newArray.splice(iz, 1);
              }
            }
            if (newArray.length > 20) {
              while (newArray.length > 20) {
                newArray.pop;
              }
            }
            console.log(newArray);

            var num = k;
            firebase
              .database()
              .ref(
                "/userObjects/" +
                  user.uid +
                  "/playlists/" +
                  ref.playlistsObjectsKeys[k] +
                  "/songs/"
              )
              .once("value", function(snapshot) {
                // console.log(snapshot.key);
              })
              .then(
                function(snapshot) {
                  var arr = [];
                  var arrParent = [];
                  // console.log(k);
                  snapshot.forEach(function(childSnapshot) {
                    var songObj = childSnapshot.val();
                    // console.log(k);
                    // songObj.playlist_index = num;
                    // console.log(songObj);
                    // childSnapshot.val().playlist_index = k;
                    arr.push(songObj);
                    // ref.allPlaylistsSongs.push(songObj);
                  });
                  ref.allPlaylistsSongs.push(arr);
                  console.log(ref.allPlaylistsSongs);
                  for (var iu = 0; iu < ref.allPlaylistsSongs.length; iu++) {
                    for (
                      var zc = 0;
                      zc < ref.allPlaylistsSongs[iu].length;
                      zc++
                    ) {
                      var coolObj = {
                        key: iu,
                        song: ref.allPlaylistsSongs[iu][zc]
                      };
                      // console.log(coolObj);
                      arrParent.push(coolObj);
                      // ref.allPlaylistsSongs.push(coolObj);
                      // arr[]
                    }
                  }
                  // console.log(arrParent);
                  ref.allPlaylistsSongsWithKeys = arrParent;
                  var correctArrHolder = [];
                  // for (
                  //   var jkl = 0;
                  //   jkl < ref.allPlaylistsSongsWithKeys.length;
                  //   jkl++
                  // ) {
                  //   console.log(ref.allPlaylistsSongsWithKeys[jkl].song);
                  ref.allPlaylistsSongsWithKeys = ref.allPlaylistsSongsWithKeys.sort(
                    function(a, b) {
                      return a.song.time_stamp - b.song.time_stamp;
                    }
                  );
                  ref.allPlaylistsSongsWithKeys = ref.allPlaylistsSongsWithKeys.reverse();
                  // }
                  // all.push(arr);
                  console.log(ref.allPlaylistsSongsWithKeys);
                  // ref.allPlaylistsSongs[k].playlist_index = k;
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
        });
    },
    compare(a, b) {
      if (a.last_nom < b.last_nom) return -1;
      if (a.last_nom > b.last_nom) return 1;
      return 0;
    },
    playPlayback() {
      play({
        playerInstance: player,
        spotify_uri: "spotify:track:381g0b6QZxC13SzA2HRMIc"
        // spotify_uri: 'spotify:album:5zWa1ZEUBctbKqvwXbFawo',
      });
    }
  },
  created() {
    this.grabEachPlaylistsSongs();
    console.log(this.allPlaylistsSongs);
    var ref = this;
    this.access_token = this.getCookie("access_token");
    var spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(this.access_token);
    spotifyApi
      .getNewReleases({
        limit: 20,
        offset: 0,
        country: "US"
      })
      .then(
        function(data) {
          console.log(data.body);
          // done();
          data.body.albums.items.forEach(element => {
            ref.newReleases.push(element);
          });
          // console.log(ref.newReleases);
        },
        function(err) {
          console.log("Something went wrong!", err);
        }
      );

    //     let ckeditor = document.createElement("script");
    //     ckeditor.setAttribute("src", "https://sdk.scdn.co/spotify-player.js");
    //     document.head.appendChild(ckeditor);

    // // Called when the Spotify Web Playback SDK is ready to use
    //   window.onSpotifyWebPlaybackSDKReady = () => {
    //     // console.log(this.access_token);
    //     // BQAUp-Yp7bqVfGFhsgdDPx2Suk2ETV5aZu3YCxY6_nyuWL8PtgV14GG9v8xpEQVOHxMugOKz_ZwA9jOWTWt1HncNBdeuLoAjdUet4AzlD5hyFj_1yYtErsXhScLC2baT8vjiKRFzNDtBQoUGEzqlwBx8BsLme9lfZC33EimcSF9WIF08maVubC-eMuOg
    //     // Define the Spotify Connect device, getOAuthToken has an actual token
    //     // hardcoded for the sake of simplicity
    //     var player = new Spotify.Player({
    //       name: 'A Spotify Web SDK Player',
    //       getOAuthToken: callback => {
    //         // callback(ref.access_token);
    //         callback('BQCS4ZM6YSwPTJem9qq9gKzxe4RbnlNXAg3j8F_oNp6zBo4HJfMagHsvL8PK_wQdztn01Kdphq3w4hciDA3nQUPMBenYplF_VzOYTkjcRoHhMEcPB-HJvdyUr8gzqLJPJjB8llj0SWt5wOacQhsur53kyTatE8QToKt9bt5V2nB3JkxS5Hma20auelmd');
    //       },
    //       volume: 0.1
    //     });

    //     // Called when connected to the player created beforehand successfully
    //     player.addListener('ready', ({ device_id }) => {
    //       console.log('Ready with Device ID', device_id);

    //       const play = ({
    //         spotify_uri,
    //         playerInstance: {
    //           _options: {
    //             getOAuthToken,
    //             id
    //           }
    //         }
    //       }) => {
    //         getOAuthToken(access_token => {
    //           fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    //             method: 'PUT',
    //             body: JSON.stringify({ uris: [spotify_uri] }),
    //             headers: {
    //               'Content-Type': 'application/json',
    //               'Authorization': `Bearer ${access_token}`
    //             },
    //           });
    //         });
    //       };

    //       play({
    //         playerInstance: player,
    //         spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
    //       });
    //     });

    //     // Connect to the player created beforehand, this is equivalent to
    //     // creating a new device which will be visible for Spotify Connect
    //     player.connect();
    //   };

    // this.playPlayback();
    // function pausePlayback(){
    // player.pause().then(() => {
    //   console.log('Paused!');
    // });
    // }

    // function resumePlayback(){
    //     player.resume().then(() => {
    //   console.log('Resumed!');
    // });
    // }

    // function playPausePlayback(){
    // player.togglePlay().then(() => {
    //   console.log('Toggled playback!');
    // });
    // }

    // function seekPlayback(){
    //     player.seek(60 * 1000).then(() => {
    //   console.log('Changed position!');
    // });
    // }

    // function nextTrackPlayback(){
    //     player.nextTrack().then(() => {
    //   console.log('Skipped to next track!');
    // });
    // }

    // function getStateOfPlayback(){
    //     player.getCurrentState().then(state => {
    //   if (!state) {
    //     console.error('User is not playing music through the Web Playback SDK');
    //     return;
    //   }

    //   let {
    //     current_track,
    //     next_tracks: [next_track]
    //   } = state.track_window;

    //   console.log('Currently Playing', current_track);
    //   console.log('Playing Next', next_track);
    // });
    // }

    // this.handleScriptLoad();
    // this.initializeSpotifyPlayer();
    // this.playSpotifyURI();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-releases-container {
  height: 100%;
  display: block;
}
.pure-menu-horizontal.pure-menu-scrollable {
  height: 350px;
}
.pure-menu-horizontal.pure-menu-scrollable:hover {
  /* height: 350px; */
  /* border */
}

.scrollbar {
  /* height: 100%; */
  /* display: contents; */
}
.splash-container {
  background-image: url(https://images.unsplash.com/photo-1420161900862-9a86fa1f5c79?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2a1a8ce2f8a4378aa6556383d3d40cca&auto=format&fit=crop&w=800&q=60);
  background-repeat: no-repeat;
  background-size: cover;
}

.splash-subhead {
  opacity: 1;
}

.content-head {
  margin: 10px;
}

.fa-arrows-alt-h {
  font-size: 50px;
  /* width: 200px; */
  transform: scale(1.5, 1);
  color: #fff;
}

.pure-button-spotify {
  background: #000;
  color: #1db954;
  letter-spacing: 1.3px;
  border: 2px solid white;
}

.pure-button-spotify:hover {
  color: #77ffa7;
}

a {
  text-decoration: none;
}
/* slideshow */
.slideshow {
  position: relative;
  /* overflow: hidden; */
}
.images {
  /* background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/collage.jpg); */
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300%;
  animation: slideshow 42s linear infinite;
  animation-delay: 2.5s;
  /* animation-direction: alternate; */
}
.images:hover {
  /* background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/collage.jpg); */
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300%;
  animation-play-state: paused;
}

@keyframes slideshow {
  0% {
    left: -30;
  }
  100% {
    left: -420%;
  }
}
</style>
