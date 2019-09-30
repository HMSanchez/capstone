<template>
        <div>
    <div class="content" id="add">
            <h2 class="content-head is-center">{{topTracks[0].artist.name | cap(topTracks[0].artist.name)}}</h2>
            <!-- {{spotifyArtistObject}} -->
        <div class="pure-g">
            <div @click="toArtist" class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">
              <img class="clickable" :src="artistUrl" >            
            </div> 
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">
  <router-link :to="{name: 'ArtistDetails', params:{name: topTracks[0].artist.name} }" exact> <button class="pure-button is-center">Learn More</button> </router-link>
            </div>
        </div>
            <h3 class="content-head is-center">Top Tracks</h3>        
            <!-- ///DATA CONTENT -->
            <div class="pure-g" v-if="tracksInfo.length > 0">
                <!-- <div v-if="tracksInfo.length > 0"> -->
            <div v-for="(track, index) in topTracks" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-5" :key="index">
            <div @click="toArtistAlbum(index)" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center" >
              <p class="ranks">{{index+1}}.</p> {{track.name}}
              <!-- {{index+1}}. {{tracksInfo[index].name}} -->
              <!-- {{topTracksUrl}} -->
            </div>
            <div @click="toArtistAlbum(index)" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center" >
              <img class="clickable" :src="topTracksUrl[index]" onerror="this.onerror=null;this.src=
              'https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png';">            
            </div>
            </div>
                </div>
                <div class="pure-g" v-else>
                    <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">

                  <h1 class="is-center">No Results</h1>
                    </div>
                </div>
                <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">
  <router-link :to="{name: 'ArtistSingles', params:{name: topTracks[0].artist.name} }" exact> <button class="pure-button is-center">View More</button> </router-link>
            </div>
        </div>
            <h3 style="color: black;" class="content-head is-center">Top Albums</h3>        
            <div v-if="topAlbums.length > 0 " class="pure-g">
            <div v-for="(album, index) in topAlbums" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-5" :key="index">
              <!-- {{album}} -->
            <div style="color: black;" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center transported" >
 <p style="color: black;">{{index+1}}.</p> <router-link style="color: black;" :to="{name: 'AlbumPage', params:{name: topTracks[0].artist.name, albumname: album.name} }" exact>{{album.name}}</router-link>
            </div>
            <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center" >
  <router-link :to="{name: 'AlbumPage', params:{name: topTracks[0].artist.name, albumname: album.name} }" exact>
              <img v-if="albumUrl[index]" class="clickable" :src="albumUrl[index]" >            
              <img v-else class="clickable" src="https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png" >            
  </router-link>
            </div>
            </div>
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">
  <router-link :to="{name: 'ArtistAlbums', params:{name: topTracks[0].artist.name} }" exact> <button class="pure-button is-center">View More</button> </router-link>
            </div>
                </div>
                  <div class="pure-g" v-else>
                    <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">

                  <h1 class="is-center">No Results</h1>
                    </div>
                </div>
        </div>
        
    <!-- </div> -->
</template>

<script>
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

