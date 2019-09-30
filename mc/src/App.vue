<template>
  <div id="app">

    <div class="header">
      <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
        <ul class="pure-menu-list">
          <li class="pure-menu-item pure-menu-selected">
            <router-link class="pure-menu-link" :to="{name: 'HomePage'}" exact>Home</router-link>
          </li>
          <li v-if="authUser" class="pure-menu-item">
            <div class="pure-menu pure-menu-horizontal">
              <ul class="pure-menu-list">
                <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                  <router-link
                    v-if="authUser.displayName"
                    class="pure-menu-link"
                    :to="{name: 'AccountPage'}"
                    exact
                  >
                    <!-- <i class="far fa-user-circle"></i> -->
                    Hey! {{authUser.displayName}}
                  </router-link>
                  <router-link
                    v-else
                    class="pure-menu-item"
                    :to="{name: 'AccountPage'}"
                    exact
                  >Hey! {{authUser.email}}</router-link>
                  <ul v-if="authUser" class="pure-menu-children">
                    <li class="pure-menu-item">
                      <router-link
                        class="pure-menu-link"
                        :to="{name: 'AccountPage'}"
                        exact
                      >My Account</router-link>
                    </li>
                    <li class="pure-menu-item">
                      <router-link
                        class="pure-menu-link"
                        :to="{name: 'AccountPlaylists'}"
                        exact
                      >My Playlists</router-link>
                    </li>
                    <li class="pure-menu-item">
                      <router-link
                        class="pure-menu-link"
                        :to="{name: 'AccountFavorites'}"
                        exact
                      >My Favorites</router-link>
                    </li>
                    <li class="pure-menu-item">
                      <router-link
                        class="pure-menu-link"
                        :to="{name: 'AccountTopFive'}"
                        exact
                      >My Top Five</router-link>
                    </li>
                    <li v-if="authUser" class="pure-menu-item">
                      <a class="pure-menu-link clickable" id="logoutButton" @click="logout">Logout</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>

          <li v-if="!authUser" class="pure-menu-item">
            <div class="pure-menu pure-menu-horizontal">
              <ul class="pure-menu-list">
                <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                  <!-- <router-link class="pure-menu-link" :to="{name: 'DiscoverPage'}" exact>Discover</router-link> -->
                  <router-link class="pure-menu-link" :to="{name: 'RegisterPage'}" exact>Sign Up</router-link>
                  <ul class="pure-menu-children">
                    <li class="pure-menu-item">
                      <router-link class="pure-menu-link" :to="{name: 'LoginPage'}" exact>Log In</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>

          <li class="pure-menu-item">
            <div class="pure-menu pure-menu-horizontal">
              <ul class="pure-menu-list">
                <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                  <router-link class="pure-menu-link" :to="{name: 'DiscoverPage'}" exact>Discover</router-link>
                  <ul class="pure-menu-children">
                    <li class="pure-menu-item">
                      <router-link
                        class="pure-menu-link"
                        :to="{name: 'TopArtists'}"
                        exact
                      >Top Artists</router-link>
                    </li>
                    <li class="pure-menu-item">
                      <router-link class="pure-menu-link" :to="{name: 'TopTracks'}" exact>Top Tracks</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
          <li class="pure-menu-item"></li>
          <li class="pure-menu-item"></li>
          <!-- <li class="pure-menu-item"><a href="#" class="pure-menu-link">Sign Up</a></li> -->
        </ul>
        <!-- {{showButton}} -->
        <a v-if="showButton" class="pure-menu-heading" id="menu-heading" href>
          <!-- <img src="./assets/header.png" id="header-image" alt=""> -->
          <a href="http://localhost:8888" class="pure-button pure-button-spotify">
            Connect
            <i class="fab fa-spotify"></i>
          </a>
        </a>
        <a v-else class="pure-menu-heading" id="menu-heading-logout" href>
          <a
            href="https://www.spotify.com/logout/"
            target="_blank"
            @click="deleteCookies()"
            class="pure-button-spotify-logout pure-button"
          >
            Logout
            <i class="fab fa-spotify"></i>
          </a>
        </a>
        <div class="search-container">
          <form id="demo-2" @submit.prevent="checkForm">
            <input class="search-bar" type="search" placeholder="Search..." v-model="searchResults" />
          </form>
        </div>
      </div>
    </div>

    <div class="side-menu" v-show="somethingDragged">CONTENT GOES HERE</div>

    <router-view />

    <!-- <div class="footer l-box is-center">
                                    HSanchez
    </div>-->
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";
import firebase from "firebase";
import SpotifyWebApi from "spotify-web-api-node";

