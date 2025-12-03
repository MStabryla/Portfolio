<script>
import ExpData from '../classes/ExpData.js';
import ExpPart from './small/ExpPart.vue';
import axios from 'axios';

export default {
    name: 'WorkExperience',
    components: {
        ExpPart
    },
    props: {
        
    },
    data(){
        return {
           templateExperience: []
        }
    },
    watch:{
        
    },
    computed:{
        workExperienceTitle(){
            if(this.lang === 'pl'){
                return "Doświadczenie zawodowe";
            } else {
                return "Work Experience";
            }
        }
    },
    methods:{  
        async fetchExperience(){
            const tempExperience = await axios.get("/api/experience/work/" + this.lang);
            this.templateExperience = tempExperience.data.map(exp => new ExpData(
                exp.experienceName,
                exp.companyName,
                exp.experienceDesc,
                exp.startDate,
                exp.endDate,
                exp.photo,
                exp.companyLink
            ));
        }
    },
    mounted(){ 
        this.fetchExperience();
    }
}
</script>

<template>
    <section class="block main-block">
        <div class="container work-experience-block">
            <h1 class="section-title"><div src="../assets/icons/work-experience.svg" class="work-experience-icon"/>{{this.workExperienceTitle}}</h1>
            <div class="row" :class="{ 'left': i % 2 == 0, 'right': i % 2 !=  0 }" v-for="(experience,i) in this.templateExperience" :key="i">
                <ExpPart v-bind:experience="experience" >
                </ExpPart>
            </div>
            
        </div>
        
    </section>
</template>

<style>
.work-experience-block{
    color: var(--primary-text-color);
    font-family: var(--secondary-font-family);
    width:100%;
    display:block;
}
.work-experience-block .row{
    display:flex;
    margin:2em auto;
}
.work-experience-icon{
    mask-image: url(../assets/icons/work-experience.svg);
    mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    mask-position: center;
    width: calc(var(--head-icon-image-size) * var(--text-scale));
    height: calc(var(--head-icon-image-size) * var(--text-scale));
    background-color: var(--primary-text-color);
    margin-right: calc(0.3em * var(--text-scale));
}
.left{
    flex-direction: row;
}
.right{
    flex-direction: row-reverse;
}

@media (max-width: 794px) {
    .main-block{
        padding: 2em 0;
    }
    .section-title{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: calc(2em * var(--text-scale));
    }
    .work-experience-block .row{
        flex-direction: column-reverse;
    }
    .work-experience-icon{
        width: var(--head-icon-image-size);
        height: var(--head-icon-image-size);
        margin-bottom: 0.5em;
    }

}
</style>