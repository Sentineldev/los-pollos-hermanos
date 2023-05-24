import Formulario from './Formulario';
import logo from "../../assets/img/p_2.png";

const Order= () => {
  return (
      <>
      <div className="hero min-h-screen bg-base-300  ">
        <div className="hero-content flex-col  lg:flex-row-reverse">

          <div className="text-center">
            <h1 className="text-4xl mb-5 text-primary font-bold">Delivery RapiGod</h1>
            
            
            <img className='w-50 lazamania ' src={logo} alt="Pollos_Hermanos" />

            <p className="py-6 text-primary text-lg ">Realiza tu compra rellenando los siguientes campos, luego de este paso nuestro equipo de trabajo le hara llegar su pedido super Rapido.</p>

          </div>

          <div className="card flex-shrink-0 w-5/6 self-center mi-div text-neutral max-w-xl shadow-2xl p-1 bg-warning ">
            <div className="card-body">  
            <Formulario/>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
export default Order;