// import modal from "@/shared/ModalComponent";
// import modal from './shared/ModalComponent.vue';

export default {
  name: "App",
  data() {
    return {
      somethingDragged: false,
      searchResults: "",
      isModalVisible: false,
      authUser: null,
      tokensString: "",
      params: this.getHashParams(),
      loggedInToSpotify: this.checkCookie()
    };
  },
  watch: {
    $route: "setAuthUser"
  },
  methods: {
    checkForm() {
      this.$router.push({
        name: "SearchPage",
        params: {
          results: this.query
        }
      });
      this.searchResults = "";
      this.query = "";
    },
    setAuthUser() {
      this.authUser = firebase.auth().currentUser;
      // console.log(this.authUser);
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
          alert("Logged out Successfully");
        })
        .catch(e => {
          alert(e.message);
        });
    },
    getHashParams() {
      var hashParams = {};
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      // console.log(q);
      this.tokensString = q;
      while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      // console.log(hashParams.access_token);
      // console.log(hashParams.refresh_token);
      // console.log(hashParams);
      return hashParams;
    },
    setCookie(cname, cvalue) {
      var d = new Date();
      var n = d.getHours();
      var domainName = window.location.hostname;
      // console.log(domainName);
      d.setHours(n + 1);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
      if (typeof user === "undefined" || user == "" || user == "undefined") {
        return true;
      } else {
        return false;
      }
    },
    deleteCookies() {
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  },
  computed: {
    query() {
      let res = this.searchResults;
      return res;
    },
    showButton() {
      var user = this.getCookie("access_token");
      console.log(user);
      if (typeof user === "undefined" || user == "" || user == "undefined") {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    // this.deleteCookies();
    console.log(this.checkCookie());
    if (this.checkCookie()) {
      this.setCookie("access_token", this.getHashParams().access_token);
      this.setCookie("refresh_token", this.getHashParams().refresh_token);
    } else {
    }

    var spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(this.getHashParams().access_token);
    spotifyApi.setRefreshToken(this.getHashParams().refresh_token);

    this.setAuthUser();
  },
  updated() {
    this.setAuthUser();
  },
  components: {
    Slide
  }
};
</script>


 
<style>
#menuLink1 {
  color: #bafaff;
}
a {
  color: #02d4db;
}
a:hover {
  color: #fff;
}
.content {
  background: #0284a8;
}
#errors li {
  list-style: none;
  display: block;
  color: red;
}

#errors li:hover {
  list-style: none;
  background: #fff;
  cursor: text;
  display: block;
  color: red;
}

.clickable {
  cursor: pointer;
}

.ranks {
  color: #e6e6e6;
}

.button-error {
  background-color: rgb(202, 60, 60);
  /* this is a maroon */
}

.pure-button-error {
  background-color: rgb(202, 60, 60);
  /* this is a maroon */
  color: #fff;
  padding: 0.5em 2em;
  border-radius: 5px;
}
#logoutButton:hover {
  color: #eb5650;
}
.fa-check {
  color: #1db954;
  font-size: 22px;
}

.fa-user-circle {
  font-size: 25px;
}

.fa-times {
  color: red;
  font-size: 22px;
}

#add {
  margin-top: 60px;
}

.search-item {
  float: right;
}

