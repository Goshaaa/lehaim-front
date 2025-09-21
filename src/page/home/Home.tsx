import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import './Home.css';
import LanguageSwitcher from '../../components/LanguageSwitcher';

function Home() {
    const { t } = useTranslation();

    return (
        <>
            <header className="home-header clearfix">
                <div className='d-flex justify-content-end'>
                    <Link to="/about">
                        <button type="button" className="btn btn-outline-dark me-3">
                            {t('home.about')}
                        </button>
                    </Link>

                    <LanguageSwitcher />
                </div>
            </header>
            <div className="home">
                <h1 className="home-title">Le Ha Im</h1>
                <p className="home-description">
                    {t('home.headTitle')}
                </p>
                <Link to="/searhPatient">
                    <button type="button" className="btn btn-outline-dark">
                        {t('home.start')}
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Home;