import { MapPin } from 'lucide-react';
import { Facility } from '../types';

interface MapSectionProps {
  facilities: Facility[];
  center?: [number, number];
}

export default function MapSection({ facilities, center }: MapSectionProps) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="relative w-full h-[500px] bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
        <div className="text-center p-8">
          <MapPin className="w-16 h-16 text-orange-600 mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Map View</h3>
          <p className="text-gray-600 mb-4">
            Map integration ready. {facilities.length > 0 ? `Showing ${facilities.length} facilities` : 'No facilities to display'}
          </p>
          {center && (
            <p className="text-sm text-gray-500">
              Center: {center[0].toFixed(4)}, {center[1].toFixed(4)}
            </p>
          )}
        </div>

        {facilities.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4 max-h-[200px] overflow-y-auto">
            <h4 className="font-semibold text-gray-900 mb-3">Facilities</h4>
            <div className="space-y-2">
              {facilities.map((facility) => (
                <div
                  key={facility.facility_id}
                  className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900">{facility.name}</p>
                    <p className="text-xs text-gray-600 truncate">{facility.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
