<template>
    <div>
        <div class="content" id="add">
        <h2 class="content-head is-center">Top Tracks</h2>
        <div class="pure-g">
             <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1">
            <div class="pure-g search-results-box">

    <div class="pure-u-lg-1 search-content" v-for="(track, index) in topTracks" :key="index">
        <div class="pure-u-lg-1-6">
        <img :src="track.image[1].text" alt="">
        </div>
        <div class="pure-u-lg-1-4">
        {{track.name}}
        </div>
        <div class="pure-u-lg-1-4">
            <router-link :to="{name: 'ArtistPage', params:{ name: track.artist.name}}">{{track.artist.name}}</router-link>        
        </div>
        <div class="pure-u-lg-1-5">
        <i class="fab fa-lastfm-square"></i>
        </div>
        <hr>
    </div>
    <!-- <div class="pure-u-1-3"><p>Thirds</p></div> -->
    <!-- <div class="pure-u-1-3"><p>Thirds</p></div> -->
</div>
            <!-- <table class="pure-table pure-table-horizontal">
    <thead>
        <tr>
            <th>Image</th>
            <th>Track Name</th>
            <th>Artist</th>
            <th>API</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(track, index) in topTracks" :key="index">
            <td><img :src="track.image[1].text" alt=""></td>
            <td>{{track.name}}</td>
            <td>{{track.artist.name}}</td>
            <td> <i class="fab fa-lastfm-square"></i></td>
        </tr>
    </tbody>
</table> -->
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import * as firebase from "firebase";

export default {
  name: "TopTracks",
  data() {
    return {
      topTracks: [],
      access_token: "",
      loggedInToSpotify: this.checkCookie()
    };
  },
  methods: {
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
      if (typeof user === "undefined" || user == "" || user == "undefined") {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
      )
      .then(res => {
        // console.log(res.data);
        for (var i = 0; i < res.data.tracks.track.length; i++) {
          if (res.data.tracks.track[i].image) {
            for (var j = 0; j < res.data.tracks.track[i].image.length; j++) {
                res.data.tracks.track[i].image[j] = {
                    text:  res.data.tracks.track[i].image[j]["#text"]
                }

            }
          }
        //   console.log(res.data.tracks.track[i].image);
          this.topTracks.push(res.data.tracks.track[i]);
        }
        console.log(this.topTracks);
      });
  }
};
</script>

<style scoped>
#add{
    margin: 0px;
}
.search-results-box{
    margin-top: 60px; 
    text-align: center;

}
.search-content {
    text-align: center;
}
hr {
    margin: 5px;
    padding: 5px;
    border-top: 1px solid #fff;
}
</style>
