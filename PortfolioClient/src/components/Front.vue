<script>

import Skill from './small/Skill.vue';
import Contact from './Contact.vue';
import DescPL from '../assets/text/desc-pl.txt?raw';
import DescEN from '../assets/text/desc-en.txt?raw';

export default {
    name: 'Front',
    components: {
        Skill,
        Contact
    },
    props: {
        
    },
    data(){
        return {
            skills: ['.NET Developer', 'C#', 'ASP.NET Developer', 'SQL', 'Windows Server', 'MS SQL', 'JavaScript', 'Vue.js' ],
            ENMode: false,
            width: window.innerWidth,
            switchToMobileWidth: 794
        }
    },
    watch:{
        
    },
    methods:{  

    },
    computed:{
        desc() {
            return this.ENMode ? DescEN : DescPL;
        }
    },
    mounted(){ 
        window.addEventListener('resize', () => this.width = window.innerWidth);
    }
}
</script>

<template>
    <section class="front-main-block">
        <div class="container" v-show="width >= switchToMobileWidth">
            <div class="row">
                <div class="front-photo col-4">
                    <img src="../assets/main-photo.jpg" alt="My Photo" />
                </div>
                <div class="col">
                    <div class="front-title">
                        <h1>Mateusz Stabryła</h1>
                    </div>
                    <div class="front-skills">
                        <Skill v-for="skill in skills" v-bind:skillname="skill"></Skill>
                    </div>
                    <div class="front-desc">
                        <p v-html="desc"></p>
                    </div>
                    
                </div>
                
            </div>
            
            <Contact></Contact>
        </div>
        <div class="container" v-show="width < switchToMobileWidth">
            <div class="row front-photo">
                <img src="../assets/main-photo.jpg" alt="My Photo" />
            </div>
            <div class="row">
                <div class="front-title">
                    <h1>Mateusz Stabryła</h1>
                </div>
                <div class="front-skills">
                    <Skill v-for="skill in skills" v-bind:skillname="skill"></Skill>
                </div>
                <div class="front-desc">
                    <p v-html="desc"></p>
                </div>
                
            </div>
            <Contact></Contact>
        </div>
    </section>
</template>

<style>


.front-main-block {
    padding: 5em;
    background-color: var(--primary-blue-bg-color);
}
.front-photo {
    margin:1em;
}
.front-photo img {
    width: calc(var(--image-scale)*var(--image-size-width));
    height: calc(var(--image-scale)*var(--image-size-height));
}

.front-title{
    margin:1em;
}
.front-title h1{
    color: var(--secondary-front-text-color);
    font-family: var(--primary-font-family);
    font-weight: 200;
    font-size: calc(5.5em * var(--text-scale));
    text-align: center;
}
.front-desc{
    margin:1em;
    color: var(--secondary-front-text-color);
    font-family: var(--secondary-font-family);
    font-size: calc(1.5em * var(--text-scale));
    font-style: italic;
    font-weight: 120;
    text-align: justify;
}
.front-desc b{
    color: var(--secondary-blue-bg-color);
}
.front-skills{
    margin-top: 2em;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
@media (max-width: 794px) {
    .front-photo {
        margin: auto;
    }
    .front-photo img {
        max-width: calc(var(--image-scale)*var(--image-size-width));
    }
    .front-title h1{
        text-align: center;
        margin-bottom: 0;
        min-width: 480px;
    }
    .front-skills{
        margin-top: 0;
    }
    :root{
        --text-scale: 0.7;
    }
}

@media (min-width: 794px) {
    :root{
        --image-scale: 0.27;
        --skill-text-scale: 0.45;
        --text-scale: 0.5;
    }
    .front-title h1{
        font-size: calc(5em * var(--text-scale));
    }
}

@media (min-width: 992px) {
    :root{
        --image-scale: 0.35;
        --skill-text-scale: 0.5;
        --text-scale: 0.6;
    }
}

@media (min-width: 1068px) {
    :root{
        --image-scale: 0.4;
        --skill-text-scale: 0.6;
        --text-scale: 0.65;
    }
}

@media (min-width: 1200px) {
    :root{
        --image-scale: 0.45;
        --skill-text-scale: 0.8;
        --text-scale: 0.75;
    }
}

@media (min-width: 1400px) {
    :root{
        --image-scale: 0.5;
        --skill-text-scale: 1;
        --text-scale: 1;
    }
}

</style>