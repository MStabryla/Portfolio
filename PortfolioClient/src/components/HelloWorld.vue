<script>
import { ref } from 'vue'

// defineProps({
//   msg: String,
// })

const count = ref(0)

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      count: 0,
      prevMessage: this.msg
    }
  },
  watch:{
    calculatedVariable(newVal, oldVal){
      console.log(`DEBUG: calculatedVariable ${oldVal} -> ${newVal}`)
    }
  },
  computed:{
    calculatedVariable(){
      const time = new Date()
      return this.count + time.getSeconds();
    }
  },
  methods:{
    methodToExecute(){
      setInterval(() => {
        this.count = this.calculatedVariable;
      }, 1000);
    }
  },
  
  mounted(){
    //this.methodToExecute();
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="calculatedVariable = calculatedVariable">count is {{ calculatedVariable }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
