import Formulario from './Formulario';
import logo from "../../assets/img/p_2.png";
import Maap from './Maap';

const Order= () => {
  return (
      <>
      <div className="hero min-h-screen bg-base-300  ">

        <div className="hero-content flex-col  lg:flex-row-reverse">

          <div className="text-center lazamania rounded-lg border-4 border-indigo-200 border-b-indigo-500 ">
            <h1 className="text-4xl mb-5 text-primary font-bold">BIENVENIDOS</h1>
            <img className='w-50' src={logo} alt="Pollos_Hermanos" />
            <p className="py-6 text-primary text-lg ">Realiza tu compra rellenando los siguientes campos, luego de este paso nuestro equipo de trabajo le hara llegar su pedido super Rapido.</p>
          </div>

          {/*aca separacion */}

          <div className="card flex-shrink-0 w-full self-center mi-div text-neutral max-w-xl shadow-2xl form p-0 bg-warning ">
            <div className="card-body">  
            <Formulario/>
            <Maap/>
            </div>
          </div>

        </div>
       
      </div>
    </>
  );
};
export default Order;