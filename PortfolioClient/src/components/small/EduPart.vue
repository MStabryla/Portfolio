<script>
import EduData from '../../classes/EduData.js';
import { motion } from 'motion-v'

export default {
    name: 'EduPart',
    components: {
        'motion.div' : motion.div
    },
    props: {
        education: {
            type: EduData,
            required: true
        },
        align: {
            type:String,
            required: false
        }
    },
    computed:{
        eduImagePath() {
            return new URL("../../assets/photos/" + this.education.Photo, import.meta.url).href;
        },
        offSetMode() {
            if(this.isMobileMode)
                return 'mobileOffScreen'
            else if(this.align == 'left')
                return 'offScreenLeft'
            else
                return'offScreenRight'
        }
    },
    methods:{
        eduDate(date) {
            return date.toString();
        }
    },
    data(){
        
        return {
            imgVariants:{
                onScreen:{
                    opacity: 1,
                    x: 0
                },
                mobileOffScreen:{
                    opacity: 0.0,
                },
                offScreenLeft:{
                    opacity: 0.0,
                    x: 100
                },
                offScreenRight:{
                    opacity: 0.0,
                    x: -100
                },
            },
            imgTraintition: {
                type: 'ease',
                duration: 0.5
            }
        }
    }
}
</script>

<template>
    <div class="education">
        <h2 class="edu-title">{{ this.education.EducationTitle }}</h2>
        <div class="edu-second-info">
            <h3 v-if="this.education.SchoolLink == null || this.education.SchoolLink == '' || this.education.SchoolLink == 'https://not-found.com/'" class="edu-school">{{ this.education.School }}</h3>
            <h3 v-else class="edu-school"><a :href="this.education.SchoolLink" target="_blank">{{ this.education.School }}</a></h3>
            <div class="edu-date">
                <span class="edu-start-date">{{ this.eduDate(this.education.startDate) }}</span><span class="edu-end-date">{{ this.eduDate(this.education.endDate) }}</span>
            </div>
        </div>
        <p class="edu-desc" v-html="this.education.EducationDesc"></p>
    </div>
    <motion.div
        :initial="this.offSetMode"
        whileInView="onScreen"
        class="education-photo"
        :variants="this.imgVariants"
        :transition="this.imgTraintition"
        >
        <img :src="this.eduImagePath" alt=""/>
    </motion.div>
</template>

<style>
.education, .education-photo{
    width:50%;
    padding: 1em 0;
}
.edu-title{
    text-align: center;
    font-size: calc(2em * var(--text-scale));
    margin-bottom: 1em;
}
.edu-second-info{
    margin-bottom: 0.5em;
}
.edu-school{
    text-align: justify;
}
.edu-school a{
    color: var(--bs-link-color-rgb);
}
.edu-school a:hover{
    font-weight: 600;
}
.edu-date{
    margin-bottom: 0.5em;
    font-weight: 700;
    width:100%;
    display:flex;
    justify-content: space-between;
}
.edu-date, .edu-school{
    font-size: calc(1.5em * var(--text-scale));
}
.edu-start-date, .edu-end-date{
    text-wrap-mode: nowrap;
}
.edu-desc{
    text-align: justify;
    font-size: calc(1.2em * var(--text-scale));
}
.edu-desc a{
    color: var(--primary-blue-bg-color);
    font-weight: 600;
}
.education-photo{
    display:flex;
    justify-content: center;
    align-items: center;
}
.education-photo img{
    width:66%;
    max-width: var(--education-image-size-width);
    max-height: var(--education-image-size-height);
}

@media (max-width: 794px) {
    .education, .education-photo,.education-photo img{
        width:100%;
    }
}
</style>