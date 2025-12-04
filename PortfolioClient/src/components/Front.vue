<script>

import Skill from './small/Skill.vue';
import Contact from './Contact.vue';
import DescPL from '../assets/text/desc-pl.txt?raw';
import DescEN from '../assets/text/desc-en.txt?raw';

export default {
    name: 'Front',
    components: {
        Skill,
        Contact,
    },
    props: {
        
    },
    data(){
        return {
            skills: ['.NET Developer', 'C#', 'ASP.NET Developer', 'SQL', 'Windows Server', 'MS SQL', 'JavaScript', 'Vue.js' ],
            width: window.innerWidth,
            frontDisplayMode: 1,
            switchToMobileWidth: 794,
            switchToSmallWidth: 992
        }
    },
    watch:{
        width(){
            if(this.width > this.switchToSmallWidth)
                this.frontDisplayMode = 1;
            else if(this.switchToSmallWidth >= this.width && this.width > this.switchToMobileWidth)
                this.frontDisplayMode = 2;
            else if(this.switchToMobileWidth >= this.width)
                this.frontDisplayMode = 3;
        }
    },
    methods:{  
        initFrontDisplayMode(){
            this.width = window.innerWidth;
            if(this.width > this.switchToSmallWidth)
                this.frontDisplayMode = 1;
            else if(this.switchToSmallWidth >= this.width && this.width > this.switchToMobileWidth)
                this.frontDisplayMode = 2;
            else if(this.switchToMobileWidth >= this.width)
                this.frontDisplayMode = 3;
        }
    },
    computed:{
        desc() {
            return this.lang === 'pl' ? DescPL : DescEN;
        }
    },
    beforeMount() { 
        this.initFrontDisplayMode();
        window.addEventListener('resize', () => this.width = window.innerWidth);
    }
}
</script>

<template>
    <header class="block main-block front-main-block">
        <div class="container" v-show="frontDisplayMode == 1">
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
        </div>
        <div class="container" v-show="frontDisplayMode == 2">
            <div class="row">
                <div class="front-title col-12">
                    <h1>Mateusz Stabryła</h1>
                </div>
                <div class="front-photo col-4">
                    <img src="../assets/main-photo.jpg" alt="My Photo" />
                </div>
                <div class="col">
                    <div class="front-skills">
                        <Skill v-for="skill in skills" v-bind:skillname="skill"></Skill>
                    </div>
                    <div class="front-desc">
                        <p v-html="desc"></p>
                    </div>
                    
                </div>
                
            </div>
        </div>
        <div class="container" v-show="frontDisplayMode == 3">
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
        </div>
    </header>
</template>

<style>

.main-block {
    padding: 5em 0;
    display: flex;
    align-items: center;
}
.front-main-block {
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
.section-title{
    width:100%;
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: calc(4em * var(--text-scale));
    margin-bottom: var(--header-space);
    text-transform: uppercase;
    text-decoration: underline;
    text-underline-offset: 0.1em;
}


@media (max-width: 794px) {
    .front-main-block{
        padding: 2em 0;}
    .front-photo {
        margin: auto;
    }
    .front-photo img {
        width: 60vw;
        height: auto;
    }
    .front-title{
        margin: 1em 0;
    }
    .front-title h1{
        text-align: center;
        margin-bottom: 0;
        max-width: calc(100vw - var(--bs-gutter-x));
        font-size: calc(3em * var(--text-scale));
        min-width: unset;
    }
    .front-skills{
        margin-top: 0;
        max-width: calc(100vw - var(--bs-gutter-x));
    }
    .front-desc{
        max-width: calc(100vw - 1em - var(--bs-gutter-x));
    }
    :root{
        --text-scale: 0.7;
    }
    .section-title{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: calc(3em * var(--text-scale));
    }
}

@media (min-width: 794px) {
    :root{
        --image-scale: 0.3;
        --skill-text-scale: 0.4;
        --text-scale: 0.6;
    }
    .front-title h1{
        font-size: calc(5em * var(--text-scale));
    }

}

@media (min-width: 992px) {
    :root{
        --image-scale: 0.35;
        --skill-text-scale: 0.5;
        --text-scale: 0.75;
    }
}

@media (min-width: 1068px) {
    :root{
        --image-scale: 0.4;
        --skill-text-scale: 0.6;
        --text-scale: 0.75;
    }
}

@media (min-width: 1200px) {
    :root{
        --image-scale: 0.45;
        --skill-text-scale: 0.8;
        --text-scale: 0.85;
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