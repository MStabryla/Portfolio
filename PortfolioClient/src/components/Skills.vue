<script>
import Skill from './small/Skill.vue';



export default {
    name: 'Skills',
    components:{
        Skill
    },
    props: {
        
    },
    data(){
        return {
            skills: [{ name:'.NET'}, { name:'C#', tag:".NET" }, { name:'ASP.NET'}, { name:'SQL'}, { name:'Windows Server'}, { name: 'MS SQL'}, { name: 'JavaScript'}, { name: 'Vue.js'}, { name: 'Linux' }]
        }
    },
    computed:{
        skillTitle(){
            return this.lang === 'pl' ? "Umiejętności" : "Skills";
        },
        skillSubtitle(){
            return this.lang === 'pl' ? 
            "Kliknij na umiejętność, aby zobaczyć szczegóły" : 
            "Click on skill to see details";
        }
    },
    mounted(){ 

    }
}
</script>

<template>
    <section class="block main-block front-main-block" id="skills">
        <div class="container">
            <h1 class="front-section-title"><div class="skills-icon"></div>{{ this.skillTitle }}</h1>
            <div class="front-skills">
                <Skill v-for="skill in skills" v-bind:skill="skill"></Skill>
            </div>
            <h5 class="front-section-subtitle">{{ this.skillSubtitle }}</h5>
        </div>
    </section>
</template>

<style>
.front-skills{
    margin-top: 2em;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.skills-icon{
    mask-image: url(../assets/icons/skills.svg);
    mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    mask-position: center;
    width: calc(var(--head-icon-image-size) * var(--text-scale));
    height: calc(var(--head-icon-image-size) * var(--text-scale));
    background-color: var(--secondary-front-text-color);
    margin-right: calc(0.3em * var(--text-scale));
}
.front-section-subtitle{
    color: var(--secondary-front-text-color);
    text-align: center;
    font-size: calc(1.5em * var(--text-scale));
    width:100%;
    margin-top:1em;
}
@media (max-width: 794px) {
    .front-section-subtitle{
        font-size: calc(1em * var(--text-scale));
        margin-top:0.5em;
    }
}
</style>