<script>
export default {
    name: 'Contact',
    props: {
        
    },
    data(){
        return {
        }
    },
    watch:{
        
    },
    methods:{  

    },
    computed:{
        contactTitle(){
            if(this.lang === 'pl'){
                return "Zainteresowany?";
            } else {
                return "Interested?";
            }
        },
        contactSubtitle(){
            if(this.lang === 'pl'){
                return "napisz lub zadzwoń";
            } else {
                return "call or send mail";
            }
        }
    },
    mounted(){ 

    }
}
</script>

<template>
    <footer class="block contact-main-block">
        <h2 class="contact-title">{{ this.contactTitle }}</h2>
        <h4 class="contact-subtitle">{{ this.contactSubtitle }}</h4>
        <div class="container contact-container">
            <a href="mailto:mateuszpiotrstabryla@gmail.com" class="contact-part">
                <img class="contact-icon" src="../assets/icons/mail.png" alt="contact-email"/>
                <span class="contact-part-title">mateuszpiotrstabryla@gmail.com</span>
            </a>
            <a href="tel:+48692503011" class="contact-part">
                <img class="contact-icon" src="../assets/icons/phone.png" alt="contact-phone"/>
                <span class="contact-part-title">+48 692 503 011</span>
            </a>
            <a href="https://github.com/MStabryla" class="contact-part" target="_blank">
                <img class="contact-icon" src="../assets/icons/github.png" alt="contact-github"/>
                <span class="contact-part-title">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/mateusz-stabry%C5%82a-946714142/" class="contact-part" target="_blank">
                <img class="contact-icon" src="../assets/icons/linkedin.png" alt="contact-linkedin"/>
                <span class="contact-part-title">LinkedIn</span>
            </a>
        </div>
    </footer>
</template>

<style>
.contact-main-block {
    padding: 3em 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--primary-blue-bg-color);
    color: var(--secondary-front-text-color);
    font-family: var(--primary-font-family);
    min-height: 50vh;
}
.contact-title{
    font-size: calc(5em * var(--text-scale));
}
.contact-subtitle{
    font-size: calc(3em * var(--text-scale));
    color: var(--link-text-color);
    padding-bottom: 1em;
}
.contact-container{
    display:flex;
}
.contact-part{
    display:flex;
    width: 50%;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    padding: 1em 0;
    text-underline-offset: 0.5em;
}
.contact-icon{
    width: calc(var(--image-scale)*var(--contact-icon-size));
    height: calc(var(--image-scale)*var(--contact-icon-size));
}
.contact-part-title{
    font-size: calc(2em * var(--text-scale));
    text-align: center;
    font-weight: 600;
    padding-top: 0.4em;
}

@media (max-width: 794px) {
    .contact-title{
        font-size: calc(3em * var(--text-scale));
    }
    .contact-subtitle{
        font-size: calc(2em * var(--text-scale));
    }
    .contact-container{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-content: center;
    }
    .contact-part{
        width: 100%;
    }
    .contact-part-title{
        font-size: calc(1.5em * var(--text-scale));
    }
}
</style>