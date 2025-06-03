
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DeviceInfo {
  deviceType: string;
  browser: string;
  operatingSystem: string;
  screenResolution: string;
  language: string;
  timezone: string;
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
  
  // Get screen resolution
  const screenResolution = `${screen.width}x${screen.height}`;
  
  // Get language
  const language = navigator.language || 'Unknown';
  
  // Get timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  return { 
    deviceType, 
    browser, 
    operatingSystem, 
    screenResolution, 
    language, 
    timezone 
  };
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

const getUTMParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content')
  };
};

const measureResponseTime = (): Promise<number> => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    // Simple method to measure page load time
    if (document.readyState === 'complete') {
      resolve(performance.now() - startTime);
    } else {
      window.addEventListener('load', () => {
        resolve(performance.now() - startTime);
      });
    }
  });
};

export const usePageTracking = () => {
  useEffect(() => {
    const trackPageVisit = async () => {
      try {
        const deviceInfo = getDeviceInfo();
        const locationInfo = await getLocationInfo();
        const utmParams = getUTMParams();
        const responseTime = await measureResponseTime();
        
        // Store session start time for duration calculation
        const sessionStart = sessionStorage.getItem('sessionStart');
        const currentTime = Date.now();
        
        if (!sessionStart) {
          sessionStorage.setItem('sessionStart', currentTime.toString());
        }
        
        const sessionDuration = sessionStart ? 
          Math.round((currentTime - parseInt(sessionStart)) / 1000) : 0;
        
        const visitData = {
          ip_address: locationInfo.ip,
          user_agent: navigator.userAgent,
          device_type: deviceInfo.deviceType,
          browser: deviceInfo.browser,
          operating_system: deviceInfo.operatingSystem,
          country: locationInfo.country,
          city: locationInfo.city,
          page_url: window.location.href,
          referrer: document.referrer || null,
          timezone: deviceInfo.timezone,
          language: deviceInfo.language,
          screen_resolution: deviceInfo.screenResolution,
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          response_time: Math.round(responseTime),
          session_duration: sessionDuration
        };
        
        const { error } = await supabase
          .from('page_visits')
          .insert([visitData]);
          
        if (error) {
          console.error('Error tracking page visit:', error);
        } else {
          console.log('Page visit tracked successfully');
        }
      } catch (error) {
        console.error('Error in page tracking:', error);
      }
    };
    
    // Track the visit after a small delay to ensure page is loaded
    const timeoutId = setTimeout(trackPageVisit, 1000);
    
    // Update session duration on page unload
    const handleBeforeUnload = () => {
      const sessionStart = sessionStorage.getItem('sessionStart');
      if (sessionStart) {
        const sessionDuration = Math.round((Date.now() - parseInt(sessionStart)) / 1000);
        // Try to send a final update (best effort)
        navigator.sendBeacon('/api/update-session', JSON.stringify({ sessionDuration }));
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};
