<template>
  <div class="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
    <h2 class="text-xl font-bold text-gray-900 mb-4">Card Filter</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <label for="time-filter" class="block text-sm font-semibold text-gray-700 mb-2">
          Time Availability
        </label>
        <select
          id="time-filter"
          :value="filters.time"
          @change="updateFilter('time', Number($event.target.value))"
          class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="10">≤ 10 min</option>
          <option value="15">≤ 15 min</option>
          <option value="20">≤ 20 min</option>
          <option value="30">≤ 30 min</option>
          <option value="45">≤ 45 min</option>
          <option value="60">≤ 60 min</option>
          <option value="90">≤ 90 min</option>
          <option value="120">≤ 2 hours</option>
        </select>
      </div>

      <div>
        <label for="intensity-filter" class="block text-sm font-semibold text-gray-700 mb-2">
          Intensity
        </label>
        <select
          id="intensity-filter"
          :value="filters.intensity_level"
          @change="updateFilter('intensity_level', $event.target.value)"
          class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <label for="popularity-filter" class="block text-sm font-semibold text-gray-700 mb-2">
          Popularity
        </label>
        <select
          id="popularity-filter"
          :value="filters.age_group"
          @change="updateFilter('age_group', $event.target.value)"
          class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="total">Total (default)</option>
          <option value="15-24">Age 15-24</option>
          <option value="25-34">Age 25-34</option>
          <option value="35-44">Age 35-44</option>
          <option value="45-54">Age 45-54</option>
          <option value="55+">Age 55+</option>
        </select>
      </div>
    </div>

    <div>
      <label for="location-filter" class="block text-sm font-semibold text-gray-700 mb-2">
        Location (optional to change)
      </label>
      <div class="flex flex-col sm:flex-row gap-3">
        <input
          id="location-filter"
          type="text"
          :value="locationDisplay"
          @input="$emit('update-location', $event.target.value)"
          placeholder="e.g., 123 Collins St, Melbourne VIC"
          class="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          @click="$emit('use-my-location')"
          :disabled="loading"
          class="px-6 py-2.5 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          aria-label="Use my current location"
        >
          <MapPin :size="16" />
          <span class="whitespace-nowrap">Use My Location</span>
        </button>
        <button
          @click="$emit('refresh')"
          :disabled="loading"
          class="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          aria-label="Refresh recommendations"
        >
          <RefreshCw :size="16" :class="{ 'animate-spin': loading }" />
          <span>Refresh</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { MapPin, RefreshCw } from 'lucide-vue-next';

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update-filter', 'update-location', 'use-my-location', 'refresh']);

const locationDisplay = computed(() => {
  return `${props.filters.lat.toFixed(5)}, ${props.filters.lon.toFixed(5)}`;
});

const updateFilter = (key, value) => {
  emit('update-filter', { ...props.filters, [key]: value });
};
</script>
