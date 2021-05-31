import style from './header.module.css'

function Header() {
    return (
        <div className={`${style.header} ${style.test}`}>Header</div>
    )
}

export default Header