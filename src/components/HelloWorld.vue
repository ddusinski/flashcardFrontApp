<template>
  <h2>
    Welcome to flashcard APP
    <br>Frontend written in vue.js
    <br>REST Backend written in SpringBoot
    <br>
    <br>
    <table>
      <tr>
        <td>
          <button v-on:click="drawFlashcard()">Draw flashcard</button>
          <br>

          {{ flashcardContent['originalWord'] }} (id={{ flashcardContent['id'] }})
          <div v-for="(answerValue) in flashcardContent['guessOptions']" :key="answerValue">
            <input type="radio" name="answer" v-bind:value=answerValue v-model="pickedAnswer"><label>{{
              answerValue
            }}</label>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <button v-on:click="checkAnswer(flashcardContent['id'], pickedAnswer)">Check answer</button>
          <br>
          Result: {{ flashcardResult }}
        </td>
      </tr>
      <tr>
        <td>
          <label>right answers count: {{ rightAnswerCount }} </label>
          <br>
          <label>wrong answers count: {{ wrongAnswerCount }} </label>
          <br>
          <button v-on:click="clearCounter()">Clear counter</button>
        </td>
      </tr>
      <tr>
        <td>
          Here you may check the flashcard:
          <br>
          <input v-model="flashCardId" placeholder="provide flashcard id">
          <br>
          <button v-on:click="fetchDict(flashCardId)">Check flashcard</button>
          <br>
          {{ msg }}
        </td>
      </tr>
    </table>
  </h2>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: '',
      name: '',
      flashCardId: '',
      flashcardContent: [],
      pickedAnswer: '',
      flashcardResult: false,
      rightAnswerCount: 0,
      wrongAnswerCount: 0
    }
  },
  methods: {
    fetchDict(myFlashcardId) {
      fetch("api/dict?id=" + myFlashcardId)
          .then((response) => response.text())
          .then((data) => {
            this.msg = data
          })
    },
    drawFlashcard() {
      this.pickedAnswer = '';
      fetch("api/draw")
          .then((response) => response.json())
          .then((data) => {
            this.flashcardContent = data
          })
    },
    async checkAnswer(flashcardId, answer) {
      if (answer) {
        await fetch("api/answer?questionId=" + flashcardId + "&flashcardAnswer=" + answer)
            .then((response) => response.text())
            .then((data) => {
              this.flashcardResult = (data === "true")
            })
        if (this.flashcardResult === true) {
          this.rightAnswerCount++
          this.drawFlashcard()
        } else {
          this.wrongAnswerCount++
        }
      }
    },
    clearCounter() {
      this.wrongAnswerCount = 0;
      this.rightAnswerCount = 0;
    }
  },
  mounted() {
    this.drawFlashcard()
  }
}
</script>
<style>
table, th, td {
  border: 3px solid black;
}
</style>
