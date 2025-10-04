<template>
  <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-md border border-orange-200 hover:shadow-lg transition-shadow min-w-[280px] flex-shrink-0">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <span class="text-4xl" role="img" :aria-label="sport.sport_name">
          {{ getSportEmoji(sport.sport_name) }}
        </span>
        <div>
          <h3 class="font-bold text-lg text-gray-900">{{ sport.sport_name }}</h3>
          <span
            class="inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1"
            :class="getConditionBadge(sport.sport_condition).className"
          >
            {{ getConditionBadge(sport.sport_condition).text }}
          </span>
        </div>
      </div>
      <div class="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-md">
        #{{ sport.rank }}
      </div>
    </div>

    <div class="space-y-2 mb-5">
      <div class="flex items-center gap-2 text-sm text-gray-700">
        <Clock :size="16" class="text-orange-600" />
        <span class="font-medium">Min time:</span>
        <span>{{ sport.min_time_required }} min</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-700">
        <TrendingUp :size="16" class="text-orange-600" />
        <span class="font-medium">Intensity:</span>
        <span class="capitalize">{{ sport.intensity_level }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-700">
        <Users :size="16" class="text-orange-600" />
        <span class="font-medium">Popularity:</span>
        <span>{{ sport.popularity_score }}</span>
      </div>
      <div v-if="hasFacilities" class="flex items-center gap-2 text-sm text-gray-700">
        <MapPin :size="16" class="text-orange-600" />
        <span class="font-medium">{{ sport.facilities_nearby.length }} nearby</span>
      </div>
    </div>

    <button
      @click="$emit('find-facility', sport)"
      class="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      :aria-label="`Find facilities for ${sport.sport_name}`"
    >
      Find Facility
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Clock, TrendingUp, Users, MapPin } from 'lucide-vue-next';

const props = defineProps({
  sport: {
    type: Object,
    required: true
  }
});

defineEmits(['find-facility']);

const hasFacilities = computed(() =>
  props.sport.facilities_nearby && props.sport.facilities_nearby.length > 0
);

const getSportEmoji = (sportName) => {
  const emojiMap = {
    running: '🏃',
    walking: '🚶',
    cycling: '🚴',
    swimming: '🏊',
    tennis: '🎾',
    basketball: '🏀',
    soccer: '⚽',
    yoga: '🧘',
    gym: '💪',
    hiking: '🥾',
  };
  const key = sportName.toLowerCase().split(' ')[0];
  return emojiMap[key] || '🏃';
};

const getConditionBadge = (condition) => {
  const badges = {
    indoor: { text: 'Indoor', className: 'bg-blue-100 text-blue-800' },
    outdoor: { text: 'Outdoor', className: 'bg-green-100 text-green-800' },
    'non-facility': { text: 'Non-facility', className: 'bg-orange-100 text-orange-800' },
  };
  return badges[condition?.toLowerCase()] || { text: condition, className: 'bg-gray-100 text-gray-800' };
};
</script>
