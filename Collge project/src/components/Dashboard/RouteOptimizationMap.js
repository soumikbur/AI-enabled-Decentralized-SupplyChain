import React, { useEffect, useRef } from "react";

const RouteOptimizationMap = ({ waypoints }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
        zoom: 12,
      });

      if (waypoints && waypoints.length > 1) {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();

        directionsRenderer.setMap(map);

        const routeRequest = {
          origin: waypoints[0],
          destination: waypoints[waypoints.length - 1],
          waypoints: waypoints
            .slice(1, -1)
            .map((point) => ({ location: point, stopover: true })),
          travelMode: "DRIVING",
        };

        directionsService.route(routeRequest, (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          } else {
            console.error("Directions request failed due to:", status);
          }
        });
      }
    };

    // Load Google Maps script
    const loadGoogleMaps = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    };

    loadGoogleMaps();
  }, [waypoints]);

  return <div ref={mapRef} className="route-optimization-map"></div>;
};

export default RouteOptimizationMap;

/*
Props for RouteOptimizationMap
waypoints: An array of locations (latitude and longitude pairs or address strings) representing the delivery route.
Example usage:
<RouteOptimizationMap waypoints={['New York, NY', 'Philadelphia, PA', 'Washington, DC']} />
*/
