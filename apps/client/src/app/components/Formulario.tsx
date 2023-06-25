import { useEffect, useState } from 'react';
import axios from 'axios';
import { DatabaseDish } from '../shared/interfaces/database-dish.interface';
import { Order } from '../shared/classes/Order.class';
import { OrderDish } from '../shared/classes/OrderDish.class';


interface Platillo {
  plate_id: string,
  name: string,
  description: string,
  price:  number
}
interface ElementoPedido{
  platillo: Platillo,
  conteo: number,
}

function Formulario() {

    const[values,setValues] = useState({
    nombre: "",
    cedula: "",
    direccion: "",
    pedido:"",
    correo_electronico:""
    })
    const [listaPlatillos,setListaPlatillos] = useState<Platillo[]>([]);
    const [listaPedido,setListaPedido] = useState<ElementoPedido[]>([]);
    const [pedido, setPedido] = useState("");
    const [response,setResponse] = useState("")


   //FormData setFormData


   //Actualiza el arreglo de platillos la primera vez que se inicia el componente.
   useEffect(()=>{
    const loadProducts = async () =>{
      const request = await axios.get("/api/dish")
      if(request.status === 200){
        
        const platillos: DatabaseDish[] = request.data;
        const lista_platillos: Platillo[] = platillos.map((elemento: DatabaseDish) => {
          return { 
            plate_id: String(elemento.dish_id),
            name: elemento.name,
            description: elemento.description,
            price: elemento.price
          }
        })
        setListaPlatillos(lista_platillos);
      }

    }

    loadProducts();
   },[])


   //Genera un string con los detalles del pedido cada vez que se actualiza la lista.
   useEffect(() => {
      setPedido(armarPedido());
   },[listaPedido])

   //Limpia los campos una vez el pedido es enviado.
   function reset(){
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

   //Arma el string con los detalles del pedido.
   function armarPedido(): string{
    let pedido = "";
    let total_a_cancelar = 0;

    for(const elemento of listaPedido){
      const sub_total = elemento.platillo.price * elemento.conteo;
      console.log(sub_total)
      const platillo_pedido = `${elemento.platillo.name} ${Number(elemento.platillo.price).toFixed(2)} $ X ${elemento.conteo}: ${Number(sub_total).toFixed(2)} $\n`
      total_a_cancelar+=(sub_total);
      pedido = pedido.concat(platillo_pedido);
    }
   
    pedido = pedido.concat("---------------------------------------------------------------------\n");
    pedido = pedido.concat(`Total a cancelar: ${Number(total_a_cancelar).toFixed(2)} $`);

    return pedido;
  }

    //Obtiene el indice donde se encuentra el platillo en la lista del pedido.
   function getPlateIndex(id: string): number{
    for (let index = 0; index < listaPedido.length; index++) {
      if(listaPedido[index].platillo.plate_id === id) {
        return index;
      }      
    }
    return -1;
   }


   //Se encarga de incrementar o agregar un platillo al pedido.
   function BotonAgregarManejador(e: any,platillo: Platillo){

    const indice = getPlateIndex(platillo.plate_id);
    if(indice >= 0){
      listaPedido[indice].conteo++;
    }
    else{
      listaPedido.push({platillo, conteo:1});
    }
    const nueva_lista = listaPedido.map(elemento => elemento);
    setListaPedido(nueva_lista);
   }

   //Se encargad de decrementar o remover por completo un platillo del pedido.
   function BotonRemoverManejador(e: any, platillo: Platillo){

    const indice = getPlateIndex(platillo.plate_id);

    if(indice < 0) return;

    listaPedido[indice].conteo--;
    
    const aux = listaPedido.filter(element => element.conteo !== 0);
    const nueva_lista = aux.map(elemento => elemento);
    setListaPedido(nueva_lista);
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

    const formData: any = new FormData(e.target); // Obtén los datos del formulario
    const requestData = Object.fromEntries(formData.entries()); // Convierte los datos del formulario en un objeto
    
    //Inicializa un objeto con los detalles de la ornde.
    const new_order = new Order();
    new_order.setClientName(requestData.nombre);
    new_order.setClientId(requestData.cedula);
    new_order.setClientAddress(requestData.direccion);
    new_order.setClientEmail(requestData.correo_electronico);
    
    let total_a_pagar = 0;


    
    for(const elemento of listaPedido){
      total_a_pagar+=(elemento.conteo * elemento.platillo.price);
    }
    const dishes_order: OrderDish[] = listaPedido.map(elemento => {
      return new OrderDish(Number(elemento.platillo.plate_id),elemento.conteo);
    })
    new_order.setDishes(dishes_order);
    new_order.setOrderBill(total_a_pagar);

    const data = JSON.stringify(new_order);

    try {
      const response = await axios.post('/api/order',data,{
        headers:{ 'Content-Type':'application/json' }
      }); // Envía los datos a la API utilizando Axios

      if(response.status === 200 || response.status === 201){
        reset();
      }
      else{
        setResponse("Hubo un error al realizar su pedido 😢. Por favor intente denuevo ");
      }
      
    } catch (error) {
      setResponse("Hubo un error al realizar su pedido 😢. Por favor intente denuevo ");
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
