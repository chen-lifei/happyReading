<template>
    <div class="book-chapter-wrapper">
        
    </div>
</template>

<script setup lang="ts" name="BookChapter">
    import { ref, onMounted,  } from 'vue';

    const props = defineProps({
        id: {
            type: [String, Number],
            default: ''
        }
    });
</script>

<style lang="scss" scoped>
    .book-chapter-wrapper {}
</style>