.search-bar {
  border-radius: 5px;
  border: 2px inset #0284a8;
  padding: 5px;
  color: #000;
}

.search-container {
  vertical-align: middle;
  margin-top: 10px;
  display: inline-block;
  float: right;
}

.fa-spotify {
  color: #1db954;
  background-color: #000;
  padding: 5px;
}

.fa-lastfm-square {
  padding: 2px;
  background-color: #fff;
  font-size: 20px;
  color: #c3000d;
}

.fa-plus {
  color: #1db954;
  font-size: 25px;
  cursor: pointer;
}
.fa-minus {
  color: #c3000d;
  font-size: 25px;
  cursor: pointer;
}

.numberCircle {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 8px;
  margin: 4px;
  background: #1db954;
  border: 2px solid #fff;
  color: #fff;
  text-align: center;
  font: 12px;
}

/* notifications */

#notification-success {
  visibility: hidden;
  /* max-width: 50px; */
  width: 90%;
  height: 50px;
  /*margin-left: -125px;*/
  margin: auto;
  background-color: rgb(34, 255, 52);
  color: #fff;
  text-align: center;
  border-radius: 10px;
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  top: 70px;
  font-size: 20px;
  white-space: nowrap;
}

#notification-success #img {
  width: 50px;
  height: 50px;
  float: left;
  padding-top: 16px;
  border-radius: 10px 0px 0px 10px;
  padding-bottom: 16px;
  box-sizing: border-box;
  background-color: #111;
  color: #fff;
}

#notification-success #desc-success {
  color: rgb(0, 0, 0);
  padding: 16px;
  overflow: hidden;
  white-space: nowrap;
}

#notification-success.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, expand 0.5s 0.5s, stay 3s 1s, shrink 0.5s 2s,
    fadeout 0.5s 2.5s;
  animation: fadein 0.5s, expand 0.5s 0.5s, stay 3s 1s, shrink 0.5s 4s,
    fadeout 0.5s 4.5s;
}

#notification-error {
  visibility: hidden;
  /* max-width: 50px; */
  width: 90%;

  height: 50px;
  /*margin-left: -125px;*/
  margin: auto;
  background-color: rgb(255, 8, 0);
  color: #fff;
  text-align: center;
  border-radius: 10px;
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  top: 70px;
  font-size: 20px;
  white-space: nowrap;
}

#notification-error #img {
  width: 50px;
  height: 50px;
  float: left;
  padding-top: 16px;
  border-radius: 10px 0px 0px 10px;
  padding-bottom: 16px;
  box-sizing: border-box;
  background-color: #111;
  color: #fff;
}

#notification-error #desc-error {
  color: #fff;
  padding: 16px;
  overflow: hidden;
  white-space: nowrap;
}

#notification-error.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, expand 0.5s 0.5s, stay 3s 1s, shrink 0.5s 2s,
    fadeout 0.5s 2.5s;
  animation: fadein 0.5s, expand 0.5s 0.5s, stay 3s 1s, shrink 0.5s 4s,
    fadeout 0.5s 4.5s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes expand {
  from {
    min-width: 50px;
  }
  to {
    min-width: 350px;
  }
}

@keyframes expand {
  from {
    min-width: 50px;
  }
  to {
    min-width: 350px;
  }
}

@-webkit-keyframes stay {
  from {
    min-width: 350px;
  }
  to {
    min-width: 350px;
  }
}

@keyframes stay {
  from {
    min-width: 350px;
  }
  to {
    min-width: 350px;
  }
}

@-webkit-keyframes shrink {
  from {
    min-width: 350px;
  }
  to {
    min-width: 50px;
  }
}