export default {
  name: "ArtistPage",
  data() {
    return {
      topTracks: [],
      topTracksUrl: [],
      topAlbums: [],
      artistUrl: "",
      albumUrl: [],
      tracksInfo: [],
      song: {},
      spotifyArtistObject: {},
      count: 10,
      access_token: "",
      loggedInToSpotify: this.checkCookie()
    };
  },
  props: {
    name: { type: String }
  },
  methods: {
    toArtist() {
      console.log(this.topTracks[0]);
      this.$router.push({
        name: "ArtistDetails",
        params: {
          name: this.topTracks[0].artist.name
        }
      });
    },
    toArtistAlbum(albumIndex) {
      // console.log(this.topAlbums);
      // console.log(this.topAlbums[albumIndex].name);
      // console.log(this.topAlbums[albumIndex].artist.name);

      // console.log(this.topTracks[0].artist.name);
      // console.log(this.tracksInfo[albumIndex].album);
      if (this.tracksInfo[albumIndex].album) {
        console.log("album");
        this.$router.push({
          name: "AlbumPage",
          params: {
            name: this.topTracks[0].artist.name,
            albumname: this.tracksInfo[albumIndex].album.title
          }
        });
      } else {
        console.log("album");
        this.$router.push({
          name: "AlbumPage",
          params: {
            name: this.topAlbums[albumIndex].artist.name,
            albumname: this.topAlbums[albumIndex].name
          }
        });
      }
    },
    grabSpotifyArtist() {
      var ref = this;
      this.access_token = this.getCookie("access_token");
      var spotifyApi = new SpotifyWebApi();
      // console.log(this.access_token);
      spotifyApi.setAccessToken(this.access_token);
      spotifyApi.searchArtists(this.name).then(
        function(data) {
          console.log(`Search artists by name`, data.body);
          ref.spotifyArtistObject = data.body.artists.items[0];
          // console.log(ref.spotifyArtistObject);
          // Get albums by a certain artist
          spotifyApi
            .getArtistAlbums(`${data.body.artists.items[0].id}`, { limit: 10 })
            .then(
              function(data) {
                // console.log("Artist albums", data.body);
                spotifyApi
                  .getAlbumTracks("41MnTivkwTO3UUJ8DrqEJJ", {
                    limit: 5,
                    offset: 1
                  })
                  .then(
                    function(data) {
                      console.log(data.body);
                    },
                    function(err) {
                      console.log("Something went wrong!", err);
                    }
                  );

                // spotifyApi
                //   .getAlbum(`${data.body.items[0].id}`)
                //   .then(function(data) {
                //     return data.body.tracks.map(function(t) {
                //       console.log(t);
                //       return t.id;
                //     });
                //   })
                //   .then(function(trackIds) {
                //     return spotifyApi.getTracks(trackIds);
                //   })
                //   .then(function(data) {
                //     console.log(data.body);
                //   })
                //   .catch(function(error) {
                //     console.error(error);
                //   });
              },
              function(err) {
                console.error(err);
              }
            );
        },
        function(err) {
          console.error(err);
        }
      );
    },
    toAlbum(albIndex) {
      console.log(this.topAlbums);
      console.log(this.topAlbums[albIndex]);
      // this.$router.push({
      //   name: "AlbumPage",
      //   params: {
      //     name: this.topTracks[0].artist.name,
      //     albumname: this.topAlbums[albIndex].name
      //   }
      // });
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
    }
  },
  created() {
    // this.grabSpotifyArtist();
    axios
      .all([
        axios.get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${
            this.name
          }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
        ),
        axios.get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${
            this.name
          }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
        )
      ])
      .then(
        axios.spread((tracksRes, albumsRes) => {
          // console.log(tracksRes);
          for (var i = 0; i < 10; i++) {
            // console.log(tracksRes.data.toptracks.track[i]);
            this.topTracks.push(tracksRes.data.toptracks.track[i]);
          }
          // console.log(this.topTracks);
          // this.topTracks.sort(function(a, b) {
          //   return a.value - b.value;
          // });
          // console.log(this.topTracks);
          this.artistUrl = this.topTracks[0].image[3]["#text"];
          //albums
          for (var k = 0; k < this.count; k++) {
            if (!albumsRes.data.topalbums.album[k].name.includes("null")) {
              this.topAlbums.push(albumsRes.data.topalbums.album[k]);
              this.albumUrl.push(
                albumsRes.data.topalbums.album[k].image[1]["#text"]
              );
            } else {
              this.count++;
            }
          }

          var songnames = [];
          Array.prototype.forEach.call(
            tracksRes.data.toptracks.track.slice(0, 10),
            user => {
              // console.log(user.name);
              songnames.push(user.name);
            }
          );

          const arr = [];
          for (var j = 0; j < songnames.length; j++) {
            const songsUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=8b54926771ecc9a7145bbe1e430f1782&artist=${
              this.name
            }&track=${songnames[j]}&format=json`;
            arr.push(axios.get(songsUrl));
          }

          Promise.all(arr).then(res => {
            for (var h = 0; h < 10; h++) {
              // console.log(response[h].data.track.name);
              if(res[h].data.track){
                this.song = res[h].data.track;
              }
              console.log(this.song);
              // console.log(res[h].data.track);
              if (res[h].data.track && res[h].data.track.album && !res[h].data.message) {
                this.song = res[h].data.track;
                // console.log(this.song);
                this.tracksInfo.push(this.song);
                this.topTracksUrl.push(
                  res[h].data.track.album.image[1]["#text"]
                );
              } else {
                // console.log("invalid");
                this.song = res[h].data.track;
                // console.log(this.song);
                this.tracksInfo.push(this.song);
                this.topTracksUrl.push(
                  "https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png"
                );
              }
            }
          });

          // for (var j = 0; j < 10; j++) {
          //   console.log(`${songname[j]}`);
          //   axios
          //     .get(
          //       `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=8b54926771ecc9a7145bbe1e430f1782&artist=${
          //         this.name
          //       }&track=${songname[j]}&format=json`
          //     )
          //     .then(res => {
          //       console.log(res);
          //       this.song = res.data.track;
          //       console.log(this.song);

          //       if (res.data.track.album && !res.data.message) {
          //         this.song = res.data.track;
          //         // console.log(this.song);
          //         this.tracksInfo.push(this.song);
          //         this.topTracksUrl.push(
          //           res.data.track.album.image[1]["#text"]
          //         );
          //       } else {
          //         console.log('invalid');
          //         this.song = res.data.track;
          //         // console.log(this.song);
          //         this.tracksInfo.push(this.song);
          //         this.topTracksUrl.push(
          //           "https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png"
          //         );
          //       }
          //     });

          // }
        })
      );
  }
};
</script>

<style scoped>
/* .childLink{
  color: white;
  text-decoration: underline;
} */
</style>
