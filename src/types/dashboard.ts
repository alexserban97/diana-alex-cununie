
export interface PageVisit {
  id: string;
  ip_address: string;
  visited_at: string;
  device_type: string;
  browser: string;
  operating_system: string;
  country: string;
  city: string;
  page_url: string;
  referrer: string;
  user_agent: string;
  timezone?: string;
  language?: string;
  screen_resolution?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  response_time?: number;
  session_duration?: number;
}

export interface DashboardStats {
  totalVisits: number;
  uniqueVisitors: number;
  returningVisitors: number;
  avgSessionTime: number;
  deviceStats: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
}

export interface FilterState {
  startDate: string;
  endDate: string;
  searchTerm: string;
  filterType: string;
}
