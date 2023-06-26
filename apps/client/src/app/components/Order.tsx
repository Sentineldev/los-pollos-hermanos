import Formulario from './Formulario';

import NavBar from './NavBar';
import Map from './Map';
import {useTranslation} from "react-i18next";

const Order = () => { 
  const [t , i18n] = useTranslation("global");
  return (
   
    <>
    
      <div id="main" className="flex p-2 bg-info m-3">
        
        <div className="grid w-1/2 f card bg-base-300 rounded-box place-items-center h-2/5 mi-form ">
         


        <div className="btn-tradu">
          <ul className="menu menu-horizontal bg-base-300 u  rounded-box ">
          <li><a className="tooltip" data-tip="England" onClick={() => i18n.changeLanguage('en')} >🇬🇧</a></li>
          <li><a className="tooltip" data-tip="Espanol" onClick={() => i18n.changeLanguage('es')}>🇪🇸</a></li>
          </ul>
        </div>






          <h1 className='font-bold mt-5 text-xl'>
          {t("form.title")}
          </h1> 
          <br />
          <Formulario />
        </div>

        <div className="grid  ml-2 w-2/3 card mt-1  rounded-box   mi-div">
          
          <div className='w-full Nav '>
             <NavBar/>
          </div>
          <div className='border z-0 fixed components'>
             <Map/>
          </div>
        
        </div>

      </div>
    </>
  );
};
export default Order;
