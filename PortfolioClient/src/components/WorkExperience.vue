<script>
import ExpData from '../classes/ExpData.js';
import ExpPart from './small/ExpPart.vue';

export default {
    name: 'Front',
    components: {
        ExpPart
    },
    props: {
        
    },
    data(){
        return {
           templateExperience: new ExpData("Junior SysOps / .NET Programmer", "Webedia Polska S.A.", "- Developing and maintaining the gry-online.pl website and\nsubpages written in .NET technologies (ASP, Visual Basic)\n- Developing web applications using JavaScript and the Vue.js\nplatform for internal and editorial use\n- Creating and implementing a tool using C#, Windows Forms and\nASP.NET Core with access to the REST API to communicate with\nexternal clients\n- Creating complex SQL queries within few applications. Managing\nand maintaining an MS SQL database\n- Implementation of SysOps and DevOps tools such as PRTG,\nBitbucket, Git, and DeployHQ\n- Administration of test and production environments based on\nWindows Server",new Date(2021, 8, 1), new Date(2025, 5, 30))
        }
    },
    watch:{
        
    },
    methods:{  

    },
    mounted(){ 

    }
}
</script>

<template>
    <div class="block">
        <ExpPart v-bind:experience="this.templateExperience"></ExpPart>
    </div>
</template>

<style>

</style>