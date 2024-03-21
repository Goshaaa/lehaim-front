import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <>
            <header className="home-header clearfix">
                <Link to="/about" className="home-header-about">
                    <button type="button" className="btn btn-outline-secondary">О программе</button>
                </Link>
            </header>
            <div className="home">
                <h1 className="home-title">Le Ha Im</h1>
                <p className="home-description">Калькулятор иммунодефицита и регенерации</p>
                <Link to="/searhPatient">
                    <button type="button" className="btn btn-outline-secondary">Начать</button>
                </Link>
            </div>
        </>
    );
}

export default Home;