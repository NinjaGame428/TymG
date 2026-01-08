import axios from "axios";
import { MAPBOX_TOKEN } from "constants/constants";

export async function getAddressFromLocation(latlng: string) {
  const [lat, lng] = latlng.split(",");
  const mapboxToken = MAPBOX_TOKEN || "";

  if (!mapboxToken) {
    return "not found";
  }

  return axios
    .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`, {
      params: {
        access_token: mapboxToken,
      },
    })
    .then(({ data }) => {
      return data.features?.[0]?.place_name || "not found";
    })
    .catch((error) => {
      console.log(error);
      return "not found";
    });
}
