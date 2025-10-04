<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-3xl font-bold">
              <span class="text-gray-900">Mel</span>
              <span class="text-orange-600">Move</span>
              <span class="text-amber-600">Now</span>
            </div>
          </div>
          <nav class="flex gap-4 items-center">
            <a
              href="#"
              class="text-gray-700 hover:text-orange-600 font-semibold transition-colors px-6 py-2"
            >
              Home
            </a>
            <a
              href="#map-section"
              class="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg"
            >
              Sport Recommendation
            </a>
          </nav>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="space-y-6">
        <section aria-label="Environmental conditions">
          <EnvironmentalBoxV2 v-if="showVersion === 2" :policy="envData" :loading="envLoading" :error="envError" />
          <EnvironmentalBoxV3 v-else-if="showVersion === 3" :policy="envDataV3" :loading="envLoading" :error="envError" />
          <EnvironmentalBoxV4 v-else :policy="envDataV4" :loading="envLoading" :error="envError" />

          <div class="mt-3 flex justify-center">
            <div class="inline-flex rounded-lg border border-gray-300 bg-white p-1">
              <button
                @click="showVersion = 2"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  showVersion === 2
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                Version 2
              </button>
              <button
                @click="showVersion = 3"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  showVersion === 3
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                Version 3
              </button>
              <button
                @click="showVersion = 4"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  showVersion === 4
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                Version 4
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>


  </div>
</template>

<script setup>
import { ref } from 'vue';
import EnvironmentalBoxV2 from './components/EnvironmentalBoxV2.vue';
import EnvironmentalBoxV3 from './components/EnvironmentalBoxV3.vue';
import EnvironmentalBoxV4 from './components/EnvironmentalBoxV4.vue';

const showVersion = ref(2);

const envData = ref({
  severity: "fair",
  policy: {
    action: "BOTH_WITH_WARNING",
    banner: "Moderate conditions. Considering indoor options is recommended for sensitive individuals.",
    banner_color: "yellow"
  },
  indices: {
    temp: 23.4,
    humid: 47,
    aqi: 24,
    uv: 0.2,
    weather: "Partly cloudy"
  },
  coord: [-37.82173703778737, 144.968952338534]
});

const envDataV3 = ref({
  severity: "good",
  policy: {
    action: "BOTH",
    banner: "Great weather! Perfect for outdoor sports.",
    banner_color: "green"
  },
  indices: {
    temp: 16.4,
    humid: 70,
    aqi: 18,
    uv: 0,
    weather: "Overcast"
  },
  coord: [-37.82173703778737, 144.968952338534]
});

const envDataV4 = ref({
  severity: "bad",
  policy: {
    action: "INDOOR_ONLY",
    banner: "Unsafe for outdoor sports. Please stay indoors.",
    banner_color: "red"
  },
  indices: {
    temp: 35.4,
    humid: 80,
    aqi: 72,
    uv: 0,
    weather: "Overcast"
  },
  coord: [-37.82173703778737, 144.968952338534]
});

const envLoading = ref(false);
const envError = ref(null);
</script>
