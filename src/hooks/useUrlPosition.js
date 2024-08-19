import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
  //use the useSearchParams function to get the search parameters from the URL
  const [searchParams] = useSearchParams();

  //use the URLSearchParams object (searchParams) to get the latitude and longitude values from the URL.
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return [lat, lng];
}