@keyframes shrink {
  from {
    min-width: 350px;
  }
  to {
    min-width: 50px;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 60px;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 60px;
    opacity: 0;
  }
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.transported {
  cursor: pointer;
}

.playlistItem {
  border: #888 solid 2px;
  color: #000;
  border-radius: 15px;
}
.playlistItem h3,
.playlist-header {
  /* border: #888 solid 2px; */
  color: #000;
  /* border-radius: 15px; */
}
.playlistItem:hover {
  background-color: rgb(167, 220, 255);
  cursor: pointer;
}
.playlistItem:hover h3 {
  color: #234;
  cursor: pointer;
}

/* .pagination {

  }
  
  .page-item {}
   */
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

/*
                                         * -- BASE STYLES --
                                         * Most of these are inherited from Base, but I want to change a few.
                                         */

body {
  line-height: 1.7em;
  color: #e1f7e7;
  font-size: 14px;
}

h1,
h2,
h3,
h4,
h5,
h6,
label {
  color: #bafaff;
}

.pure-img-responsive {
  max-width: 100%;
  height: auto;
}

/*
                                         * -- LAYOUT STYLES --
                                         * These are some useful classes which I will need
                                         */

.l-box {
  padding: 1em;
}

.l-box-lrg {
  padding: 2em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.is-center {
  text-align: center;
}

/*
                                         * -- PURE BUTTON STYLES --
                                         * I want my pure-button elements to look a little different
                                         */

.pure-button {
  background-color: #696b76;
  color: white;
  border: 2px solid white;
  padding: 0.5em 2em;
  border-radius: 5px;
}

.pure-button-spotify {
  background: #000;
  color: #1db954;
  letter-spacing: 1.3px;
  border: 2px solid white;
}

.pure-button-spotify-logout {
  background: #000;
  color: #ff1e1e;
  letter-spacing: 1.3px;
  border: 2px solid white;
}

.pure-button-spotify:hover {
  color: #77ffa7;
}

.pure-button-spotify-logout:hover {
  color: red;
}

#menu-heading a {
  color: #1db954;
}

#menu-heading-logout a {
  color: #ff5757;
}

#menu-heading-logout a:hover {
  color: #ff0000;
}

.pure-button:hover {
  color: #77bfc7;
}

a.pure-button-primary {
  background: white;
  color: #1f8dd6;
  border-radius: 5px;
  font-size: 120%;
}

/*
                                         * -- MENU STYLES --
                                         * I want to customize how my .pure-menu looks at the top of the page
                                         */

