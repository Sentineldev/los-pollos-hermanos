import React, { useState } from 'react';
import axios from 'axios';

function Formulario() {

    const[values,setValues] = useState({
    nombre: "",
    cedula: "",
    direccion: "",
    pedido:"",
    correo_electronico:""
    })

  
   //FormData setFormData

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado de recargar la página al enviar el formulario
  
    try {
      const formData = new FormData(e.target); // Obtén los datos del formulario
      const requestData = Object.fromEntries(formData.entries()); // Convierte los datos del formulario en un objeto
  
      const response = await axios.post('http://localhost:3000/api/orders', requestData); // Envía los datos a la API utilizando Axios
  
      // Maneja la respuesta de la API según tus necesidades
      console.log(response.data); // Ejemplo: imprime la respuesta en la consola
    } catch (error) {
      // Maneja el error según tus necesidades
      console.error(error);
    }
  };
  

  return (
        <form className="tracking-wide font-bold text-lg" onSubmit={handleSubmit}>

            <div className="mb-2">
                <label className="label" htmlFor="nombre"> Nombre:</label>
                <input className="input  text-warning input-bordered w-full" type="text" id="nombre" name="nombre" value={values.nombre} onChange={handleChange} placeholder = "nombre y apellido" />
            </div>

            <div className="mb-2">
                <label className="label" htmlFor="cedula">Cedula:</label>
                <input className="input text-warning input-bordered w-full" type="number" id="cedula" name="cedula" value={values.cedula} onChange={handleChange} placeholder = "numero de cedula:"/>
            </div>

            <div className="mb-2">
                <label className="label" htmlFor="direccion">Direccion: </label>
                <textarea className="input text-warning input-bordered  w-full" id="direccion"  name="direccion" rows={4} value={values.direccion} onChange={handleChange} placeholder = "Ubicacion para la entrega" ></textarea>
            </div>

            <div className="mb-2">
                <label className="label" htmlFor="pedido">Pedido: </label>
                <textarea className="input text-warning input-bordered w-full" id="pedido" name="pedido" rows={4} value={values.pedido} onChange={handleChange} placeholder = "Que deseas LLevar?" ></textarea>
            </div>
            
            <div className="mb-2">
                <label className="label" htmlFor="correo_electronico">Gmail:</label>

                <input className="input text-warning input-bordered w-full" id="correo_electronico" type="email" name="correo_electronico" value={values.correo_electronico} onChange={handleChange} placeholder = "Correo Electronico" />
            </div>

            <button className="btn btn-primary w-full rounded" type="submit"> ENVIAR </button>
        </form>
  );
}

export default Formulario;