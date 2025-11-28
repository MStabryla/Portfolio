<script>
import ExpData from '../../classes/ExpData.js';

export default {
    name: 'ExpPart',
    props: {
        experience: {
            type: ExpData,
            required: true
        },
    },
    data(){
        console.log(this.experience);
        return {
            
        }
    }
}
</script>

<template>
    <div class="experience">
        <h2 class="exp-name">{{ this.experience.ExperienceName }}</h2>
        <h2 class="exp-company">{{ this.experience.CompanyName }}</h2>
        <div class="exp-date">
            <span class="exp-start-date">{{ this.experience.startDate.toString() }}</span>
            <span class="exp-end-date">{{ this.experience.endDate.toString() }}</span>
        </div>
        <p class="exp-desc">{{ this.experience.ExperienceDesc }}</p>
    </div>
    
</template>

<style>


</style>