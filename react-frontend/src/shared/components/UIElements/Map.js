import React,{useRef,useEffect} from "react";

import "./Map.css";

// useState() before - this allowed us to register state which then is managed inside of a component. When state is changed, the component re-renders (or to be precise: It is re-evaluated and might lead to a re-rendering of the DOM).

// useEffect() does something different: It allows you to register some logic (i.e. a JS function) which will be executed when certain dependencies - which you define - change.
// However, React does not track these dependencies behind the scenes. Instead, useEffect() re-evaluates the dependency values whenever the component in which you use useEffect() is re-evaluated (i.e. whenever the component's props or state changed).
// If the component is re-evaluated and the dependencies did NOT change, the logic in useEffect() won't run again.
// Important: The useEffect() logic re-runs AFTER the component (including its JSX code) was re-evaluated. That means, that the first execution of the useEffect() logic (when a component mounts for the first time) will ALWAYS happen AFTER the component rendered for the first time.

// useRef() can be used to get pointer to the element in the DOM

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return (
    <div
      // binds the constant mapRef to div element
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
