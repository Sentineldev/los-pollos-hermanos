import React, { MouseEventHandler, useEffect, useState } from 'react';
import axios from 'axios';
import { toArray } from 'rxjs';


interface Platillo {
  plate_id: string,
  name: string,
  description: string,
  price:  number
}
interface ElementoPedido{
  platillo: Platillo,
  conteo: number
}

function Formulario() {

    const[values,setValues] = useState({
    nombre: "",
    cedula: "",
    direccion: "",
    pedido:"",
    correo_electronico:""
    })
    const [listaPlatillos,setListaPlatillos] = useState([]);
    const [listaPedido,setListaPedido] = useState([]);
    const [pedido, setPedido] = useState("");
    const [response,setResponse] = useState("")

   //FormData setFormData

   useEffect(()=>{
    const loadProducts = async () =>{

      const request = await axios.get("/api/plate")

      if(request.status === 200){
        setListaPlatillos(request.data)
      }

    }

    loadProducts();
   },[])


   useEffect(() => {

    let nuevo_pedido = ``;
    let total = 0;
    for(const elemento of listaPedido){
      const aux = `${elemento.platillo.name} ${elemento.platillo.price} X ${elemento.conteo}\n`
      total+= elemento.platillo.price * elemento.conteo;

      nuevo_pedido = nuevo_pedido.concat(aux)
    }
    nuevo_pedido = nuevo_pedido.concat("---------------------------------------------------------------------\n")
    nuevo_pedido = nuevo_pedido.concat(`Total a cancelar: ${total} $`);
    if(!(listaPedido.length === 0)){
      setPedido(nuevo_pedido)
    }

   },[listaPedido])

   function BotonAgregarManejador(e: any,platillo: Platillo){

    const busqueda = listaPedido.find((elemento: ElementoPedido ) => elemento.platillo.plate_id === platillo.plate_id)

    if(!busqueda){
      const nueva_lista = [].concat(listaPedido)
      nueva_lista.push({ platillo, conteo:1 })
      setListaPedido(nueva_lista)
    }
    else {
      const nueva_lista = listaPedido.map((elemento: ElementoPedido) => {
        if(elemento.platillo.plate_id === platillo.plate_id){
          elemento.conteo++;
        }
        return elemento
      })
      setListaPedido(nueva_lista);
    }

   }
   function BotonRemoverManejador(e: any, platillo: Platillo){

    const busqueda = listaPedido.find((elemento: ElementoPedido) => elemento.platillo.plate_id === platillo.plate_id );

    if(busqueda){
      const aux = listaPedido.map((elemento: ElementoPedido) => {
        if(elemento.platillo.plate_id === platillo.plate_id){
          elemento.conteo--;
        }
        return elemento
      })

      const nueva_lista: any = aux.filter((elemento: ElementoPedido) => elemento.conteo > 0)
      setListaPedido(nueva_lista);
    }
  }


  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Evita el comportamiento predeterminado de recargar la página al enviar el formulario
    setResponse("");
    if(pedido === ""){
      return;
    }
    try {
      const formData: any = new FormData(e.target); // Obtén los datos del formulario
      const requestData = Object.fromEntries(formData.entries()); // Convierte los datos del formulario en un objeto

      const response = await axios.post('http://localhost:3000/api/orders', requestData); // Envía los datos a la API utilizando Axios
      console.log(response.status)
      if(response.status === 200 || response.status === 201){
        setListaPedido([]);
        setPedido("");
        setResponse("\n Su pedido esta en proceso, revise su correo para verificar su pedido, gracias! 😊 \n");
        setValues({
          nombre: "",
          cedula: "",
          direccion: "",
          pedido:"",
          correo_electronico:""
          })
      }
      // Maneja la respuesta de la API según tus necesidades
      console.log(response.data); // Ejemplo: imprime la respuesta en la consola
    } catch (error) {
      setResponse("Hubo un error al realizar su pedido 😢. Por favor intente denuevo ");
      // Maneja el error según tus necesidades
      console.error(error);
    }
  };


  return (
        <form className="tracking-wide font-bold text-lg  " onSubmit={handleSubmit}>
          <div className='flex justify-between'>
                        <div className="mb-1">
                            <label className="label" htmlFor="nombre"> Nombre:</label>
                            <input required className="input  text-info input-bordered w-full" type="text" id="nombre" name="nombre" value={values.nombre} onChange={handleChange} placeholder = "nombre y apellido" />
                        </div>

                        <div className="mb-1 ml-1">
                            <label className="label" htmlFor="cedula">Cedula:</label>
                            <input required className="input text-info input-bordered w-full" type="number" id="cedula" name="cedula" value={values.cedula} onChange={handleChange} placeholder = "numero de cedula:"/>
                        </div>
           </div>
            
           <div className='flex justify-between'>
            <div className="mb-1 flex-initial w-72">
                <label className="label" htmlFor="direccion">Direccion: </label>
                <textarea required className="input text-info input-bordered  w-full" id="direccion"  name="direccion" rows={1} value={values.direccion} onChange={handleChange} placeholder = "Ubicacion para la entrega" ></textarea>
            </div>

            <div className="mb-1 flex-auto  ml-2 ">
                <label className="label" htmlFor="correo_electronico">Gmail:</label>

                <input required className="input text-info  input-bordered w-full" id="correo_electronico" type="email" name="correo_electronico" value={values.correo_electronico} onChange={handleChange} placeholder = "Correo Electronico" />
            </div>
          </div>


            <div className="mb-1">
                <label className="label" htmlFor="pedido">Pedido: </label>
                <div className='flex flex-col  gap-2'>
                  {
                    listaPlatillos.map((platillo: Platillo) =>
                      <div className=' flex flex-row bg-base-100 text-info p-0  text-center rounded-md text-start px-4 shadow-lg shadow-slate-400'>
                        
                          <p className=' self-center col-span-2 text-base'>{platillo.name}</p>
                          <button type='button' onClick={(e) => BotonAgregarManejador(e,platillo)} className=' mx-1 btn-circle btn text-2xl btn-ghost'>+</button>
                          <button type='button' onClick={(e) => BotonRemoverManejador(e,platillo)} className=' mx-1 btn-circle text-2xl  btn btn-ghost '>-</button>
                        </div>
                      

                    )
                  }
                </div>

                <textarea className="textarea text-info input-bordered w-full mt-3" id="pedido" name="pedido" rows={7} readOnly value={pedido} onChange={handleChange} placeholder = "Que deseas LLevar?" ></textarea>
            </div>
            {response.length > 0 ? <p>{response}</p> : <></>}
            <button className="btn btn-primary text-neutral w-full rounded" type="submit"> ENVIAR </button>
        </form>
  );
}

export default Formulario;