.home-menu {
  padding: 0.5em;
  text-align: center;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.home-menu {
  background: #02547d;
  /* background: #2d3e50; */
}

.pure-menu.pure-menu-fixed {
  /* Fixed menus normally have a border at the bottom. */
  border-bottom: none;
  /* I need a higher z-index here because of the scroll-over effect. */
  z-index: 4;
}

.home-menu .pure-menu-heading {
  color: white;
  font-weight: 400;
  font-size: 120%;
}

.home-menu .pure-menu-selected a {
  color: white;
}

.pure-menu-selected .pure-menu-link,
.pure-menu-selected .pure-menu-link:visited {
  color: white;
}

.pure-menu-children {
  background: #696b76;
}

.pure-menu-children li:hover {
  /* background: rgb(88, 89, 95); */
  color: #02d4db;
}

.home-menu a {
  color: #a9e8dc;
  text-decoration: none;
}

.home-menu li a:hover,
.home-menu li a:focus {
  background: none;
  border: none;
  color: #e1f7e7;
}

/* This is the class used for the footer */

.footer {
  background: #111;
  position: fixed;
  bottom: 0;
  width: 100%;
}

/*
                                         * -- TABLET (AND UP) MEDIA QUERIES --
                                         * On tablets and other medium-sized devices, we want to customize some
                                         * of the mobile styles.
                                         */

/* We increase the body font size */

body {
  font-size: 16px;
}

/* We can align the menu header to the left, but float the
                                            menu items to the right. */

.home-menu {
  text-align: left;
}

.home-menu ul {
  /* float: right; */
}

/* We increase the height of the splash-container */

/*    .splash-container {
                                                height: 500px;
                                            }*/

/* We decrease the width of the .splash, since we have more width
                                            to work with */

.splash {
  width: 50%;
  height: 50%;
}

.splash-head {
  font-size: 250%;
}

/* We remove the border-separator assigned to .l-box-lrg */

.l-box-lrg {
  border: none;
}

/*
                                         * -- DESKTOP (AND UP) MEDIA QUERIES --
                                         * On desktops and other large devices, we want to over-ride some
                                         * of the mobile and tablet styles.
                                         */

.content-wrapper {
  /* These styles are required for the "scroll-over" effect */
  position: absolute;
  top: 87%;
  width: 100%;
  min-height: 12%;
  z-index: 2;
  background: white;
}

/*
                                   * -- PURE FORM STYLES --
                                   * Style the form inputs and labels
                                   */

.pure-form label {
  margin: 1em 0 0;
  font-weight: bold;
  font-size: 100%;
}

.pure-form input[type] {
  border: 2px solid #ddd;
  box-shadow: none;
  font-size: 100%;
  width: 100%;
  margin-bottom: 1em;
}

/*
           * -- SPLASH STYLES --
           * This is the blue top section that appears on the page.
           */

.splash-container {
  background: #1f8dd6;
  z-index: 1;
  overflow: hidden;
  /* The following styles are required for the "scroll-over" effect */
  width: 100%;
  height: 88%;
  top: 0;
  left: 0;
  position: fixed !important;
}

.splash {
  /* absolute center .splash within .splash-container */
  width: 80%;
  height: 50%;
  margin: auto;
  position: absolute;
  top: 100px;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  text-transform: uppercase;
}

/* This is the main heading that appears on the blue section */

.splash-head {
  font-size: 20px;
  font-weight: bold;
  color: white;
  border: 3px solid white;
  padding: 1em 1.6em;
  font-weight: 100;
  border-radius: 5px;
  line-height: 1em;
}

/* This is the subheading that appears on the blue section */

.splash-subhead {
  color: white;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

/*
           * -- CONTENT STYLES --
           * This represents the content area (everything below the blue section)
           */

/* We want to give the content area some more padding */

.content {
  padding: 1em 1em 3em;
}
.content p {
  color: #fff;
}

/* This is the class used for the main content headers (<h2>) */

.content-head {
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 2em 0 1em;
}

/* This is a modifier class used when the content-head is inside a ribbon */

.content-head-ribbon {
  color: white;
}

/* This is the class used for the content sub-headers (<h3>) */

.content-subhead {
  color: #8fd2ff;
}

.content-subhead i {
  margin-right: 7px;
}

/* This is the class used for the dark-background areas. */

.ribbon {
  background: #696b76;
  color: #aaa;
}

@media (min-width: 48em) {
  /* We increase the body font size */
  body {
    font-size: 16px;
  }
  /* We can align the menu header to the left, but float the
        menu items to the right. */
  .home-menu {
    text-align: left;
  }
  .home-menu ul {
    /* float: right; */
  }
  /* We increase the height of the splash-container */
  /*    .splash-container {
            height: 500px;
        }*/
  /* We decrease the width of the .splash, since we have more width
        to work with */
  .splash {
    width: 50%;
    height: 50%;
  }
  .splash-head {
    font-size: 250%;
  }
  /* We remove the border-separator assigned to .l-box-lrg */
  .l-box-lrg {
    border: none;
  }
}

/*
     * -- DESKTOP (AND UP) MEDIA QUERIES --
     * On desktops and other large devices, we want to over-ride some
     * of the mobile and tablet styles.
     */

@media (min-width: 78em) {
  /* We increase the header font size even more */
  .splash-head {
    font-size: 300%;
  }
}
</style>

<style scoped>
.home-menu .pure-menu-heading {
  font-size: 80%;
}

#menu-heading a:hover {
  color: #77ffa7;
}

/* #app {
                                                        font-family: "Avenir", Helvetica, Arial, sans-serif;
                                                      } */
</style>
