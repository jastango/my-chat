<template>
  <div class="chat container">
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="(message, index) in messages" :key="index">
            <span class="deep-purple-text text-lighten-2"
              >{{ message.name }}:
            </span>
            <span class="grey-text text-darken-3">{{ message.content }}</span>
            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage />
      </div>
    </div>
    <div class="input-field center clear-chat">
      <button @click="clearChat" class="btn amber">Clear Chat</button>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase, { firestore } from "firebase";
import moment from "moment";
import NewMessage from "@/components/NewMessage";
export default {
  name: "Chat",
  data() {
    return { messages: [], docs: [] };
  },
  components: {
    NewMessage,
  },
  methods: {
    // Clears the chat window, and marks messages in to not be displayed for
    // future sessions
    clearChat() {
      this.docs.forEach((doc) => {
        db.collection("messages")
          .doc(doc)
          .update({
            deletedBy: firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.uid
            ),
          });
      });
      this.messages = [];
    },
  },
  created() {
    let ref = db.collection("messages").orderBy("timestamp");

    // When chat component is created, fetches all messages, but only pushes messages not cleared by user
    // Listens for new messages
    // New users will see entire message archive until cleared
    ref.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          let doc = change.doc;
          if (!doc.data().deletedBy.includes(firebase.auth().currentUser.uid)) {
            this.messages.push({
              content: doc.data().content,
              name: doc.data().name,
              timestamp: moment(doc.data().timestamp).format("lll"),
            });
            this.docs.push(doc.id);
          }
        }
      });
    });
  },
};
</script>

<style>
.chat .card {
  margin-top: 30px;
}

.chat span {
  font-size: 1.5em;
}

.chat .time {
  display: block;
  font-size: 0.75em;
}

.chat .messages {
  max-height: 400px;
  overflow: auto;
}

.messages::-webkit-scrollbar {
  width: 3px;
}

.messages::-webkit-scrollbar-track {
  background: #ddd;
}

.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}

.chat li {
  padding: 10px 0;
  border-bottom: 1px solid #f2f2f2;
}

.chat .clear-chat {
  margin-top: 20px;
}
</style>