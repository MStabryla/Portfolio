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
            -
            <span class="exp-end-date">{{ this.experience.endDate.toString() }}</span>
        </div>
        <p class="exp-desc" v-html="this.experience.ExperienceDesc"></p>
    </div>
    <div class="experience-photo">
        <img :src="'src/assets/photos/' + this.experience.Photo" alt=""/>
    </div>
</template>

<style>
.experience, .experience-photo{
    width:50%;
    padding: 1em 0;
}
.exp-name, .exp-company{
    font-size: calc(2em * var(--text-scale));
}
.exp-date{
    margin-bottom: 0.5em;
}
.exp-start-date, .exp-end-date{
    font-size: calc(1.5em * var(--text-scale));
    font-weight: 700;
}
.exp-company{
    margin: 0.5em 0;
}
.exp-desc{
    text-align: justify;
    font-size: calc(1.2em * var(--text-scale));
}
.exp-desc a{
    color: var(--primary-blue-bg-color);
    font-weight: 600;
}
.experience-photo{
    display:flex;
    justify-content: center;
    align-items: center;
}
.experience-photo img{
    height: 80%;
    max-width: var(--experience-image-size-width);
    max-height: var(--experience-image-size-height);
}
</style>