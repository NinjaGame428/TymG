/* eslint-disable @next/next/no-img-element */
import React, { MutableRefObject, useRef, useEffect, useState, useCallback } from "react";
import { Marker, useMap } from "react-map-gl";
import cls from "./map.module.scss";
import { getAddressFromLocation } from "utils/getAddressFromLocation";
import { IShop } from "interfaces";
import ShopLogoBackground from "components/shopLogoBackground/shopLogoBackground";
import MapContainer from "containers/map/mapContainer";
import { MAPBOX_TOKEN } from "constants/constants";
import mapboxgl from "mapbox-gl";

type Coords = {
  lat: number;
  lng: number;
};

type Props = {
  location: Coords;
  setLocation?: (data: Coords) => void;
  readOnly?: boolean;
  shops?: IShop[];
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  handleMarkerClick?: (data: IShop) => void;
  useInternalApi?: boolean;
};

const CustomMarker = ({ lat, lng }: { lat: number; lng: number }) => (
  <Marker longitude={lng} latitude={lat} anchor="center">
    <img src="/images/marker.png" width={32} alt="Location" />
  </Marker>
);

const ShopMarker = ({
  shop,
  lat,
  lng,
  onClick,
}: {
  shop: IShop;
  lat: number;
  lng: number;
  onClick: () => void;
}) => (
  <Marker longitude={lng} latitude={lat} anchor="center">
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <ShopLogoBackground data={shop} size="small" />
    </div>
  </Marker>
);

const FitBounds = ({
  locations,
}: {
  locations: Array<{ lat: number; lng: number }>;
}) => {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map || locations.length === 0) return;

    const bounds = locations.reduce(
      (bounds, loc) => {
        return bounds.extend([loc.lng, loc.lat]);
      },
      new mapboxgl.LngLatBounds()
    );

    map.fitBounds(bounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
    });
  }, [map, locations]);

  return null;
};

export default function Map({
  location,
  setLocation = () => {},
  readOnly = false,
  shops = [],
  inputRef,
  handleMarkerClick,
  useInternalApi = true,
}: Props) {
  const [mapRef, setMapRef] = useState<any>(null);
  const autocompleteService = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapboxgl) {
      mapboxgl.accessToken = MAPBOX_TOKEN || "";
    }
  }, []);

  const handleMapLoad = useCallback((event: any) => {
    setMapRef(event.target);
  }, []);

  const handleDragEnd = useCallback(
    async (map: any) => {
      if (readOnly) {
        return;
      }
      let center;
      if (map.getCenter) {
        const centerObj = map.getCenter();
        center = {
          lat: typeof centerObj.lat === "function" ? centerObj.lat() : centerObj.lat,
          lng: typeof centerObj.lng === "function" ? centerObj.lng() : centerObj.lng,
        };
      } else if (map.target) {
        // Mapbox event
        const mapboxCenter = map.target.getCenter();
        center = {
          lat: mapboxCenter.lat,
          lng: mapboxCenter.lng,
        };
      } else {
        return;
      }
      setLocation(center);
      const address = await getAddressFromLocation(
        `${center.lat},${center.lng}`
      );
      if (inputRef?.current?.value) inputRef.current.value = address;
    },
    [readOnly, setLocation, inputRef]
  );

  useEffect(() => {
    if (!inputRef?.current || !MAPBOX_TOKEN) return;

    const input = inputRef.current;

    const handleInputChange = async () => {
      const query = input.value;
      if (query.length < 3) return;

      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${MAPBOX_TOKEN}&limit=5`
        );
        const data = await response.json();

        // Create a simple dropdown for suggestions
        // You might want to enhance this with a proper autocomplete component
        if (data.features && data.features.length > 0) {
          const firstResult = data.features[0];
          const coords: Coords = {
            lat: firstResult.center[1],
            lng: firstResult.center[0],
          };
          setLocation(coords);
          if (mapRef) {
            mapRef.flyTo({
              center: [coords.lng, coords.lat],
              zoom: 15,
            });
          }
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    };

    const timeoutId = setTimeout(handleInputChange, 500);
    return () => clearTimeout(timeoutId);
  }, [inputRef, setLocation, mapRef]);

  const allLocations = useCallback(() => {
    const shopLocations = shops.map((item) => ({
      lat: Number(item.location?.latitude) || 0,
      lng: Number(item.location?.longitude) || 0,
    }));
    return [location, ...shopLocations];
  }, [location, shops]);

  return (
    <div className={cls.root}>
      {!readOnly && (
        <div className={cls.marker}>
          <img src="/images/marker.png" width={32} alt="Location" />
        </div>
      )}
      <MapContainer
        center={location}
        onDragEnd={handleDragEnd}
        onLoad={handleMapLoad}
      >
        {readOnly && <CustomMarker lat={location.lat} lng={location.lng} />}
        {shops.map((item, idx) => (
          <ShopMarker
            key={`marker-${idx}`}
            lat={Number(item.location?.latitude) || 0}
            lng={Number(item.location?.longitude) || 0}
            shop={item}
            onClick={() => {
              if (handleMarkerClick) handleMarkerClick(item);
            }}
          />
        ))}
        {shops.length > 0 && useInternalApi && (
          <FitBounds locations={allLocations()} />
        )}
      </MapContainer>
    </div>
  );
}
