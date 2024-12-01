import { Link } from "react-router-dom";
import './Header.css';
import LanguageSwitcher from "../../components/LanguageSwitcher";

interface Props {
    title: string;
}

function Header({ title }: Props) {
    return (
        <nav className="header-navbar navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container-fluid">
                <Link to="/" className="header-main navbar-brand">
                    Le Ha Im
                </Link>
                <div className="navbar-collapse me-auto navbar-text">{title}</div>
                <LanguageSwitcher/>
            </div>
        </nav>
    );
}

export default Header;