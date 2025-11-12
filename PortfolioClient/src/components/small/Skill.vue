<script>
export default {
    name: 'Skill',
    props: {
        skillname: {
            type: String,
            required: true
        },
    },
    data(){
        return {
            
        }
    }
}
</script>

<template>
    <div class="skill-con">
        <div class="skill">
        <span class="skill-name">{{ skillname }}</span>
        
        </div>
        <div class="skill-shadow"></div>
    </div>
    
</template>

<style>
.skill, .skill-shadow {
    padding: 0.3em 1em;
    margin: 0.5em;
    background-color: var(--secondary-blue-bg-color);
    border-radius: 3em;
}

.skill-con {
    display: inline-block;
    position: relative;
}
.skill {
    position:relative;
    display: inline-block;
    background-color: var(--secondary-blue-bg-color);
    z-index:2;
}

.skill-shadow {
    display: inline-block;
    background-color: #07070748;

    position: absolute;
    width:calc(100% - 4em);
    height:calc(100% - 2em);
    top: 0.3em;
    left: 0.2em;
    z-index: 1;
}

.skill-name {
    color: var(--primary-text-color);
    font-family: var(--secondary-font-family);
    font-weight: 600;
    font-size: calc(2em * var(--skill-text-scale));
    text-align: center;
    padding: auto auto;
}

@media (min-width: 794px) {

    .skill, .skill-shadow {
        padding: 0.3em 0.8em;
        margin: 0.3em;
    }
}

@media (min-width: 992px) {
    .skill, .skill-shadow {
        padding: 0.3em 1.0em;
    }
    .skill-name {
        font-weight: 100;
    }
}

@media (min-width: 1068px) {
    .skill, .skill-shadow {
        padding: 0.5em 1.5em;
    }
    
}

/* @media (min-width: 1200px) {
    .skill, .skill-shadow {
        padding: 0.5em 1.5em;
    }
}

@media (min-width: 1400px) {
    .skill, .skill-shadow {
        padding: 0.5em 1.5em;
    }
} */

</style>