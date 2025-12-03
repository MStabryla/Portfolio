<script>
import AddExpData from '../../classes/AddExpData.js';

export default {
    name: 'AddExpPart',
    props: {
        experience: {
            type: AddExpData,
            required: true
        },
    },
    computed:{
        expImagePath() {
            return new URL("../../assets/photos/" + this.experience.Photo, import.meta.url).href;
        }
    },
    methods:{
        expDate(date) {
            return date.toString();
        }
    },
    data(){
        return {
            
        }
    }
}
</script>

<template>
    <div class="add-experience">
        <h2 class="add-exp-name">{{ this.experience.ExperienceName }}</h2>
        <h3 class="add-exp-organization">{{ this.experience.OrganizationName }}</h3>
        <div class="add-exp-date">
            <span class="add-exp-start-date">{{ this.expDate(this.experience.startDate) }}</span><span class="add-exp-end-date">{{ this.expDate(this.experience.endDate) }}</span>
        </div>
        <p class="add-exp-desc" v-html="this.experience.ExperienceDesc"></p>
    </div>
    <div class="add-experience-photo">
        <img :src="this.expImagePath" alt=""/>
    </div>
</template>

<style>
.add-experience, .add-experience-photo{
    width:50%;
    padding: 1em 0;
}
.add-exp-name{
    text-align: center;
    font-size: calc(2em * var(--text-scale));
    margin-bottom: 1em;
}
.add-exp-organization{
    text-align: justify;
}
.add-exp-date{
    margin-bottom: 0.5em;
    font-weight: 700;
    width:100%;
    display:flex;
    justify-content: space-between;
}
.add-exp-date, .add-exp-organization{
    font-size: calc(1.5em * var(--text-scale));
}
.add-exp-start-date, .add-exp-end-date{
    text-wrap-mode: nowrap;
}
.add-exp-desc{
    text-align: justify;
    font-size: calc(1.2em * var(--text-scale));
}
.add-exp-desc a{
    color: var(--primary-blue-bg-color);
    font-weight: 600;
}
.add-experience-photo{
    display:flex;
    justify-content: center;
    align-items: center;
}
.add-experience-photo img{
    width:66%;
    max-width: var(--experience-image-size-width);
    max-height: var(--experience-image-size-height);
}
</style>