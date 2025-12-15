<template>
  <div v-if="show" class="flex items-center justify-center p-8">
    <div class="flex flex-col items-center space-y-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p v-if="message" class="text-gray-600 text-sm">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show: boolean;
  message?: string;
}

withDefaults(defineProps<Props>(), {
  show: false,
  message: 'Loading...',
});
</script>




