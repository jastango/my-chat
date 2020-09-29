<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h3 class="grey-text center">Login</h3>
      <div class="input-field">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="email" />
      </div>
      <div class="input-field">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="input-field center">
        <button class="btn orange darken-1">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
    };
  },
  methods: {
    // Login with Firebase Auth (name/password)
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((cred) => {
            this.$router.push({ name: "Chat" });
          })
          .catch((err) => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "Both fields are required";
      }
    },
  },
};
</script>


<style>
.login {
  max-width: 450px;
  margin-top: 30px;
}

.login .input-field input[type="email"]:focus {
  border-bottom: 1px solid #ff8a65;
  box-shadow: 0 1px 0 0 #ffccbc;
}
.login .input-field input[type="password"]:focus {
  border-bottom: 1px solid #ff8a65;
  box-shadow: 0 1px 0 0 #ffccbc;
}
</style>