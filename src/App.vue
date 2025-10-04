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

        <section aria-labelledby="recommendations-heading">
          <div class="mb-4">
            <h2 id="recommendations-heading" class="text-2xl font-bold text-gray-900 mb-1">
              Top sports for you
            </h2>
            <p class="text-sm text-gray-600">Based on your time, location, intensity and popularity</p>
          </div>

          <div v-if="recLoading" class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <div
              v-for="i in 3"
              :key="i"
              class="min-w-[280px] h-[320px] bg-white rounded-2xl animate-pulse"
            />
          </div>

          <div v-else-if="recError" class="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
            <p class="text-red-800 font-medium">{{ recError }}</p>
          </div>

          <div
            v-else-if="recData && recData.recommendations && recData.recommendations.length > 0"
            class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          >
            <SportCard
              v-for="sport in recData.recommendations"
              :key="sport.sport_id"
              :sport="sport"
              @find-facility="handleFindFacility"
            />
          </div>

          <div v-else class="bg-white rounded-2xl p-12 text-center shadow-md border border-gray-200">
            <p class="text-gray-600 text-lg">No recommendations returned for current filters.</p>
          </div>
        </section>

        <section aria-label="Filter options">
          <Filters
            :filters="filters"
            :loading="recLoading"
            @update-filter="filters = $event"
            @update-location="handleLocationUpdate"
            @use-my-location="handleUseMyLocation"
            @refresh="handleRefresh"
          />
        </section>

        <section id="map-section" aria-label="Facilities map">
          <MapSection :facilities="selectedFacilities" :center="[filters.lat, filters.lon]" />
        </section>
      </div>
    </main>

    <footer class="bg-white border-t border-gray-200 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p class="text-center text-gray-600">
          MelMoveNow - Helping you stay active in Melbourne
        </p>
      </div>
    </footer>

    <Toast
      v-if="toast"
      :message="toast.message"
      :type="toast.type"
      @close="toast = null"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import EnvironmentalBoxV2 from './components/EnvironmentalBoxV2.vue';
import EnvironmentalBoxV3 from './components/EnvironmentalBoxV3.vue';
import EnvironmentalBoxV4 from './components/EnvironmentalBoxV4.vue';
import SportCard from './components/SportCard.vue';
import Filters from './components/Filters.vue';
import MapSection from './components/MapSection.vue';
import Toast from './components/Toast.vue';

const API_BASE_URL = 'https://tp18-datafetch-production-2a92.up.railway.app';

const showVersion = ref(2);

const filters = ref({
  time: 60,
  lat: -37.81516255433847,
  lon: 144.95513955377578,
  intensity_level: 'moderate',
  age_group: 'total'
});

const selectedFacilities = ref([]);
const toast = ref(null);

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

const recData = ref({
  recommendations: [
    {
      rank: 1,
      sport_id: 1,
      sport_name: "Walking",
      intensity_level: "easy",
      min_time_required: 30,
      popularity_score: 95,
      req_equipment: "None",
      req_facility: false,
      priority_boost: true,
      sport_condition: "outdoor",
      facilities_nearby: []
    },
    {
      rank: 2,
      sport_id: 2,
      sport_name: "Gym",
      intensity_level: "moderate",
      min_time_required: 45,
      popularity_score: 88,
      req_equipment: "Gym equipment",
      req_facility: true,
      priority_boost: false,
      sport_condition: "indoor",
      facilities_nearby: [
        {
          facility_id: 101,
          name: "Melbourne Sports Hub",
          address: "123 Collins St, Melbourne VIC 3000",
          latitude: -37.8136,
          longitude: 144.9631,
          bucket: 1
        },
        {
          facility_id: 102,
          name: "City Fitness Center",
          address: "456 Bourke St, Melbourne VIC 3000",
          latitude: -37.8145,
          longitude: 144.9584,
          bucket: 1
        }
      ]
    },
    {
      rank: 3,
      sport_id: 3,
      sport_name: "Cycling",
      intensity_level: "moderate",
      min_time_required: 40,
      popularity_score: 82,
      req_equipment: "Bicycle, helmet",
      req_facility: false,
      priority_boost: false,
      sport_condition: "outdoor",
      facilities_nearby: []
    }
  ]
});
const recLoading = ref(false);
const recError = ref(null);

const fetchEnvironment = async () => {
  envLoading.value = true;
  envError.value = null;

  try {
    const response = await fetch(`${API_BASE_URL}/environment/policy`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: filters.value.lat,
        lon: filters.value.lon,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch environment data: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Environment data:', result);
    envData.value = result;
  } catch (err) {
    envError.value = err.message;
    console.error('Environment fetch error:', err);
  } finally {
    envLoading.value = false;
  }
};

const fetchRecommendations = async () => {
  recLoading.value = true;
  recError.value = null;

  try {
    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time: filters.value.time,
        lat: filters.value.lat,
        lon: filters.value.lon,
        intensity_level: filters.value.intensity_level,
        age_group: filters.value.age_group,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Recommendations data:', result);
    recData.value = result;
  } catch (err) {
    recError.value = err.message;
    console.error('Recommendations fetch error:', err);
  } finally {
    recLoading.value = false;
  }
};

const handleUseMyLocation = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        filters.value.lat = position.coords.latitude;
        filters.value.lon = position.coords.longitude;
        toast.value = { message: 'Location updated successfully', type: 'success' };
        fetchEnvironment();
        fetchRecommendations();
      },
      (error) => {
        toast.value = { message: `Failed to get location: ${error.message}`, type: 'error' };
      }
    );
  } else {
    toast.value = { message: 'Geolocation is not supported by your browser', type: 'error' };
  }
};

const handleRefresh = () => {
  fetchRecommendations();
  toast.value = { message: 'Recommendations refreshed', type: 'success' };
};

const handleFindFacility = (sport) => {
  if (sport.facilities_nearby && sport.facilities_nearby.length > 0) {
    selectedFacilities.value = sport.facilities_nearby;
    toast.value = {
      message: `Found ${sport.facilities_nearby.length} facilities for ${sport.sport_name}`,
      type: 'success'
    };

    setTimeout(() => {
      const mapSection = document.getElementById('map-section');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  } else {
    toast.value = { message: 'No nearby facilities - try non-facility options', type: 'info' };
  }
};

const handleLocationUpdate = (value) => {
  console.log('Location update:', value);
};

watch(
  () => filters.value,
  () => {
    fetchRecommendations();
  },
  { deep: true }
);

onMounted(() => {
  // Using hardcoded data for now - uncomment to enable API calls
  // fetchEnvironment();
  // fetchRecommendations();
});
</script>
