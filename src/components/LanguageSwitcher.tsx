import i18n from '../i18n';
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <select
                className="form-select"
                style={{ width: '70px' }}
                value={i18n.language}
                onChange={handleLanguageChange}>
                <option value="ru">RU</option>
                <option value="en">EN</option>
            </select>

        </>
    );
}

export default LanguageSwitcher;