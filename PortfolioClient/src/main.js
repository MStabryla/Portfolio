import { createApp } from 'vue'
import './css/style.css'
import App from './App.vue'
import router from './router.js'

const main = createApp(App)
main.mixin({
    data() {
        return {
            lang: 'pl'
        }
    },
    created(){
        this.lang = this.$route.meta.lang ?? 'pl';
    },
    watch: {
        '$route'() {
            this.lang = this.$route.meta.lang ?? 'pl';
        }
    },
    computed:{
        isMobileMode(){
            return window.innerWidth < 794;
        }
    }
})
main.use(router)
main.mount('#app');