import React, { useState } from 'react';

function Formulario() {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    direccion: "",
    pedido:"",
    correo_electronico:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = new FormData(e.currentTarget)
    

    fetch('http://localhost:3001/orders', {
      method: 'POST',
      body: JSON.stringify({
          nombre: formData.get("nombre"),
          cedula: formData.get("cedula"),
          direccion: formData.get("direccion"),
          correo_eletronico: formData.get("correo_electronico"),
          pedido: formData.get("pedido")
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form submitted successfully:', data);
        // Aquí puedes realizar acciones adicionales después de enviar el formulario
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // Aquí puedes manejar el error en caso de que ocurra algún problema al enviar el formulario
      });
  };

  return (
        <form className="tracking-wide font-bold text-lg" onSubmit={handleSubmit}>

            <div className="mb-2">
                <label className="label" htmlFor="nombre"> Nombre:</label>
                <input className="input  text-warning input-bordered w-full" type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder = "nombre y apellido" />
            </div>

            <div className="mb-2">
                <label className="label" htmlFor="cedula">Cedula:</label>
                <input className="input text-warning input-bordered w-full" type="number" id="cedula" name="cedula" value={formData.cedula} onChange={handleChange} placeholder = "numero de cedula:"/>
            </div>

            <div className="mb-2">
                <label className="label" htmlFor="direccion">Direccion: </label>
                <textarea className="input text-warning input-bordered  w-full" id="direccion"  name="direccion" rows="4" value={formData.direccion} onChange={handleChange} placeholder = "Ubicacion para la entrega" ></textarea>
            </div>

            <div className="mb-2">
                <label className="label" htmlFor="pedido">Pedido: </label>
                <textarea className="input text-warning input-bordered w-full" id="pedido" name="pedido" rows="4" value={formData.pedido} onChange={handleChange} placeholder = "Que deseas LLevar?" ></textarea>
            </div>
            
            <div className="mb-2">
                <label className="label" htmlFor="correo_electronico">Gmail:</label>

                <input className="input text-warning input-bordered w-full" id="correo_electronico" type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleChange} placeholder = "Correo Electronico" />
            </div>

            <button className="btn btn-primary w-full rounded" type="submit"> ENVIAR </button>
        </form>
  );
}

export default Formulario;
