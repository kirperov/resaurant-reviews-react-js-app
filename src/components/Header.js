import style from "../assets/styles/header.module.css";
import logo from "../assets/images/logo.png";

function Header() {
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <img src={logo} alt="good food" />
      </div>
    </div>
  );
}

export default Header;
