<template>
  <div>
    <div class="content" id="add">
      <h2 class="content-head is-center">Register</h2>
      <div class="pure-g" id="main-content">
        <div class="l-box-lrg pure-u-1 pure-u-md-1-4">
          <form class="pure-form pure-form-stacked" v-on:submit.prevent="signUp">
            <fieldset>
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
            </fieldset>
          </form>
          <ul class="errors">
            <li v-show="newUser.name != '' &&!validation.name">Name cannot be empty.</li>
            <li v-show="newUser.email != '' &&!validation.email">Please provide a valid email address.</li>
          </ul>
        </div>
      </div>
    </div>
    <router-link
      class="pure-menu-link is-center login"
      :to="{name: 'LoginPage'}"
      exact
    >Already have an account?</router-link>
  </div>
</template>

<script>
import firebase from "firebase";
var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  name: "RegisterPage",
  data() {
    return {
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  methods: {
    addUser: function() {
      if (this.isValid) {
        // usersRef.push(this.newUser);
        this.newUser.name = "";
        this.newUser.email = "";
        this.newUser.password = "";

        //           this.$router.push({
        //     name: "ArtistDetails",
        //     params: {
        //       name: this.topTracks[0].artist.name
        //     }
        //   });
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
          //   console.log(user);
          //   user.user.displayName = this.newUser.name;
          //   if (this.isValid) {
          //     usersRef.push(this.newUser);
          this.newUser.email = "";
          this.newUser.password = "";
          //   }
          //   console.log("successfully registered");
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
      //   console.log(firebase.database().ref("userObjects"));
      //UserObjects
      firebase
        .database()
        .ref("userObjects/" + userId)
        .set({
          //   playlists: [{'playlistName': "one", 'songs': [{'name': 'Believer', 'artist': "Imagine Dragons", 'album': 'Believer'}, {'name': 'Landslide', 'artist': "Oh Wonder", 'album': 'Oh Wonder'} ]}],
          //   favorites: [{'name':'thunder', 'type':'track'},{'name':'Ultralife', 'type':'album'}],
          //   topfive: [{'name': 'aerosmith', 'type': 'artist'}]
        });
    },
    addFooter() {
      const div = document.createElement("div");
      div.className = "footer l-box is-center";
      div.innerHTML = "HSanchez";
      const parent = document.getElementById("add");
      document.getElementById("add").appendChild(div);
      // document.getElementById("menu-heading").innerHTML = "Register";
    }
  },
  computed: {
    validation: function() {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      };
    },
    isValid: function() {
      var validation = this.validation;
      return Object.keys(validation).every(function(key) {
        return validation[key];
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
#main-content {
  justify-content: center;
}
.errors {
  color: #f00;
}
input {
  color: #000;
}
.login:hover {
  color: #000;
}
</style>
