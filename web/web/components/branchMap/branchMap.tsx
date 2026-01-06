/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useEffect } from "react";
import { Marker, useMap } from "react-map-gl";
import cls from "./branchMap.module.scss";
import MapContainer from "containers/map/mapContainer";
import { IShop } from "interfaces";
import { Skeleton, Tooltip } from "@mui/material";
import mapboxgl from "mapbox-gl";

type MarkerProps = {
  data: IShop;
  lat: number;
  lng: number;
  index: number;
  handleSubmit: (id: string) => void;
};

const CustomMarker = ({ data, lat, lng, index, handleSubmit }: MarkerProps) => {
  return (
    <Marker longitude={lng} latitude={lat} anchor="center">
      <Tooltip title={data.translation?.title} arrow>
        <button
          className={cls.mark}
          onClick={() => handleSubmit(String(data.id))}
        >
          {index}
        </button>
      </Tooltip>
    </Marker>
  );
};

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

type Props = {
  data?: IShop[];
  isLoading?: boolean;
  handleSubmit: (id: string) => void;
};

export default function BranchMap({
  data = [],
  isLoading,
  handleSubmit,
}: Props) {
  const markers = useMemo(
    () =>
      data.map((item) => ({
        lat: Number(item.location?.latitude) || 0,
        lng: Number(item.location?.longitude) || 0,
        data: item,
      })),
    [data]
  );

  return (
    <div className={cls.wrapper}>
      {!isLoading ? (
        <MapContainer>
          {markers.map((item, idx) => (
            <CustomMarker
              key={idx}
              lat={item.lat}
              lng={item.lng}
              data={item.data}
              index={idx + 1}
              handleSubmit={handleSubmit}
            />
          ))}
          {markers.length > 0 && <FitBounds locations={markers} />}
        </MapContainer>
      ) : (
        <Skeleton variant="rectangular" className={cls.shimmer} />
      )}
    </div>
  );
}
