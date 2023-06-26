import React, { MouseEventHandler, useEffect, useState } from 'react';
import axios from 'axios';
import { toArray } from 'rxjs';
import {useTranslation} from "react-i18next";

interface Platillo {
  plate_id: string;
  name: string;
  description: string;
  price: number;
}
interface ElementoPedido {
  platillo: Platillo;
  conteo: number;
}

function Formulario() {
  const [t] = useTranslation("global"); //Para la traduccion



  const [values, setValues] = useState({
    nombre: '',
    cedula: '',
    direccion: '',
    pedido: '',
    correo_electronico: '',
  });
  const [listaPlatillos, setListaPlatillos] = useState([]);
  const [listaPedido, setListaPedido] = useState([]);
  const [pedido, setPedido] = useState('');
  const [response, setResponse] = useState('');

  //FormData setFormData

  useEffect(() => {
    const loadProducts = async () => {
      const request = await axios.get('/api/plate');

      if (request.status === 200) {
        setListaPlatillos(request.data);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let nuevo_pedido = ``;
    let total = 0;
    for (const elemento of listaPedido) {
      const aux = `${elemento.platillo.name} ${elemento.platillo.price} X ${elemento.conteo}\n`;
      total += elemento.platillo.price * elemento.conteo;

      nuevo_pedido = nuevo_pedido.concat(aux);
    }
    nuevo_pedido = nuevo_pedido.concat(
      '---------------------------------------------------------------------\n'
    );
    nuevo_pedido = nuevo_pedido.concat(`${t("api.paymet")}: ${total} $`);
    if (!(listaPedido.length === 0)) {
      setPedido(nuevo_pedido);
    }
  }, [listaPedido]);

  function BotonAgregarManejador(e: any, platillo: Platillo) {
    const busqueda = listaPedido.find(
      (elemento: ElementoPedido) =>
        elemento.platillo.plate_id === platillo.plate_id
    );

    if (!busqueda) {
      const nueva_lista = [].concat(listaPedido);
      nueva_lista.push({ platillo, conteo: 1 });
      setListaPedido(nueva_lista);
    } else {
      const nueva_lista = listaPedido.map((elemento: ElementoPedido) => {
        if (elemento.platillo.plate_id === platillo.plate_id) {
          elemento.conteo++;
        }
        return elemento;
      });
      setListaPedido(nueva_lista);
    }
  }
  function BotonRemoverManejador(e: any, platillo: Platillo) {
    const busqueda = listaPedido.find(
      (elemento: ElementoPedido) =>
        elemento.platillo.plate_id === platillo.plate_id
    );

    if (busqueda) {
      const aux = listaPedido.map((elemento: ElementoPedido) => {
        if (elemento.platillo.plate_id === platillo.plate_id) {
          elemento.conteo--;
        }
        return elemento;
      });

      const nueva_lista: any = aux.filter(
        (elemento: ElementoPedido) => elemento.conteo >= 0
      );
      setListaPedido(nueva_lista);
    }
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
    try {
      const formData: any = new FormData(e.target); // Obtén los datos del formulario
      const requestData = Object.fromEntries(formData.entries()); // Convierte los datos del formulario en un objeto

      const response = await axios.post(
        'http://localhost:3000/api/orders',
        requestData
      ); // Envía los datos a la API utilizando Axios
      console.log(response.status);
      if (response.status === 200 || response.status === 201) {
        setListaPedido([]);
        setPedido('');
        setResponse(
          '\n Su pedido esta en proceso, revise su correo para verificar su pedido, gracias! 😊 \n'
        );
        setValues({
          nombre: '',
          cedula: '',
          direccion: '',
          pedido: '',
          correo_electronico: '',
        });
      }
      // Maneja la respuesta de la API según tus necesidades
      console.log(response.data); // Ejemplo: imprime la respuesta en la consola
    } catch (error) {
      setResponse(
        'Hubo un error al realizar su pedido 😢. Por favor intente denuevo '
      );
      // Maneja el error según tus necesidades
      console.error(error);
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
