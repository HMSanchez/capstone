<template>
    <div>
        <div class="content" id="add">
             <h1 class="content-head is-center">My Account</h1>
             <div v-if="newUser" class="pure-g is-center">
                 <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-2">
                     <h4>Username</h4> {{newUser.displayName}}
                 </div>
                <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-2">
                    <h4>Email</h4> {{newUser.email}}
                 </div>
             </div>
             <div v-if="newUser" class="pure-g">
                 <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1 is-center">
                     <ul class="menu">
            <div class="pure-g">
              <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
      <li><router-link :to="{name: 'AccountPlaylists'}"><h3 class="childLink">My Playlists</h3></router-link></li>
              </div>
              <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
      <li><router-link :to="{name: 'AccountFavorites'}"><h3 class="childLink">My Favorites</h3></router-link></li>
              </div>
              <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
      <li><router-link :to="{name: 'AccountTopFive'}"><h3 class="childLink">My Top Five</h3></router-link></li>
              </div>
            </div>
    </ul>
    <router-view></router-view>
                 </div>
             </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "AccountPage",
  data() {
    return {
      newUser: {}
    };
  },
  methods: {
    getAccountInfo() {
      var user = firebase.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;
      this.newUser = user;
      //   console.log(user);
      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
      }
    },
    updateName() {
      var userNow = firebase.auth().currentUser;
      console.log(userNow);
      userNow
        .updateProfile({
          displayName: this.newUser.name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(
          function() {
            var displayName = userNow.displayName;
            var photoURL = userNow.photoURL;
          },
          function(error) {}
        );
    }
  },
  created() {

    this.getAccountInfo();
  },
  updated() {
    this.getAccountInfo();
  }
};
</script>


<style scoped>
.menu{
  margin-top: 30px;
}
ul li {
  list-style: none;
}

a{
 text-decoration: aliceblue;
}
</style>
