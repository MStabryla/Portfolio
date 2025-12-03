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
    <div class="experience">
        <h2 class="exp-name">{{ this.experience.ExperienceName }}</h2>
        <div class="exp-second-info">
            <h3 v-if="this.experience.companyLink == null || this.experience.companyLink == '' || this.experience.companyLink == 'https://not-found.com/'" class="exp-company">{{ this.experience.CompanyName }}</h3>
            <h3 v-else class="exp-company"><a :href="this.experience.companyLink" target="_blank">{{ this.experience.CompanyName }}</a></h3>
            <div class="exp-date">
                <span class="exp-start-date">{{ this.expDate(this.experience.startDate) }}</span>&nbsp;&nbsp;-&nbsp;&nbsp;<span class="exp-end-date">{{ this.expDate(this.experience.endDate) }}</span>
            </div>
        </div>
        <p class="exp-desc" v-html="this.experience.ExperienceDesc"></p>
    </div>
    <div class="experience-photo">
        <img :src="this.expImagePath" alt=""/>
    </div>
</template>

<style>
.experience, .experience-photo{
    width:50%;
    padding: 1em 0;
}
.exp-name{
    text-align: center;
    font-size: calc(2em * var(--text-scale));
    margin-bottom: 1em;
}
.exp-second-info{
    margin-bottom: 0.5em;
}
.exp-company{
    text-align: left;
}
.exp-company a{
    color: var(--bs-link-color-rgb);
}
.exp-company a:hover{
    font-weight: 600;
}
.exp-company, .exp-date{
    width:50%;
    display:inline-flex;
}
.exp-date{
    margin-bottom: 0.5em;
    font-weight: 700;
    text-align: right;
    flex-wrap: nowrap;
    justify-content: flex-end;
}
.exp-date, .exp-company{
    font-size: calc(1.5em * var(--text-scale));
}
.exp-start-date, .exp-end-date{
    text-wrap-mode: nowrap;
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
    width:66%;
    max-width: var(--experience-image-size-width);
    max-height: var(--experience-image-size-height);
}
</style>