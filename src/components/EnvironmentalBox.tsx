import { AlertTriangle, Cloud, Droplets, Sun, Wind } from 'lucide-react';
import { EnvironmentPolicy } from '../types';

interface EnvironmentalBoxProps {
  policy: EnvironmentPolicy | null;
  loading?: boolean;
  error?: string;
}

export default function EnvironmentalBox({ policy, loading, error }: EnvironmentalBoxProps) {
  if (loading) {
    return (
      <div className="w-full bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 shadow-md">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 animate-pulse">
            <div className="h-20 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-nowrap">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 min-w-[140px] animate-pulse">
                <div className="h-24 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3 text-red-800">
          <AlertTriangle className="w-5 h-5" />
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!policy) return null;

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      good: 'bg-green-100 text-green-800 border-green-300',
      fair: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      moderate: 'bg-orange-100 text-orange-800 border-orange-300',
      poor: 'bg-red-100 text-red-800 border-red-300',
      bad: 'bg-red-200 text-red-900 border-red-400',
    };
    return colors[severity.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getWeatherIcon = () => {
    return <Cloud className="w-5 h-5" />;
  };

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { label: 'Low', color: 'text-green-700' };
    if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-700' };
    if (uv <= 7) return { label: 'High', color: 'text-orange-700' };
    if (uv <= 10) return { label: 'Very High', color: 'text-red-700' };
    return { label: 'Extreme', color: 'text-purple-700' };
  };

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { label: 'Good', color: 'text-green-700' };
    if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-700' };
    if (aqi <= 150) return { label: 'Unhealthy (Sensitive)', color: 'text-orange-700' };
    if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-700' };
    return { label: 'Hazardous', color: 'text-purple-700' };
  };

  const uvLevel = getUVLevel(policy.indices.uv);
  const aqiLevel = getAQILevel(policy.indices.aqi);

  return (
    <div className="w-full bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 shadow-md">
      <div className="flex flex-col lg:flex-row gap-4">
        <div
          className={`flex-1 rounded-xl p-4 border-2 shadow-sm ${getSeverityColor(policy.severity)}`}
          style={{ backgroundColor: policy.policy.banner_color || undefined }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-bold text-lg mb-1">{policy.policy.banner}</h3>
              <p className="text-sm leading-relaxed">{policy.policy.action}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 lg:flex-nowrap">
          <div className="flex-1 min-w-[140px] bg-white rounded-xl p-4 shadow-sm border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-5 h-5 text-orange-600" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-600">UV Index</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{policy.indices.uv}</div>
            <div className={`text-sm font-semibold mt-1 ${uvLevel.color}`}>{uvLevel.label}</div>
          </div>

          <div className="flex-1 min-w-[140px] bg-white rounded-xl p-4 shadow-sm border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-600">AQI</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{policy.indices.aqi}</div>
            <div className={`text-sm font-semibold mt-1 ${aqiLevel.color}`}>{aqiLevel.label}</div>
          </div>

          <div className="flex-1 min-w-[140px] bg-white rounded-xl p-4 shadow-sm border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              {getWeatherIcon()}
              <span className="text-sm font-medium text-gray-600">Weather</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{policy.indices.temp}°</div>
            <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <span>{policy.indices.weather}</span>
              <span className="flex items-center gap-1">
                <Droplets className="w-3 h-3" aria-hidden="true" />
                {policy.indices.humid}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
