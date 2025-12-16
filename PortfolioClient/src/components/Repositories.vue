<script>
import axios from 'axios';
import RepoData from '../classes/RepoData';
import RepoPart from './small/RepoPart.vue';

const repo_api_url = '/api/github/repos';

export default {
    name: 'Repositories',
    components: {
        RepoPart
    },
    data(){
        return {
            repos: [],
            loaded: false
        }
    },
    methods:{
      async fetchRepos(){
            const tempRepos = await axios.get(repo_api_url + (this.lang == 'en' ? '/en' : ''));
            this.repos = tempRepos.data.map(repo => new RepoData(repo));
            this.loaded = true;
        }
    },
    watch:{
    },
    computed:{
        back(){
            if(this.lang === 'pl')
                return 'Wróc';
            else
                return 'Back';
        },
        repoTitle(){
            if(this.lang === 'pl'){
                return "Repozytoria GitHub";
            } else {
                return "GitHub Repositories";
            }
        },
        seeMore(){
            if(this.lang === 'pl'){
                return "Zobacz więcej na moim GitHubie";
            } else {
                return "See more on my <a href=''GitHub";
            }
        }
    },
    mounted(){
        this.fetchRepos();
    }
}
</script>

<template>
  <div class="repositories">
    <div class="header-back">
      <section class="container">
        <a :href=" '/' + (this.lang == 'en' ? 'en' : '')"><div class="back-icon"></div>{{ this.back }}</a>
      </section>
    </div>
    <div class="repo-container container">
      <h1 class="section-title"><div class="repositories-icon"></div>{{this.repoTitle}}</h1>
      <div class="loading-row row" :style="{'display': !this.loaded ? 'flex' : 'none'}"><div class="loading"><img src="../assets/icons/loading.svg" alt="loading"/></div></div>
      <div class="row" v-for="(repo, i) in this.repos" :key="i" :class="{ 'left': i % 2 == 0, 'right': i % 2 !=  0 }">
        <RepoPart :repo="repo" :align="i % 2 == 0 ? 'left' : 'right'"/>
      </div>
    </div>
  </div>
</template>

<style>
.header-back{
    width: 100%;
    height: 100px;
    background-color: var(--primary-blue-bg-color);
    padding-top:25px;
}
.header-back a{
    color: var(--secondary-blue-bg-color);
    font-size: calc(2em * var(--text-scale));
    text-decoration: none;
}
.section-title{
    color:var(--primary-text-color);
}
.repo-container{
    margin-top: 2em;
    margin-bottom: 5em;
    min-height: 100vh;
}
.repositories-icon{
    mask-image: url(../assets/icons/github.svg);
    mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    mask-position: center;
    display: inline-block;
    width: calc(var(--head-icon-image-size) * var(--text-scale));
    height: calc(var(--head-icon-image-size) * var(--text-scale));
    background-color: var(--primary-text-color);
    margin-right: calc(0.3em * var(--text-scale));
}
.back-icon{
    mask-image: url(../assets/icons/back.svg);
    mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    mask-position: center;
    width: calc(1.5em * var(--text-scale));
    height: calc(1.5em * var(--text-scale));
    background-color: var(--secondary-blue-bg-color);
    display: inline-block;
    vertical-align: sub;
    margin-right: 0.2em;
}
.loading{
    mask-image: url(../assets/icons/loading.svg);
    mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    mask-position: center;
    width: calc(var(--head-icon-image-size) * var(--text-scale));
    height: calc(var(--head-icon-image-size) * var(--text-scale));
    background-color: var(--primary-text-color);
    margin-right: calc(0.3em * var(--text-scale));
}
.loading-row{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2em;
    margin-bottom: 2em;
}
.repo-list{
    width: 90%;
    margin: 0 auto;
    display: block;
}
.left{
    flex-direction: row;
    width: 100%;
}
.right{
    flex-direction: row-reverse;
    width: 100%;
}
@media (max-width: 794px) {
    .repo-container{
        margin-top: 1em;
        margin-bottom: 2em;
    }
    .left, .right{
      display: flex;
      flex-direction: column-reverse;
      margin: 2em auto;
    }
}
@media (min-width: 1440px) {
    .back-icon{
        width: calc(1.2em * var(--text-scale));
        height: calc(1.2em * var(--text-scale));
    }
}
</style>
