<script>
import axios from 'axios';
import SearchPart from './small/SearchPart.vue';
import SearchResult from '../classes/SearchResult';

const api_url = '/api/search';

export default {
    name: 'SearchResult',
    components: {
        SearchPart
    },
    data(){
        return {
            searchData: [],
            searchTag: '',
            loaded: false
        }
    },
    methods:{
        async fetchSearch(){
            const searchUrl = api_url + (this.lang == 'en' ? '/en' : '') + '?search_tag=' + this.$route.query.t;
            const searchResult = await axios.get(encodeURI(searchUrl));
            this.searchData = searchResult.data.map(search => new SearchResult(search));
            this.loaded = true;
            console.log(this.searchData);
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
        searchTitle(){
            if(this.lang === 'pl'){
                return "Wyniki wyszukiwania dla: ";
            } else {
                return "Search results for: ";
            }
        }
    },
    mounted(){
        this.searchTag = this.$route.query.t;
        this.fetchSearch();
    }
}
</script>

<template>
    <section class="search-result">
        <div class="header-back">
            <section class="container">
                <a :href=" '/' + (this.lang == 'en' ? 'en' : '')"><div class="back-icon"></div>{{ this.back }}</a>
                <span class="search-title">{{this.searchTitle}} <b>{{ this.searchTag }}</b></span>
        </section>
        </div>
    </section>
    <div class="search-container container">
        <div class="loading-row row" :style="{'display': !this.loaded ? 'flex' : 'none'}">
            <div class="loading"><img src="../assets/icons/loading.svg" alt="loading"/></div>
        </div>
        <div class="row" v-for="(sData, i) in this.searchData" :key="i" :class="{ 'left': i % 2 == 0, 'right': i % 2 !=  0 }">
            <SearchPart :search="sData" :align="i % 2 == 0 ? 'left' : 'right'"/>
        </div>
    </div>
</template>

<style>
.search-container{
    margin-top: 2em;
    margin-bottom: 5em;
    min-height: 100vh;
}
.search-title{
    font-size: calc(2em * var(--text-scale));
    display:inline-block;
    margin: 0 auto;
    color: var(--secondary-blue-bg-color);
    text-align: center;

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
    .search-container{
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