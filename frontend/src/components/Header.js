import React from 'react';
import { NavLink } from 'react-router-dom';
import mainLogo from '../images/logo_main.svg';

function Header({ loggedIn, userEmail, handleSignOut }) {
  const [isOpen, setIsOpen] = React.useState(false);

  function handleBtnClick() {
    setIsOpen(!isOpen);
  }
  return (
    <header className={`header ${isOpen && loggedIn && 'header_burger-open'}`}>
      <div className={`header__container ${loggedIn ? 'header__container_burger-active' : ''}`}>
        <img className="header__logo" src={mainLogo} alt="Логотип" />
        <button
          className={`burger-btn ${loggedIn ? 'burger-btn_active' : ''}`}
          type='button'
          onClick={handleBtnClick}>
          <span className={`burger-btn__item ${isOpen ? 'burger-btn__item_close' : ''}`}></span>
        </button>
      </div>
      <nav className={`header__nav ${isOpen && loggedIn && 'header__nav_burger-open'} ${loggedIn && 'header__nav_burger-active'}`}>
        <span className="header__text">{userEmail}</span>
        <NavLink
          to="/sign-in"
          className={`header__link ${loggedIn && 'header__link_active'}`}
          activeClassName='header__link_active'>
          Войти
        </NavLink>
        <NavLink
          to="/sign-up"
          className={`header__link ${loggedIn && 'header__link_active'}`}
          activeClassName='header__link_active'>
          Регистрация
        </NavLink>
        <button className={`header__button ${loggedIn && 'header__button_active'}`} onClick={handleSignOut}>Выйти</button>
      </nav>
    </header>
  );
}

export default Header;



// {/* <header className="header">
//       {/* <nav className={`header__burger-menu ${isOpen && loggedIn ? 'header__burger-menu_active' : ''}`}> */}
//         {/* <span className="header__text">{userEmail}</span> */}
//         {/* <button className={`header__button ${loggedIn && 'header__button_active'}`} onClick={handleSignOut}>Выйти</button> */}
//       {/* </nav> */}
//       <div className={`header__container ${loggedIn ? 'header__container_burger-active' : ''}`}>
//         <img className="header__logo" src={mainLogo} alt="Логотип" />
//         <nav className={`header__nav ${loggedIn ? 'header__nav_burger-active' : ''}`}>
//           <span className="header__text">{userEmail}</span>
//           <NavLink
//             to="/sign-in"
//             className={`header__link ${loggedIn && 'header__link_active'}`}
//             activeClassName='header__link_active'>
//             Войти
//           </NavLink>
//           <NavLink
//             to="/sign-up"
//             className={`header__link ${loggedIn && 'header__link_active'}`}
//             activeClassName='header__link_active'>
//             Регистрация
//           </NavLink>
//           <button className={`header__button ${loggedIn && 'header__button_active'}`} onClick={handleSignOut}>Выйти</button>
//         </nav>
//         <button
//           className={`burger-btn ${loggedIn ? 'burger-btn_active' : ''}`}
//           type='button'
//           onClick={handleBtnClick}>
//           <span className={`burger-btn__item ${isOpen ? 'burger-btn__item_close' : ''}`}></span>
//         </button>
//       </div>
//     </header>
//   ); */}