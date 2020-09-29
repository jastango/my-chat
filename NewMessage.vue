<template>
  <div class="message">
    <form @submit.prevent="addMessage">
      <div class="input-field">
        <label for="message">New Message</label>
        <input type="text" name="message" id="message" v-model="message" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "NewMessage",
  data() {
    return {
      message: null,
      feedback: null,
      name: null,
    };
  },
  created() {
    // Get Current User Name
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        this.name = doc.data().name;
      });
  },
  methods: {
    addMessage() {
      if (this.message) {
        this.feedback = null;
        db.collection("messages")
          .add({
            content: this.message,
            timestamp: Date.now(),
            name: this.name,
            deletedBy: [],
          })
          .catch((err) => {
            console.log(err);
          });

        this.message = null;
      } else {
        this.feedback = "No message entered";
      }
    },
  },
};
</script>

<style>
.message .input-field input[type="text"]:focus {
  border-bottom: 1px solid #ff8a65;
  box-shadow: 0 1px 0 0 #ffccbc;
}
</style>