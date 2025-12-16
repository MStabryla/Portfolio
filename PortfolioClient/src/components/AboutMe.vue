<script>
import DescPL from '../assets/text/desc-pl.txt?raw';
import DescEN from '../assets/text/desc-en.txt?raw';

export default {
    name: 'AboutMe',
    props: {
        
    },
    data(){
        return {
            
        }
    },
    computed:{
        desc() {
            return this.lang === 'pl' ? DescPL : DescEN;
        },
        title(){
            return this.lang === 'pl' ? 
                "O mnie" :
                "About me"
        }
    },
    mounted(){ 

    }
}
</script>

<template>
    <section class="block main-block front-main-block" id="about-me">
        <div class="container">
            <h1 class="front-section-title"><div class="about-icon"></div>{{this.title}}</h1>
            <p class="about-desc" v-html="desc">

            </p>
        </div>
    </section>
</template>

<style>
.about-desc{
    margin:1em;
    color: var(--secondary-front-text-color);
    font-family: var(--secondary-font-family);
    font-size: calc(1.5em * var(--text-scale));
    font-style: italic;
    font-weight: 120;
    text-align: justify;
}
.about-desc b{
    color: var(--secondary-blue-bg-color);
}
.about-icon{
    mask-image: url(../assets/icons/add-experience.svg);
    mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    mask-position: center;
    width: calc(var(--head-icon-image-size) * var(--text-scale));
    height: calc(var(--head-icon-image-size) * var(--text-scale));
    background-color: var(--secondary-front-text-color);
    margin-right: calc(0.3em * var(--text-scale));
}
.front-section-title{
    color: var(--secondary-front-text-color);
    font-family: var(--primary-font-family);

    width: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: calc(4em * var(--text-scale));
    margin-bottom: var(--header-space);
    text-transform: uppercase;
    text-decoration: underline;
    text-underline-offset: 0.1em;
}
</style>