<template>
  <h1>

    <!--    <input v-model="name">-->
    <!--    <button v-on:click="sayHello(name)">My name is {{ name }}</button>-->

    <input v-model="flashCardId">
    <button v-on:click="fetchDict(flashCardId)">choose flashcard</button>
    {{ msg }}

    <br>
    <br>
    <button v-on:click="drawFlashcard()">choose flashcard</button>
    <br>


    {{ flashcardContent['originalWord'] }}
    <div v-for="(value) in flashcardContent['guessOptions']" :key="value">
      <input type="radio" name="answer">{{ value }}
    </div>
    <br>
    <button>Check answer</button>

  </h1>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: '',
      name: '',
      flashCardId: '',
      flashcardContent: []
    }
  },
  methods: {
    sayHello(myName) {
      fetch("/api/greeting?name=" + myName)
          .then((response) => response.json())
          .then((data) => {
            this.msg = data.content
          })
    },
    fetchDict(myFlashcardId) {
      fetch("api/dict?id=" + myFlashcardId)
          .then((response) => response.text())
          .then((data) => {
            this.msg = data
          })
    },
    drawFlashcard() {
      fetch("api/draw")
          .then((response) => response.json())
          .then((data) => {
            this.flashcardContent = data
          })
    }
  },
  mounted() {
    fetch("/api/greeting")
        .then((response) => response.json())
        .then((data) => {
          this.msg = data.content
        })
  }

}
</script>
