<template>
  <div class="w-full bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
    <div class="relative w-full h-[500px] bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
      <div class="text-center p-8">
        <MapPin :size="64" class="text-orange-600 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-gray-900 mb-2">Map View</h3>
        <p class="text-gray-600 mb-4">
          Map integration ready. {{ facilities.length > 0 ? `Showing ${facilities.length} facilities` : 'No facilities to display' }}
        </p>
        <p v-if="center" class="text-sm text-gray-500">
          Center: {{ center[0].toFixed(4) }}, {{ center[1].toFixed(4) }}
        </p>
      </div>

      <div
        v-if="facilities.length > 0"
        class="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4 max-h-[200px] overflow-y-auto"
      >
        <h4 class="font-semibold text-gray-900 mb-3">Facilities</h4>
        <div class="space-y-2">
          <div
            v-for="facility in facilities"
            :key="facility.facility_id"
            class="flex items-start gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <MapPin :size="16" class="text-orange-600 flex-shrink-0 mt-1" />
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-sm text-gray-900">{{ facility.name }}</p>
              <p class="text-xs text-gray-600 truncate">{{ facility.address }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPin } from 'lucide-vue-next';

defineProps({
  facilities: {
    type: Array,
    default: () => []
  },
  center: {
    type: Array,
    default: null
  }
});
</script>
