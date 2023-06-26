import logo from '../../assets/img/p_2.png';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const [t, i18n] = useTranslation('global');

  return (
    <>
      {/* Menu Tlf */}
      <div className="navbar rounded bg-neutral ">
        <div className="flex-1 ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-neutral rounded-box w-50"
            >
              <li>
                <a className="rounded"> {t('navbar.home')} </a>{' '}
              </li>
              <li>
                <a className="rounded">{t('navbar.products')}</a>{' '}
              </li>
              <li>
                <a className="rounded">{t('navbar.contact')}</a>
              </li>
            </ul>
          </div>
          <div
            className="tooltip w-28 tooltip-right"
            data-tip="Los Pollos Hermanos"
          >
            <img className="w-full  " src={logo} alt="Pollos_Hermanos" />
          </div>
        </div>

        {/* Menu desktop */}
        <div className=" navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <li>
              <a className="rounded"> {t('navbar.home')} </a>{' '}
            </li>
            <li>
              <a className="rounded">{t('navbar.products')}</a>{' '}
            </li>
            <li>
              <a className="rounded">{t('navbar.contact')}</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <ul className="menu menu-horizontal bg-base-100 rounded-box ">
          <li><a className="tooltip" data-tip="England" onClick={() => i18n.changeLanguage('en')} >🇬🇧</a></li>
          <li><a className="tooltip" data-tip="Espanol" onClick={() => i18n.changeLanguage('es')}>🇪🇸</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
