<script>
import ExpData from '../classes/ExpData.js';
import ExpPart from './small/ExpPart.vue';
import axios from 'axios';

export default {
    name: 'Front',
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
    methods:{  
        async fetchExperience(){
            const tempExperience = await axios.get("/api/experience/work");
            this.templateExperience = tempExperience.data.map(exp => new ExpData(
                exp.experienceName,
                exp.companyName,
                exp.experienceDesc,
                exp.startDate,
                exp.endDate
            ));
        }
    },
    mounted(){ 
        this.fetchExperience();
    }
}
</script>

<template>
    <div class="block main-block">
        <div class="container work-experience-block">
            <h1 class="section-title">Work Experience</h1>
            <div class="row" :class="{ 'left': i % 2 == 0, 'right': i % 2 !=  0 }" v-for="(experience,i) in this.templateExperience" :key="i">
                <ExpPart v-bind:experience="experience" >
                </ExpPart>
            </div>
            
        </div>
        
    </div>
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
    flex-direction: column;
}
.left{
    align-items: flex-start;
    text-align: left;
}
.right{
    align-items: flex-end;
    text-align: right;
}
</style>