
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DeviceInfo {
  deviceType: string;
  browser: string;
  operatingSystem: string;
}

const getDeviceInfo = (): DeviceInfo => {
  const userAgent = navigator.userAgent;
  
  // Detect device type
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
  
  let deviceType = 'Desktop';
  if (isTablet) deviceType = 'Tablet';
  else if (isMobile) deviceType = 'Mobile';
  
  // Detect browser
  let browser = 'Unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  else if (userAgent.includes('Opera')) browser = 'Opera';
  
  // Detect OS
  let operatingSystem = 'Unknown';
  if (userAgent.includes('Windows')) operatingSystem = 'Windows';
  else if (userAgent.includes('Mac')) operatingSystem = 'macOS';
  else if (userAgent.includes('Linux')) operatingSystem = 'Linux';
  else if (userAgent.includes('Android')) operatingSystem = 'Android';
  else if (userAgent.includes('iOS')) operatingSystem = 'iOS';
  
  return { deviceType, browser, operatingSystem };
};

const getLocationInfo = async () => {
  try {
    // Using a free IP geolocation service
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
      ip: data.ip || 'Unknown'
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return {
      country: 'Unknown',
      city: 'Unknown',
      ip: 'Unknown'
    };
  }
};

export const usePageTracking = () => {
  useEffect(() => {
    const trackPageVisit = async () => {
      try {
        const deviceInfo = getDeviceInfo();
        const locationInfo = await getLocationInfo();
        
        const visitData = {
          ip_address: locationInfo.ip,
          user_agent: navigator.userAgent,
          device_type: deviceInfo.deviceType,
          browser: deviceInfo.browser,
          operating_system: deviceInfo.operatingSystem,
          country: locationInfo.country,
          city: locationInfo.city,
          page_url: window.location.href,
          referrer: document.referrer || null
        };
        
        const { error } = await supabase
          .from('page_visits')
          .insert([visitData]);
          
        if (error) {
          console.error('Error tracking page visit:', error);
        }
      } catch (error) {
        console.error('Error in page tracking:', error);
      }
    };
    
    // Track the visit after a small delay to ensure page is loaded
    const timeoutId = setTimeout(trackPageVisit, 1000);
    
    return () => clearTimeout(timeoutId);
  }, []);
};
