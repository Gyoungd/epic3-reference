<template>
  <div class="w-full bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 shadow-md">
    <div v-if="loading" class="flex flex-col lg:flex-row gap-4">
      <div class="flex-1 animate-pulse">
        <div class="h-20 bg-gray-200 rounded-xl"></div>
      </div>
      <div class="flex flex-wrap gap-3 lg:flex-nowrap">
        <div v-for="i in 3" :key="i" class="flex-1 min-w-[140px] animate-pulse">
          <div class="h-24 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="bg-red-50 border-2 border-red-200 rounded-xl p-4">
      <div class="flex items-center gap-3 text-red-800">
        <AlertTriangle :size="20" />
        <p class="font-medium">{{ error }}</p>
      </div>
    </div>

    <div v-else-if="policy" class="flex flex-col gap-3">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="lg:w-[60%] flex flex-col">
          <div
            class="rounded-xl px-4 py-3 border-2 shadow-sm flex flex-col gap-2 h-full"
            :style="getBannerStyle(policy.policy.banner_color, policy.severity)"
          >
            <div class="flex items-center gap-3">
              <AlertTriangle :size="28" class="flex-shrink-0" />
              <h3 class="font-bold text-2xl uppercase tracking-wider">{{ policy.severity }}</h3>
            </div>
            <p class="text-sm leading-relaxed font-medium opacity-90">
              {{ policy.policy.banner }}
            </p>
          </div>
        </div>

        <div class="lg:w-[40%] flex flex-col gap-3">
          <div class="flex gap-3 flex-1">
            <div class="flex-1 bg-white rounded-xl p-3 shadow-sm border border-orange-200">
              <div class="flex items-center gap-2 mb-2">
                <Sun :size="20" class="text-orange-600" />
                <span class="text-sm font-medium text-gray-600">UV Index</span>
              </div>
              <div class="text-3xl font-bold text-gray-900">{{ policy.indices.uv.toFixed(1) }}</div>
              <div class="text-sm font-medium mt-1 text-gray-600" :class="getUVLevel(policy.indices.uv).color">
                {{ getUVLevel(policy.indices.uv).label }}
              </div>
            </div>

            <div class="flex-1 bg-white rounded-xl p-3 shadow-sm border border-orange-200">
              <div class="flex items-center gap-2 mb-2">
                <Wind :size="20" class="text-blue-600" />
                <span class="text-sm font-medium text-gray-600">Air Quality Index</span>
              </div>
              <div class="text-3xl font-bold text-gray-900">{{ policy.indices.aqi }}</div>
              <div class="text-sm font-medium mt-1 text-gray-600" :class="getAQILevel(policy.indices.aqi).color">
                {{ getAQILevel(policy.indices.aqi).label }}
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-3 shadow-sm border border-orange-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Cloud :size="20" class="text-gray-600" />
                <span class="text-2xl font-bold text-gray-900">{{ Math.round(policy.indices.temp) }}°</span>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-sm text-gray-600">{{ policy.indices.weather }}</span>
                <span class="flex items-center gap-1 text-sm text-gray-600">
                  <Droplets :size="16" />
                  {{ policy.indices.humid }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertTriangle, Cloud, Droplets, Sun, Wind } from 'lucide-vue-next';

defineProps({
  policy: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
});

const getBannerStyle = (bannerColor, severity) => {
  const colorMap = {
    green: { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
    yellow: { bg: '#fef3c7', text: '#92400e', border: '#fbbf24' },
    orange: { bg: '#fed7aa', text: '#9a3412', border: '#fb923c' },
    red: { bg: '#fecaca', text: '#7f1d1d', border: '#f87171' },
  };

  const colors = colorMap[bannerColor?.toLowerCase()] || colorMap.yellow;

  return {
    backgroundColor: colors.bg,
    color: colors.text,
    borderColor: colors.border,
  };
};

const getUVLevel = (uv) => {
  if (uv <= 2) return { label: 'Low', color: 'text-green-700' };
  if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-700' };
  if (uv <= 7) return { label: 'High', color: 'text-orange-700' };
  if (uv <= 10) return { label: 'Very High', color: 'text-red-700' };
  return { label: 'Extreme', color: 'text-purple-700' };
};

const getAQILevel = (aqi) => {
  if (aqi <= 50) return { label: 'Good', color: 'text-green-700' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-700' };
  if (aqi <= 150) return { label: 'Unhealthy (Sensitive)', color: 'text-orange-700' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-700' };
  return { label: 'Hazardous', color: 'text-purple-700' };
};
</script>
