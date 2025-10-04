import { MapPin, RefreshCw } from 'lucide-react';
import { FilterState } from '../types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onUseMyLocation: () => void;
  onRefresh: () => void;
  loading?: boolean;
}

export default function Filters({
  filters,
  onFilterChange,
  onUseMyLocation,
  onRefresh,
  loading = false,
}: FiltersProps) {
  const handleChange = (key: keyof FilterState, value: string | number) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Card Filter</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="time-filter" className="block text-sm font-semibold text-gray-700 mb-2">
            Time Availability
          </label>
          <select
            id="time-filter"
            value={filters.time}
            onChange={(e) => handleChange('time', Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value={10}>≤ 10 min</option>
            <option value={20}>≤ 20 min</option>
            <option value={30}>≤ 30 min</option>
            <option value={45}>≤ 45 min</option>
            <option value={60}>≤ 60 min</option>
            <option value={90}>≤ 90 min</option>
            <option value={120}>≤ 2 hours</option>
          </select>
        </div>

        <div>
          <label htmlFor="intensity-filter" className="block text-sm font-semibold text-gray-700 mb-2">
            Intensity
          </label>
          <select
            id="intensity-filter"
            value={filters.intensity}
            onChange={(e) => handleChange('intensity', e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Levels</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="vigorous">Vigorous</option>
          </select>
        </div>

        <div>
          <label htmlFor="popularity-filter" className="block text-sm font-semibold text-gray-700 mb-2">
            Popularity
          </label>
          <select
            id="popularity-filter"
            value={filters.popularity}
            onChange={(e) => handleChange('popularity', e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Total (default)</option>
            <option value="high">High (≥70)</option>
            <option value="medium">Medium (40-70)</option>
            <option value="low">Low (&lt;40)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="location-filter" className="block text-sm font-semibold text-gray-700 mb-2">
          Location (optional to change)
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="location-filter"
            type="text"
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Melbourne, Victoria, Australia"
            className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            onClick={onUseMyLocation}
            disabled={loading}
            className="px-6 py-2.5 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-label="Use my current location"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span className="whitespace-nowrap">Use My Location</span>
          </button>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-label="Refresh recommendations"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}
