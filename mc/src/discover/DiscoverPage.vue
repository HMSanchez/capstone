<template>
    <div>
        <div class="content" id="add">
            <router-link :to="{name: 'DiscoverPage'}"> <h2 class="content-head is-center">Discover</h2></router-link>
    <ul class="menu">
            <div class="pure-g">
              <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
      <li><router-link :to="{name: 'TopArtists'}"><h4>Top Artists</h4></router-link></li>
              </div>
              <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
      <li><router-link :to="{name: 'TopTracks'}"><h4>Genres</h4></router-link></li>
              </div>
              <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
      <li><router-link :to="{name: 'TopTracks'}"><h4>Top Tracks</h4></router-link></li>
              </div>
              <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
      <li><router-link :to="{name: 'DiscoverPlaylistsPage'}"><h4>Pre-Built Playlists</h4></router-link></li>
              </div>
            </div>
    </ul>
    <!-- {{params}} -->
    <router-view></router-view>
        </div>
    </div>
</template>

<script>
import SpotifyWebApi from "spotify-web-api-node";
import HashMixin from "../shared/hash-params-mixin.js";

export default {
  name: "DiscoverPage",
  // mixins: [HashMixin],
  data() {
    return {
      access_token: "",
      loggedInToSpotify: this.checkCookie(),
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
      if (!user) {
        return true
      } else {
        return false;
      }
    }
  },
  created() {


  }
};
</script>

<style scoped>
#add {
  margin-top: 60px;
}
ul li {
  list-style: none;
}
router-link {
  text-decoration: none;
}
</style>

