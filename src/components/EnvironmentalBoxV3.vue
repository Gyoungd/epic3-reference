<template>
  <div class="w-full bg-white rounded-2xl p-4 shadow-md">
    <div v-if="loading" class="flex flex-col gap-3">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="lg:w-[60%] flex flex-col gap-3">
          <div class="h-[84px] bg-gray-200 rounded-xl animate-pulse"></div>
          <div class="h-[84px] bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
        <div class="lg:w-[40%] flex flex-col gap-3">
          <div class="h-[84px] bg-gray-200 rounded-xl animate-pulse"></div>
          <div class="h-[84px] bg-gray-200 rounded-xl animate-pulse"></div>
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
        <div class="lg:w-[60%] flex flex-col gap-3">
          <div
            class="rounded-xl px-4 border-2 shadow-sm h-[84px] flex items-center"
            :style="getBannerStyle(policy.policy.banner_color, policy.severity)"
          >
            <div class="flex items-start gap-3 w-full">
              <div class="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <CheckCircle :size="24" class="flex-shrink-0" />
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-xl uppercase tracking-wide mb-1">{{ policy.severity }}</h3>
                <p class="text-sm leading-relaxed opacity-90">
                  {{ policy.policy.banner }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-[84px] flex items-center px-3">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2">
                <div class="p-1.5 bg-gray-50 rounded-lg">
                  <Cloud :size="20" class="text-gray-600" />
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">Temperature</p>
                  <span class="text-2xl font-bold text-gray-900">{{ Math.round(policy.indices.temp) }}°</span>
                </div>
              </div>
              <div class="flex items-start gap-6">
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">Weather</p>
                  <span class="text-lg font-semibold text-gray-900">{{ policy.indices.weather }}</span>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">Humidity</p>
                  <span class="flex items-center gap-1 text-lg font-semibold text-gray-900">
                    <Droplets :size="16" />
                    {{ policy.indices.humid }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-[40%] flex flex-col gap-3">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-[84px] flex items-center px-3">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2">
                <div class="p-1.5 bg-gray-100 rounded-lg">
                  <Sun :size="20" class="text-gray-600" />
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">UV Index</p>
                  <div class="text-2xl font-bold text-gray-900">{{ policy.indices.uv.toFixed(1) }}</div>
                </div>
              </div>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="getUVLevel(policy.indices.uv).badgeClass">
                {{ getUVLevel(policy.indices.uv).label }}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-[84px] flex items-center px-3">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2">
                <div class="p-1.5 bg-gray-100 rounded-lg">
                  <Wind :size="20" class="text-gray-600" />
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">Air Quality Index</p>
                  <div class="text-2xl font-bold text-gray-900">{{ policy.indices.aqi }}</div>
                </div>
              </div>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="getAQILevel(policy.indices.aqi).badgeClass">
                {{ getAQILevel(policy.indices.aqi).label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle, Cloud, Droplets, Sun, Wind, AlertTriangle } from 'lucide-vue-next';

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
  if (uv <= 2) return {
    label: 'Low',
    bgColor: 'bg-green-500',
    badgeClass: 'bg-green-100 text-green-700'
  };
  if (uv <= 5) return {
    label: 'Moderate',
    bgColor: 'bg-yellow-500',
    badgeClass: 'bg-yellow-100 text-yellow-700'
  };
  if (uv <= 7) return {
    label: 'High',
    bgColor: 'bg-orange-500',
    badgeClass: 'bg-orange-100 text-orange-700'
  };
  if (uv <= 10) return {
    label: 'Very High',
    bgColor: 'bg-red-500',
    badgeClass: 'bg-red-100 text-red-700'
  };
  return {
    label: 'Extreme',
    bgColor: 'bg-purple-500',
    badgeClass: 'bg-purple-100 text-purple-700'
  };
};

const getAQILevel = (aqi) => {
  if (aqi <= 50) return {
    label: 'Good',
    bgColor: 'bg-green-500',
    badgeClass: 'bg-green-100 text-green-700'
  };
  if (aqi <= 100) return {
    label: 'Moderate',
    bgColor: 'bg-yellow-500',
    badgeClass: 'bg-yellow-100 text-yellow-700'
  };
  if (aqi <= 150) return {
    label: 'Unhealthy',
    bgColor: 'bg-orange-500',
    badgeClass: 'bg-orange-100 text-orange-700'
  };
  if (aqi <= 200) return {
    label: 'Unhealthy',
    bgColor: 'bg-red-500',
    badgeClass: 'bg-red-100 text-red-700'
  };
  return {
    label: 'Hazardous',
    bgColor: 'bg-purple-500',
    badgeClass: 'bg-purple-100 text-purple-700'
  };
};
</script>
