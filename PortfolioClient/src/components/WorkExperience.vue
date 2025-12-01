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
            console.log(tempExperience);
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
        <div class="container">
            <div class="row" v-for="(experience,i) in this.templateExperience" :key="i">
                <ExpPart v-bind:experience="experience" 
                :class="{ 'left': i % 2 == 0, 'right': i % 2 !=  0 }">
                </ExpPart>
            </div>
            
        </div>
        
    </div>
</template>

<style>

</style>