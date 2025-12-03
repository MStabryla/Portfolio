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
           templateEducation: [],
           lang: 'pl'
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
            const tempEducation = await axios.get("/api/education/pl");
            console.log(tempEducation);
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
    <div class="block main-block">
        <div class="container education-block">
            <h1 class="section-title">{{this.educationTitle}}</h1>
            <div class="row" :class="{ 'left': i % 2 == 0, 'right': i % 2 !=  0 }" v-for="(education,i) in this.templateEducation" :key="i">
                <EduPart v-bind:education="education" >
                </EduPart>
            </div>
            
        </div>
        
    </div>
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
.left{
    flex-direction: row;
}
.right{
    flex-direction: row-reverse;
}
</style>