<template>
  <h1>{{ msg }}
    <input v-model="name">
    <button v-on:click="sayHello(name)">My name is {{ name }}</button>
  </h1>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: '',
      name:''
    }
  },
  methods:{
    sayHello(myName){
      fetch("/api/greeting?name="+myName)
          .then((response) => response.json())
          .then((data) => {
            this.msg = data.content
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
