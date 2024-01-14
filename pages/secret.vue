<script setup lang="ts">
definePageMeta({
  middleware: ['secret']
})



</script>
<template>
  <div class="w-screen h-screen flex items-center justify-center flex-col bg-green-500">
    <h1 class="text-4xl">  Super secret very important auth page.</h1>
    <p class="w-2/3 text-justify">Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</p>
    <NuxtLink class="text-right w-2/3 cursor-pointer" to="/">{{ "< Back" }}</NuxtLink>
  </div>
</template>
