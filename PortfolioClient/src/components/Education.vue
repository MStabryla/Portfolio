<script>
import EduData from '../classes/EduData.js';
import EduPart from './small/EduPart.vue';
import axios from 'axios';

export default {
    name: 'Education',
    components: {
        EduPart
    },
    props: {
        
    },
    data(){
        return {
           templateEducation: []
        }
    },
    watch:{
        
    },
    computed:{
        educationTitle(){
            if(this.lang === 'pl'){
                return "Wykształcenie";
            } else {
                return "Education";
            }
        }
    },
    methods:{  
        async fetchEducation(){
            const tempEducation = await axios.get("/api/education/" + this.lang);
            this.templateEducation = tempEducation.data.map(exp => new EduData(
                exp.educationTitle,
                exp.school,
                exp.educationDesc,
                exp.startDate,
                exp.endDate,
                exp.photo,
                exp.schoolLink
            ));
        }
    },
    mounted(){ 
        this.fetchEducation();
    }
}
</script>

<template>
    <section class="block main-block">
        <div class="container education-block">
            <h1 class="section-title"><div class="education-icon"></div>{{this.educationTitle}}</h1>
            <div class="row" :class="{ 'left': i % 2 == 0, 'right': i % 2 !=  0 }" v-for="(education,i) in this.templateEducation" :key="i">
                <EduPart v-bind:education="education" v-bind:align="i % 2 == 0 ? 'left' : 'right'" >
                </EduPart>
            </div>
            
        </div>
        
    </section>
</template>

<style>
.education-block{
    color: var(--primary-text-color);
    font-family: var(--secondary-font-family);
    width:100%;
    display:block;
}
.education-block .row{
    display:flex;
    margin:2em auto;
}
.education-icon{
    mask-image: url(../assets/icons/education.svg);
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
    .education-block .row{
        flex-direction: column-reverse;
    }
}
</style>