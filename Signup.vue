<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h3 class="grey-text center">Sign Up</h3>
      <div class="input-field">
        <label for="name">Username</label>
        <input type="text" name="name" id="name" v-model="name" />
      </div>
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
        <button class="btn orange darken-1">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "Signup",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      feedback: null,
    };
  },
  methods: {
    // Sign up new user with Firebase Auth (name/password)
    signup() {
      if (this.email && this.password && this.name) {
        this.feedback = null;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((cred) => {
            db.collection("users")
              .doc(cred.user.uid)
              .set({
                name: this.name,
              })
              .then(() => {
                this.$router.push({ name: "Chat" });
              });
          })
          .catch((err) => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "All fields are required";
      }
    },
  },
};
</script>

<style>
.signup {
  max-width: 450px;
  margin-top: 30px;
}

.signup .input-field input[type="email"]:focus {
  border-bottom: 1px solid #ff8a65;
  box-shadow: 0 1px 0 0 #ffccbc;
}
.signup .input-field input[type="password"]:focus {
  border-bottom: 1px solid #ff8a65;
  box-shadow: 0 1px 0 0 #ffccbc;
}

.signup .input-field input[type="text"]:focus {
  border-bottom: 1px solid #ff8a65;
  box-shadow: 0 1px 0 0 #ffccbc;
}
</style>