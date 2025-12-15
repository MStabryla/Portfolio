<script>

import { motion } from 'motion-v'
import SearchResult from '../../classes/SearchResult';
import Skill from './Skill.vue';

export default {
    name: 'SearchPart',
    components: {
        'motion.div' : motion.div,
        'motion.p': motion.p,
        Skill
    },
    props: {
        search: {
            type: SearchResult,
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
        },
        searchImgPath(){
            if(this.search.Type != "Repository")
                return new URL("../../assets/photos/" + this.search.ImgPath, import.meta.url).href;
            else
                return this.search.ImgPath;
        },
        icon(){
            switch(this.search.Type){
                case 'Repository':
                    return 1
                case 'WorkExperience':
                    return 2
                case 'Education':
                    return 3
                case 'AddExperience':
                    return 4
                default:
                    return 0
            }
        },
        iconType(){
            switch(this.search.Type){
                case 'Repository':
                    return this.lang == 'pl' ? 'Repozytorium' : 'Repository';
                case 'WorkExperience':
                    return this.lang == 'pl' ? 'Doświadczenie Zawodowe' : 'Work Experience';
                case 'Education':
                    return this.lang == 'pl' ? 'Wykształcenie' : 'Education';
                case 'AddExperience':
                    return this.lang == 'pl' ? 'Dodatkowe Doświadczenie' : 'Additional Experience';
                default:
                    return '';
            }
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
            expanded: false,
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
            imgTransition: {
                type: 'ease',
                duration: 0.5
            },
            descTransition:{
                type: 'ease',
                duration: 1.0
            },
            descVariants: {
                expanded:{
                    maxHeight: '500px',
                    display: 'block'
                },
                notExpanded: {
                    maxHeight: '0px',
                    display: 'none'
                }
            }
        }
    },
    mounted(){
    }
}
</script>

<template>
    <div class="search">
        <h2 class="search-name">{{ this.search.Name }}</h2>
        
        <div class="search-second-data">
            <h5 class="search-link">
                <div class="search-icon search-icon-git" v-if="this.icon == 1"></div>
                <div class="search-icon search-icon-wexp" v-else-if="this.icon == 2"></div>
                <div class="search-icon search-icon-edu" v-else-if="this.icon == 3"></div>
                <div class="search-icon search-icon-aexp" v-else></div>
                {{ this.iconType }}
            </h5>
        </div>
        <!-- <p>...</p>
        <p class="exp-desc" v-html="this.search.impDesc"></p>
        <p>...</p> -->
        <details class="exp-desc">
            <summary @click="() => { this.expanded = !this.expanded; }" :style="{ display: this.expanded ? 'none' : 'default' }">
                ...<br/>
                <span v-html="this.search.impDesc"></span>
                <br/>...
            </summary>
            <motion.p 
                :variants="this.descVariants"
                :animate="this.expanded ? 'expanded' : 'notExpanded'"
                :transition="this.descTransition"
                v-html="this.search.Desc"
                layout>

            </motion.p>
        </details>
    </div>
    <motion.div
        :initial="this.offSetMode"
        whileInView="onScreen"
        class="search-photo"
        :variants="this.imgVariants"
        :transition="this.imgTransition"
        >
        <img :src="this.searchImgPath" :alt="this.searchImgPath"/>
    </motion.div>
    
    
</template>

<style>
.search, .search-photo{
    width:50%;
    padding: 1em 0;
    color: var(--primary-blue-bg-color);
}
.search-name{
    text-align: center;
    font-weight: 600;
    font-size: calc(2em * var(--text-scale));
    margin-bottom: 1em;
}
.search-second-data{
    display: flex;
    justify-content: space-between;
}
.search-link{
    text-align: left;
}
.search-link a{
    color: var(--bs-link-color-rgb);
}
.search-icon{
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
.search-icon-git{
    mask-image: url(../../assets/icons/github.svg);
}
.search-icon-wexp{
    mask-image: url(../../assets/icons/work-experience.svg);
}
.search-icon-edu{
    mask-image: url(../../assets/icons/education.svg);
}
.search-icon-aexp{
    mask-image: url(../../assets/icons/add-experience.svg);
}   
.search-company a:hover{
    font-weight: 600;
}
.search-link, .search-update-date{
    width:50%;
    display:inline-flex;
}
.search-update-date{
    margin-bottom: 0.5em;
    font-weight: 700;
    text-align: right;
    flex-wrap: nowrap;
    justify-content: flex-end;
}
.search-update-date, .search-link{
    font-size: calc(1.5em * var(--text-scale));
}
.search-tags{
    margin-top: 1em;
    margin-bottom: 1em;
}
.search-desc{
    text-align: justify;
    font-size: calc(1.2em * var(--text-scale));
}
.search-desc a{
    color: var(--primary-blue-bg-color);
    font-weight: 600;
}
.search-photo{
    display:flex;
    justify-content: center;
    align-items: center;
}
.search-photo img{
    width:80%;
    max-width: var(--experience-image-size-width);
    max-height: var(--experience-image-size-height);
}
.search_tag{
    background-color: var(--primary-blue-bg-color);
    color: var(--secondary-blue-bg-color);
}
.big-b{
    margin: 0.2em 0;
    display: inline-block;
}

.exp-desc p{
    overflow: hidden
}
.exp-desc summary{
    display:block;
}
@media (max-width: 794px) {
    .search, .search-photo, .search-photo img{
        width:100%;
    }
    .search-name{
        margin-bottom: 0.5em;
        font-size: calc(2.5em * var(--text-scale));
    }
    .search-update-date, .search-link{
        width:100%;
        margin-bottom: 1em;
    }
    .search-update-date{
        display: inline-flex;
        justify-content: flex-end;
    }
    .search-update-date a{
        width:100%;
        text-align: center;
    }
}
</style>