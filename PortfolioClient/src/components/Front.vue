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
            skills: ['JavaScript', 'Vue.js', '.NET', 'Git', 'C#', 'ASP.NET', 'SQL' , 'MS SQL', 'Windows Server' ],
            ENMode: false
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

    }
}
</script>

<template>
    <section class="front-block">
        <div class="front-photo">
            <img src="../assets/main-photo.jpg" alt="My Photo" />
        </div>
        <div class="front-title">
            <h1>Mateusz Stabryła</h1>
        </div>
        <div class="front-desc">
            <p v-html="desc"></p>
        </div>
        <div class="front-skills">
            <Skill v-for="skill in skills" v-bind:skillname="skill"></Skill>
        </div>
        <Contact></Contact>
    </section>
</template>

<style>
.front-block {
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
    font-size: 8em;
}

.front-desc{
    margin:1em;
    color: var(--secondary-front-text-color);
    font-family: var(--secondary-font-family);
    font-size: 1.5em;
    font-style: italic;
    font-weight: 120;
}
.front-skills{
    margin-top: 2em;
}

</style>