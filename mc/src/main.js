// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import durationFilter from './shared/duration-filter';
// import durationFilter from './shared/duration-filter';
import capFilter from './shared/cap-filter';
import aposFilter from './shared/apos-filter';
import Paginate from 'vuejs-paginate';
import VueLodash from 'vue-lodash'
// import VueFire from 'vuefire';
import firebase from 'firebase';
import SpotifyWebApi from "spotify-web-api-node";


Vue.config.productionTip = false
let app;
var config = {
  apiKey: "AIzaSyBE52Yj9BQRqmFhlCNrtlzSN7gXFv1mpkE",
  authDomain: "musiccentral-952dd.firebaseapp.com",
  databaseURL: "https://musiccentral-952dd.firebaseio.com",
  projectId: "musiccentral-952dd",
  storageBucket: "musiccentral-952dd.appspot.com",
  messagingSenderId: "1044041824771"
};
firebase.initializeApp(config);
Vue.filter('duration', durationFilter);
Vue.filter('cap', capFilter);
Vue.filter('apos', aposFilter);
Vue.component('paginate', VuejsPaginate);
Vue.use(VueLodash);
// Vue.use(VueFire);
// Vue.mixin({
//   created() {
//     var spotifyApi = new SpotifyWebApi();
//     spotifyApi.setAccessToken(this.getHashParams().access_token);
//     spotifyApi.setRefreshToken(this.getHashParams().refresh_token);

//     spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
//       function (data) {
//         console.log("Artist albums", data.body);
//       },
//       function (err) {
//         console.error(err);
//       }
//     );
//   }, methods: {
//     getHashParams() {
//       var hashParams = {};
//       var e,
//         r = /([^&;=]+)=?([^&;]*)/g,
//         q = window.location.hash.substring(1);
//       while ((e = r.exec(q))) {
//         hashParams[e[1]] = decodeURIComponent(e[2]);
//       }
//       // console.log(hashParams.access_token);
//       // console.log(hashParams.refresh_token);
//       // console.log(hashParams);
//       return hashParams;
//     }
//   }
// })

firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
});