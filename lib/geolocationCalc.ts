export const getCurrentLocation = async (
    onLocationReceived: ((lat: number, lng: number) => void) | undefined
  ): Promise<{ lat: number; lng: number }> => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
  
        if (onLocationReceived) {
          onLocationReceived(lat, lng);
        }
  
        return { lat, lng };
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('Geolocation is not supported by this browser.');
    }
  };
  