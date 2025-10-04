<template>
  <Transition name="slide-up">
    <div
      v-if="visible"
      class="fixed bottom-6 right-6 max-w-md rounded-xl border-2 shadow-lg p-4 flex items-start gap-3 z-50"
      :class="getStyles()"
      role="alert"
      aria-live="polite"
    >
      <component :is="getIcon()" :size="20" />
      <p class="flex-1 font-medium">{{ message }}</p>
      <button
        @click="close"
        class="flex-shrink-0 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
        aria-label="Close notification"
      >
        <X :size="16" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-vue-next';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
});

const emit = defineEmits(['close']);

const visible = ref(true);

const close = () => {
  visible.value = false;
  setTimeout(() => emit('close'), 300);
};

const getIcon = () => {
  switch (props.type) {
    case 'success':
      return CheckCircle;
    case 'error':
      return AlertCircle;
    default:
      return Info;
  }
};

const getStyles = () => {
  switch (props.type) {
    case 'success':
      return 'bg-green-50 text-green-800 border-green-300';
    case 'error':
      return 'bg-red-50 text-red-800 border-red-300';
    default:
      return 'bg-blue-50 text-blue-800 border-blue-300';
  }
};

onMounted(() => {
  setTimeout(close, props.duration);
});
</script>

<style scoped>
.slide-up-enter-active {
  transition: all 0.3s ease-out;
}

.slide-up-leave-active {
  transition: all 0.3s ease-in;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
