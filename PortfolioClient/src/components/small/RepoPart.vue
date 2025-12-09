<script>

import { motion } from 'motion-v'
import RepoData from '../../classes/RepoData';
import Skill from './Skill.vue';

export default {
    name: 'RepoPart',
    components: {
        'motion.div' : motion.div,
        Skill
    },
    props: {
        repo: {
            type: RepoData,
            required: true
        },
        align: {
            type:String,
            required: false
        }
    },
    computed:{
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
    },
    mounted(){
    }
}
</script>

<template>
    <div class="repo">
        <h2 class="repo-name">{{ this.repo.Name }}</h2>
        
        <div class="repo-second-data">
            <h5 class="repo-link"><div class="repo-icon"></div><a :href="this.repo.Url" target="_blank">GitHub</a></h5>
            <span class="repo-update-date">{{ this.repo.Created_at }}</span>
        </div>
        <div class="repo-tags">
            <Skill v-for="(tag, i) in this.repo.Tags" :key="i" v-bind:skillname="tag" />
        </div>
        <p class="exp-desc" v-html="this.repo.desc"></p>
    </div>
    <motion.div
        :initial="this.offSetMode"
        whileInView="onScreen"
        class="repo-photo"
        :variants="this.imgVariants"
        :transition="this.imgTraintition"
        >
        <img :src="this.repo.Img_url" alt="main.png"/>
    </motion.div>
    
    
</template>

<style>
.repo, .repo-photo{
    width:50%;
    padding: 1em 0;
    color: var(--primary-blue-bg-color);
}
.repo-name{
    text-align: center;
    font-weight: 600;
    font-size: calc(2em * var(--text-scale));
    margin-bottom: 1em;
}
.repo-second-data{
    display: flex;
    justify-content: space-between;
}
.repo-link{
    text-align: left;
}
.repo-link a{
    color: var(--bs-link-color-rgb);
}
.repo-icon{
    mask-image: url(../../assets/icons/github.svg);
    mask-size: 100%;
    background-color: var(--primary-text-color);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    mask-position: center;
    width: calc(1.5em * var(--text-scale));
    height: calc(1.5em * var(--text-scale));
    margin-right: 0.3em;
    display: inline-block;
    vertical-align: middle;
}
.repo-company a:hover{
    font-weight: 600;
}
.repo-link, .repo-update-date{
    width:50%;
    display:inline-flex;
}
.repo-update-date{
    margin-bottom: 0.5em;
    font-weight: 700;
    text-align: right;
    flex-wrap: nowrap;
    justify-content: flex-end;
}
.repo-update-date, .repo-link{
    font-size: calc(1.5em * var(--text-scale));
}
.repo-tags{
    margin-top: 1em;
    margin-bottom: 1em;
}
.repo-desc{
    text-align: justify;
    font-size: calc(1.2em * var(--text-scale));
}
.repo-desc a{
    color: var(--primary-blue-bg-color);
    font-weight: 600;
}
.repo-photo{
    display:flex;
    justify-content: center;
    align-items: center;
}
.repo-photo img{
    width:80%;
    max-width: var(--experience-image-size-width);
    max-height: var(--experience-image-size-height);
}
.skill-name{
    font-size: calc(1.2em * var(--text-scale));
}
.skill{
    padding: 0.3em 0.8em;
    margin: 0.2em;
}
.skill-shadow{
    display:none;
}
.big-b{
    margin: 0.2em 0;
    display: inline-block;
}
@media (max-width: 794px) {
    .repo, .repo-photo, .repo-photo img{
        width:100%;
    }
    .repo-name{
        margin-bottom: 0.5em;
        font-size: calc(2.5em * var(--text-scale));
    }
    .repo-update-date, .repo-link{
        width:100%;
        margin-bottom: 1em;
    }
    .repo-update-date{
        display: inline-flex;
        justify-content: flex-end;
    }
    .repo-update-date a{
        width:100%;
        text-align: center;
    }
}
@media (min-width: 768px) {

}
@media (min-width: 992px) {

}
</style>