import { Clock, TrendingUp, Users, MapPin } from 'lucide-react';
import { SportRecommendation } from '../types';

interface SportCardProps {
  sport: SportRecommendation;
  onFindFacility: (sport: SportRecommendation) => void;
}

export default function SportCard({ sport, onFindFacility }: SportCardProps) {
  const getSportEmoji = (sportName: string) => {
    const emojiMap: Record<string, string> = {
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

  const getConditionBadge = (condition: string) => {
    const badges: Record<string, { text: string; className: string }> = {
      indoor: { text: 'Indoor', className: 'bg-blue-100 text-blue-800' },
      outdoor: { text: 'Outdoor', className: 'bg-green-100 text-green-800' },
      'non-facility': { text: 'Non-facility', className: 'bg-orange-100 text-orange-800' },
    };
    return badges[condition.toLowerCase()] || { text: condition, className: 'bg-gray-100 text-gray-800' };
  };

  const conditionBadge = getConditionBadge(sport.sport_condition);
  const hasFacilities = sport.facilities_nearby && sport.facilities_nearby.length > 0;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-md border border-orange-200 hover:shadow-lg transition-shadow min-w-[280px] flex-shrink-0">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl" role="img" aria-label={sport.sport_name}>
            {getSportEmoji(sport.sport_name)}
          </span>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{sport.sport_name}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${conditionBadge.className}`}>
              {conditionBadge.text}
            </span>
          </div>
        </div>
        <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-md">
          #{sport.rank}
        </div>
      </div>

      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Clock className="w-4 h-4 text-orange-600" aria-hidden="true" />
          <span className="font-medium">Min time:</span>
          <span>{sport.min_time_required} min</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <TrendingUp className="w-4 h-4 text-orange-600" aria-hidden="true" />
          <span className="font-medium">Intensity:</span>
          <span className="capitalize">{sport.intensity_level}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Users className="w-4 h-4 text-orange-600" aria-hidden="true" />
          <span className="font-medium">Popularity:</span>
          <span>{sport.popularity_score}</span>
        </div>
        {hasFacilities && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-orange-600" aria-hidden="true" />
            <span className="font-medium">{sport.facilities_nearby.length} nearby</span>
          </div>
        )}
      </div>

      <button
        onClick={() => onFindFacility(sport)}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        aria-label={`Find facilities for ${sport.sport_name}`}
      >
        Find Facility
      </button>
    </div>
  );
}
