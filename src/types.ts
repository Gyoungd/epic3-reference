export interface EnvironmentPolicy {
  severity: string;
  policy: {
    action: string;
    banner: string;
    banner_color: string;
  };
  indices: {
    temp: number;
    humid: number;
    aqi: number;
    uv: number;
    wmo_code: number;
    weather: string;
  };
  coord: [number, number];
}

export interface Facility {
  facility_id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  bucket: number;
}

export interface SportRecommendation {
  rank: number;
  sport_id: number;
  sport_name: string;
  intensity_level: string;
  min_time_required: number;
  popularity_score: number;
  req_equipment: string;
  req_facility: boolean;
  priority_boost: boolean;
  sport_condition: string;
  facilities_nearby: Facility[];
}

export interface RecommendationResponse {
  recommendations: SportRecommendation[];
}

export interface FilterState {
  time: number;
  lat: number;
  lon: number;
  intensity_level: string;
  age_group: string;
}
