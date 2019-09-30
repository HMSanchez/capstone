<template>
  <div>
    <div class="content" id="add">
      <h2 class="content-head is-center">Login</h2>
      <div class="pure-g" id="main-content">
        <div class="l-box-lrg pure-u-1 pure-u-md-1-4">
          <form class="pure-form pure-form-stacked" v-on:submit.prevent="signIn">
            <fieldset>
              <input id="email" type="email" v-model="formData.email" placeholder="Your Email" />
              <input
                id="password"
                type="password"
                v-model="formData.password"
                placeholder="Your Password"
              />
              <button type="submit" class="pure-button">Log in</button>
            </fieldset>
          </form>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
    <router-link class="pure-menu-link is-center login" :to="{name: 'RegisterPage'}">Register Here</router-link>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "LoginPage",
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signIn() {
      console.log(this.formData.email, this.formData.password);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.formData.email, this.formData.password)
        .then(user => {
          //   console.log("successfully logged In");
          this.formData.email = "";
          this.formData.password = "";
          this.$router.replace("/");
          alert("Now Logged In");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(error);
        });
    }
  },

  created() {
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
#main-content {
  justify-content: center;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

input {
  color: #000;
}
.login:hover {
  color: #000;
}
</style>
