import logo from "../assets/img/l.png";


const NavBar = () => {
  return (
    <>
      {/* Menu Tlf */}
      <div className="navbar bg-warning rounded font-medium text-neutral">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-warning rounded-box w-50">
              <li><a>Home</a></li>
              <li> <a>Products</a> </li>
              <li><a>Nosotros</a></li>
            </ul>
          </div>
          <img className='w-16 cursor-pointer ml-12 ' src={logo} alt="Pollos_Hermanos" />
        </div>

        {/* Menu desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Home</a></li>
            <li> <a>Products</a> </li>
            <li><a>Nosotros</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn  btn-primary font-bold">Login</a>
        </div>
      </div>

    </>
  );
};

export default NavBar;
