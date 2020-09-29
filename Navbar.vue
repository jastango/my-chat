<template>
  <div class="navbar">
    <nav class="orange darken-4">
      <div class="container">
        <a class="left brand-logo">Chat Board</a>
        <ul class="right">
          <li v-if="user">
            <a>{{ this.name }}</a>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'Signup' }">Sign Up</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li v-if="user"><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "Navbar",
  data() {
    return { user: null, name: null };
  },
  methods: {
    // Logout current user
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Welcome" });
        });
    },
  },
  created() {
    // Get name of current user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then((doc) => {
            this.name = doc.data().name;
          });
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style>
</style>