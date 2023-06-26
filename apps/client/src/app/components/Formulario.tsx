import { useEffect, useState } from 'react';
import axios from 'axios';
import { DatabaseDish } from '../shared/interfaces/database-dish.interface';
import { Order } from '../shared/classes/Order.class';
import { OrderDish } from '../shared/classes/OrderDish.class';
import {useTranslation} from "react-i18next";


interface Platillo {
  plate_id: string;
  name: string;
  description: string;
  price: number;
}
interface ElementoPedido{
  platillo: Platillo,
  conteo: number;
}

function Formulario() {
  const [t] = useTranslation("global"); //Para la traduccion

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
      try {
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
        else{
          alert("No se pudieron cargar los platillos, intente denuevo 😢.")
        }
      } catch (error) {
        alert("No se pudieron cargar los platillos, intente denuevo 😢.")
      }
    };

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
    setResponse('');
    if (pedido === '') {
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

    <form className="mi-form w-full font-bold text-info text-lg" onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <div className="m-1">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="nombre">
              <span className="label-text text-info">{t("form.name")}</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              required
              placeholder={t("form.label_name")}
              className="input shadow-lg input-ghost w-full  max-w-xs"
            />
          </div>
        </div>

        <div className="m-1">
          <label className="label" htmlFor="cedula">
            <span className="label-text text-info ">{t("form.id")}</span>
          </label>
          <input
            required
            className="input shadow-lg  input-ghost w-full max-w-xs"
            type="number"
            id="cedula"
            name="cedula"
            value={values.cedula}
            onChange={handleChange}
            placeholder="1234567"
          />
        </div>
      </div>

      

      <div className="">
        <label className="label" htmlFor="correo_electronico">
          <span className="label-text text-info">{t("form.email")}</span>
        </label>

        <input
          required
          className="input resize-none shadow-lg input-ghost w-full"
          id="correo_electronico"
          type="email"
          name="correo_electronico"
          value={values.correo_electronico}
          onChange={handleChange}
          placeholder="lospolloshermanos@email.com"
        />
      </div>

      <div className="">
        <label className="label" htmlFor="direccion">
          <span className="label-text  text-info">{t("form.direction")}</span>
        </label>
        <textarea
          required
          maxLength="100"
          className="input  resize-none shadow-lg  input-ghost w-full"
          id="direccion"
          name="direccion"
          rows={2}
          value={values.direccion}
          onChange={handleChange}
          placeholder={t("form.label_direc")}
        ></textarea>
      </div>

      <label className="label mt-2 mb-2" htmlFor="pedido">
        <span className="label-text text-info">{t("form.order")}</span>
      </label>
      <div className="flex flex-col  gap-2">
        {listaPlatillos.map((platillo: Platillo) => (
          <div
            key={platillo.plate_id}
            className=" flex  flex-row text-sm rounded text-start px-2 shadow-lg "
          >
            <span className="indicator-item badge badge-success">
              {platillo.price + '$'}
            </span>
            <p className=" self-center mx-2 flex-col w-1/2 text-base">
              {platillo.name}
            </p>

            <div
              onClick={(e) => BotonAgregarManejador(e, platillo)}
              className=" mx-1 p-2 btn-circle btn text-2xl btn-ghost"
            >
              +
            </div>
            <div
              onClick={(e) => BotonRemoverManejador(e, platillo)}
              className=" mx-1 btn-circle  text-2xl  btn btn-ghost "
            >
              -
            </div>
          </div>
        ))}
      </div>

      <textarea
        className="textarea text-info input-ghost resize-none input-bordered w-full mt-3"
        id="pedido"
        name="pedido"
        rows={7}
        readOnly
        value={pedido}
        onChange={handleChange}
        placeholder={t("form.label_order")}
      ></textarea>

      {response.length > 0 ? <p>{response}</p> : <></>}
      <button className="btn btn-outline w-1/2 btn-success" type="submit">
      {t("btn.btn-form")}
      </button>
    </form>
  );
}

export default Formulario;
