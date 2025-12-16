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
            skills: [{ name:'.NET'}, { name:'C#', tag:".NET" }, { name:'ASP.NET'}, { name:'SQL'}, { name:'Windows Server'}, { name: 'MS SQL'}, { name: 'JavaScript'}, { name: 'Vue.js'}, { name: 'Linux' }],
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
        },
        subtitle(){
            return this.lang === 'pl' ?
                "Twój Programista (nie tylko) .NET" :
                "Your (not only) .NET Developer"
        },
        aboutMeTitle(){
            return this.lang === 'pl' ? 
                "O mnie" :
                "About me"
        },
        skillTitle(){
            return this.lang === 'pl' ? "Umiejętności" : "Skills";
        },
        workExperienceTitle(){
            return this.lang === 'pl' ?
                "Doświadczenie zawodowe" :
                "Work Experience";
        },
        repoTitle(){
            return this.lang === 'pl' ?
                "Repozytoria GitHub" :
                "GitHub Repositories"
        },
        educationTitle(){
            return this.lang === 'pl' ?
                "Wykształcenie" :
                "Education";
        },
        addExperienceTitle(){
            return this.lang === 'pl' ?
                "Aktywności Dodatkowe" :
                "Additional Activities";
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
                        <h3 class="front-subtitle">{{ this.subtitle }}</h3>
                    </div>
                    
                    <div class="front-menu">
                        <a href="#about-me"><div class="front-icon front-icon-aexp"></div>{{ this.aboutMeTitle }}</a>
                        <a href="#skills"><div class="front-icon front-icon-skills"></div>{{ this.skillTitle }}</a>
                        <a href="#work-experience"><div class="front-icon front-icon-wexp"></div>{{ this.workExperienceTitle }}</a>
                        <a href="#education"><div class="front-icon front-icon-edu"></div>{{ this.educationTitle }}</a>
                        <a href="#add-experience"><div class="front-icon front-icon-aexp"></div>{{ this.addExperienceTitle }}</a>
                        <a :href="this.lang === 'pl' ? 'repos' : '/en/repos'"><div class="front-icon front-icon-git"></div>{{ this.repoTitle }}</a>
                    </div>
                    
                </div>
                
            </div>
        </div>
        <div class="container" v-show="frontDisplayMode == 2">
            <div class="row">
                <div class="front-title col-12">
                    <h1>Mateusz Stabryła</h1>
                    <h3 class="front-subtitle">{{ this.subtitle }}</h3>
                </div>
                <div class="front-photo col-4">
                    <img src="../assets/main-photo.jpg" alt="My Photo" />
                </div>
                <div class="col" style="display: flex; flex-direction: column; justify-content: center;">
                    <div class="front-menu">
                        <a href="#about-me"><div class="front-icon front-icon-aexp"></div>{{ this.aboutMeTitle }}</a>
                        <a href="#skills"><div class="front-icon front-icon-skills"></div>{{ this.skillTitle }}</a>
                        <a href="#work-experience"><div class="front-icon front-icon-wexp"></div>{{ this.workExperienceTitle }}</a>
                        <a href="#education"><div class="front-icon front-icon-edu"></div>{{ this.educationTitle }}</a>
                        <a href="#add-experience"><div class="front-icon front-icon-aexp"></div>{{ this.addExperienceTitle }}</a>
                        <a :href="this.lang === 'pl' ? 'repos' : '/en/repos'"><div class="front-icon front-icon-git"></div>{{ this.repoTitle }}</a>
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
                    <h3 class="front-subtitle">{{ this.subtitle }}</h3>
                </div>
                <div class="front-menu">
                    <a href="#about-me"><div class="front-icon front-icon-aexp"></div>{{ this.aboutMeTitle }}</a>
                    <a href="#skills"><div class="front-icon front-icon-skills"></div>{{ this.skillTitle }}</a>
                    <a href="#work-experience"><div class="front-icon front-icon-wexp"></div>{{ this.workExperienceTitle }}</a>
                    <a href="#education"><div class="front-icon front-icon-edu"></div>{{ this.educationTitle }}</a>
                    <a href="#add-experience"><div class="front-icon front-icon-aexp"></div>{{ this.addExperienceTitle }}</a>
                    <a :href="this.lang === 'pl' ? 'repos' : '/en/repos'"><div class="front-icon front-icon-git"></div>{{ this.repoTitle }}</a>
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
    justify-content: center;
}
.front-photo img {
    width: calc(var(--image-scale)*var(--image-size-width));
    height: calc(var(--image-scale)*var(--image-size-height));
}

.front-title {
    margin:1em;
    text-wrap-mode: nowrap;
}
.front-title h1{
    color: var(--secondary-front-text-color);
    font-family: var(--primary-font-family);
    font-weight: 200;
    font-size: calc(5em * var(--text-scale));
    text-align: center;
}
.front-subtitle{
    color: var(--secondary-front-text-color);
    font-family: var(--primary-font-family);
    font-weight: 200;
    font-size: calc(2em * var(--text-scale));
    text-align: center;
}
.front-menu{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
}
.front-menu a{
    display: flex;
    font-size: calc(1.8em * var(--text-scale));
    margin: 0.4em auto;
}
.front-icon{
    mask-size: 100%;
    background-color: var(--link-text-color);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    mask-position: center;
    width: calc(1.8em * var(--text-scale));
    height: calc(1.8em * var(--text-scale));
    margin-right: 0.3em;
    display: inline-block;
    vertical-align: middle;
}
.front-icon-git{
    mask-image: url(../assets/icons/github.svg);
}
.front-icon-skills{
    mask-image: url(../assets/icons/skills.svg);
}
.front-icon-wexp{
    mask-image: url(../assets/icons/work-experience.svg);
}
.front-icon-edu{
    mask-image: url(../assets/icons/education.svg);
}
.front-icon-aexp{
    mask-image: url(../assets/icons/add-experience.svg);
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
        width: auto;
        height: 50vh;
    }
    .front-title{
        margin: 1em 0;
    }
    .front-title h1{
        text-align: center;
        margin-bottom: 0;
        max-width: calc(100vw - var(--bs-gutter-x));
        font-size: calc(4em * var(--text-scale));
        min-width: unset;
    }
    .front-subtitle{
        margin-top:0.5em;
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
        --image-scale: 0.32;
        --skill-text-scale: 0.4;
        --text-scale: 0.75;
    }
    .front-menu{
        margin-top: 1em;
    }
}

@media (min-width: 992px) {
    :root{
        --image-scale: 0.4;
        --skill-text-scale: 0.5;
        --text-scale: 0.75;
    }
    .front-menu{
        margin-top:3em;
    }
}

@media (min-width: 1068px) {
    :root{
        --image-scale: 0.42;
        --skill-text-scale: 0.6;
        --text-scale: 0.75;
    }
}

@media (min-width: 1200px) {
    :root{
        --image-scale: 0.47;
        --skill-text-scale: 0.8;
        --text-scale: 0.85;
    }
}

@media (min-width: 1400px) {
    :root{
        --image-scale: 0.55;
        --skill-text-scale: 1;
        --text-scale: 1;
    }
}

</style>