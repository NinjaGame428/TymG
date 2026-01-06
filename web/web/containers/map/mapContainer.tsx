import React, { useMemo, useEffect } from "react";
import Map, { MapRef, ViewStateChangeEvent } from "react-map-gl";
import { MAPBOX_TOKEN } from "constants/constants";
import useUserLocation from "hooks/useUserLocation";
import { useSettings } from "contexts/settings/settings.context";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {
  children?: React.ReactNode;
  center?: { lat: number; lng: number };
  onDragEnd?: (map: any) => void;
  onViewStateChange?: (evt: ViewStateChangeEvent) => void;
  [key: string]: any;
};

export default function MapContainer({
  children,
  center,
  onDragEnd,
  onViewStateChange,
  ...rest
}: Props) {
  const location = useUserLocation();
  const { settings } = useSettings();

  const mapboxToken = settings?.mapbox_token || MAPBOX_TOKEN || "";

  useEffect(() => {
    if (typeof window !== "undefined" && mapboxgl) {
      mapboxgl.accessToken = mapboxToken;
    }
  }, [mapboxToken]);

  const defaultCenter = useMemo(() => {
    if (center) {
      return { latitude: center.lat, longitude: center.lng };
    }
    return {
      latitude: Number(location?.latitude) || 0,
      longitude: Number(location?.longitude) || 0,
    };
  }, [center, location]);

  const handleMoveEnd = (evt: ViewStateChangeEvent) => {
    if (onDragEnd) {
      onDragEnd(evt);
    }
    if (onViewStateChange) {
      onViewStateChange(evt);
    }
  };

  return (
    <Map
      mapboxAccessToken={mapboxToken}
      initialViewState={{
        longitude: defaultCenter.longitude,
        latitude: defaultCenter.latitude,
        zoom: 15,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onMoveEnd={handleMoveEnd}
      {...rest}
    >
      {children}
    </Map>
  );
}
