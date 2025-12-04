<script>
import ExpData from '../../classes/ExpData.js';
import { motion } from 'motion-v'

export default {
    name: 'ExpPart',
    components: {
        'motion.div' : motion.div
    },
    props: {
        experience: {
            type: ExpData,
            required: true
        },
        align: {
            type:String,
            required: false
        }
    },
    computed:{
        expImagePath() {
            return new URL("../../assets/photos/" + this.experience.Photo, import.meta.url).href;
        },
        offSetMode() {
            if(this.align == 'left')
                return 'offScreenLeft'
            else
                return'offScreenRight'
        }
    },
    methods:{
        expDate(date) {
            return date.toString();
        }
    },
    data(){
        return {
            visible: false,
            imgVariants:{
                onScreen:{
                    opacity: 1,
                    x: 0
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
    <div class="experience">
        <h2 class="exp-name">{{ this.experience.ExperienceName }}</h2>
        <div class="exp-second-info">
            <h3 v-if="this.experience.companyLink == null || this.experience.companyLink == '' || this.experience.companyLink == 'https://not-found.com/'" class="exp-company">{{ this.experience.CompanyName }}</h3>
            <h3 v-else class="exp-company"><a :href="this.experience.companyLink" target="_blank">{{ this.experience.CompanyName }}</a></h3>
            <div class="exp-date">
                <span class="exp-start-date">{{ this.expDate(this.experience.startDate) }}</span>
                <span class="exp-date-dash-normal">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                <span class="exp-date-dash-small">&nbsp;-&nbsp;</span>
                <span class="exp-end-date">{{ this.expDate(this.experience.endDate) }}</span>
            </div>
        </div>
        <p class="exp-desc" v-html="this.experience.ExperienceDesc"></p>
    </div>
    <motion.div
        :initial="this.offSetMode"
        whileInView="onScreen"
        class="experience-photo"
        :variants="this.imgVariants"
        :transition="this.imgTraintition"
        >
        <img :src="this.expImagePath" alt=""/>
    </motion.div>
    
    
</template>

<style>
.experience, .experience-photo{
    width:50%;
    padding: 1em 0;
}
.exp-name{
    text-align: center;
    font-weight: 600;
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
    width:80%;
    max-width: var(--experience-image-size-width);
    max-height: var(--experience-image-size-height);
}

@media (max-width: 794px) {
    .experience, .experience-photo, .experience-photo img{
        width:100%;
    }
    .exp-second-info{
        display:flex;
        flex-direction: column;
        margin-bottom: 0;
    }
    .exp-name{
        margin-bottom: 0.5em;
        font-size: calc(2.5em * var(--text-scale));
    }
    .exp-date, .exp-company{
        width:100%;
        margin-bottom: 1em;
    }
    .exp-date{
        display:flex;
        justify-content: space-between;
    }
    .exp-company a{
        width:100%;
        text-align: center;
    }
    .exp-date-dash-normal{
        display:none;
    }
}
@media (min-width: 768px) {
    .exp-date-dash-small{
        display:inline;
    }
    .exp-date-dash-normal{
        display:none;
    }
}
@media (min-width: 992px) {
    .exp-date-dash-normal{
        display:inline;
    }
    .exp-date-dash-small{
        display:none;
    }
}
</style>