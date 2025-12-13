<template>
  <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3 flex-1">
        <h3 class="text-sm font-medium text-red-800">
          {{ title }}
        </h3>
        <p class="mt-1 text-sm text-red-700">
          {{ error }}
        </p>
        <div v-if="showRetry" class="mt-3">
          <button
            @click="$emit('retry')"
            class="text-sm font-medium text-red-800 hover:text-red-900 underline"
          >
            Try again
          </button>
        </div>
      </div>
      <div v-if="dismissible" class="ml-auto pl-3">
        <button
          @click="$emit('dismiss')"
          class="text-red-400 hover:text-red-600"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: string | null;
  title?: string;
  dismissible?: boolean;
  showRetry?: boolean;
}

withDefaults(defineProps<Props>(), {
  error: null,
  title: 'Error',
  dismissible: false,
  showRetry: false,
});

defineEmits<{
  dismiss: [];
  retry: [];
}>();

const onRetry = () => {
  // Emit retry event
};
</script>

