<script setup>
import Front from './Front.vue';
import WorkExperience from './WorkExperience.vue';
import Education from './Education.vue';
import AddExperience from './AddExperience.vue';
import Contact from './Contact.vue';
import LangButton from './small/LangButton.vue';
import AboutMe from './AboutMe.vue';
import Skills from './Skills.vue';

</script>

<template>
  <div class="main">
    <LangButton/>
    <Front/>
    <AboutMe/>
    <Skills/>
    <WorkExperience/>
    <Education/>
    <AddExperience/>
    <Contact/>
  </div>
</template>

<style scoped>

</style>
