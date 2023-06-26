import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken ='pk.eyJ1IjoibGF6YXJvbWFyaW4iLCJhIjoiY2xqMWpmeHhqMHIwOTNsb3htcXlsYXRwayJ9.m4ShG7bwjJ_BMjs6eYxFxg';

const Map = () => {
  useEffect(() => {
    // Crear una instancia de mapbox-gl en el elemento con id 'map'
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-106.6511400, 35.0844900], // Coordenadas de longitud y latitud
      zoom: 9, // Nivel de zoom
      interactive: false,
    });

    // Limpia el mapa al desmontar el componente
    return () => map.remove();
  }, []);

  return (
    <>
    <div id="map" className=" rounded h-2/3 mx-2 "> <h2 className='mb-2'> Los Pollos Hermanos 🍗 </h2> </div>
    </>
  );
};

export default Map;
