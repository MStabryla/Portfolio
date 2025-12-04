<script>
import AddExpData from '../classes/AddExpData';
import AddExpPart from './small/AddExpPart.vue';
import axios from 'axios';

export default {
    name: 'AdditionalExperience',
    components: {
        AddExpPart
    },
    props: {
        
    },
    data(){
        return {
           templateExperience: []
        }
    },
    watch:{
        '$route'() {
            this.fetchExperience();
        }
    },
    computed:{
        addExperienceTitle(){
            if(this.lang === 'pl'){
                return "Dodatkowa Aktywność";
            } else {
                return "Additional Experience";
            }
        }
    },
    methods:{  
        async fetchExperience(){
            const tempExperience = await axios.get("/api/experience/additional/" + this.lang);
            this.templateExperience = tempExperience.data.map(exp => new AddExpData(
                exp.experienceName,
                exp.organizationName,
                exp.experienceDesc,
                exp.startDate,
                exp.endDate,
                exp.photo
            ));
        }
    },
    mounted(){ 
        this.fetchExperience();
    }
}
</script>

<template>
    <section class="block main-block">
        <div class="container add-experience-block">
            <h1 class="section-title"><div class="add-experience-icon"></div>{{this.addExperienceTitle}}</h1>
            <div class="row" :class="{ 'left': i % 2 == 0, 'right': i % 2 !=  0 }" v-for="(experience,i) in this.templateExperience" :key="i">
                <AddExpPart v-bind:experience="experience" v-bind:align="i % 2 == 0 ? 'left' : 'right'" >
                </AddExpPart>
            </div>
        </div>
    </section>
</template>

<style>
.add-experience-block{
    color: var(--primary-text-color);
    font-family: var(--secondary-font-family);
    width:100%;
    display:block;
}
.add-experience-block .row{
    display:flex;
    margin:2em auto;
}
.add-experience-icon{
    mask-image: url(../assets/icons/add-experience.svg);
    mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    mask-position: center;
    width: calc(var(--head-icon-image-size) * var(--text-scale));
    height: calc(var(--head-icon-image-size) * var(--text-scale));
    background-color: var(--primary-text-color);
    margin-right: calc(0.3em * var(--text-scale));
}
.left{
    flex-direction: row;
}
.right{
    flex-direction: row-reverse;
}

@media (max-width: 794px) {
    .add-experience-block .row{
        flex-direction: column-reverse;
    }
}
</style>