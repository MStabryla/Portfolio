<script>
export default {
    name: 'LangButton',
    props: {

    },
    data(){
        return {
        }
    },
    methods:{
        switchLang(){
            console.log(this.$router);
            if(this.lang === 'pl')
                this.$router.push("/en");
            else
                this.$router.push("/");
            this.$root.$forceUpdate();
        }
    },
    computed:{
        langImagePath(){
            return new URL('../../assets/icons/' + (this.lang == 'pl' ? 'en' : 'pl') + ".png", import.meta.url).href;
        }
    }
}
</script>

<template>
    <div class="lang-button" v-on:click="switchLang">
        <img :src="langImagePath" alt="lang" />
    </div>
</template>

<style>
.lang-button{
    position:fixed;
    width: calc(0.75 * var(--head-icon-image-size) * var(--text-scale));
    height: calc(0.75 * var(--head-icon-image-size) * var(--text-scale));
    top: 1vh; left: 1vw;
    cursor: pointer;
}
.lang-button img{
    width:100%;
    height:100%;
    opacity: 50%;
}
.lang-button:hover img{
    animation-name: langHovered;
    animation-duration: 0.5s;
    opacity: 100%;
}

.lang-button:not(:hover) img{
    animation-name: langUnhovered;
    animation-duration: 0.5s;
}

@keyframes langHovered {
  from {
    opacity: 50%;
  }
  to {
    opacity: 100%;
  }
}
@keyframes langUnhovered {
  from {
    opacity: 100%;
  }
  to {
    opacity: 50%;
  }
}
</style>