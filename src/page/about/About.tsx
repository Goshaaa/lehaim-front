import Header from '../header/Header';
import { useTranslation } from "react-i18next";

function About() {
    const { t } = useTranslation();

    return (
        <>
            <Header title='О программе'></Header>
            <div className="container-lg">
                <div className="accordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingAbout">
                            <button className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseAbout"
                                aria-expanded="false"
                                aria-controls="collapseAbout">
                                Область применения
                            </button>
                        </h2>
                        <div id="collapseAbout"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingAbout">
                            <div className="accordion-body">
                                <div className="accordion">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOncology">
                                            <button className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOncology"
                                                aria-expanded="false"
                                                aria-controls="collapseOncology">
                                                Онкология
                                            </button>
                                        </h2>
                                        <div id="collapseOncology"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingOncology">
                                            <div className="accordion-body">
                                                <ul>
                                                    <li>Выявляет и подтверждает иммунокомпрометацию пациента</li>
                                                    <li>Фиксирует глубину и вид нарушения для иммунореабилитации</li>
                                                    <li>Оценивает вид регенерации у пациента</li>
                                                    <li>Формирует визуальный образ иммунологических нарушений пациента</li>
                                                    <li>Предназначен для пациентов с ЗНО: С34, С50, С64, С43, С18-19, С20-21, С61 и С49 (саркома Капоши) до и в ходе терапии</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingHematology">
                                            <button className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseHematology"
                                                aria-expanded="false"
                                                aria-controls="collapseHematology">
                                                Гематология
                                            </button>
                                        </h2>
                                        <div id="collapseHematology"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingHematology">
                                            <div className="accordion-body">
                                                <ul>
                                                    <li>Подтверждает приживаемость трансплантата ПГСК</li>
                                                    <li>Оценивает сохранность и/или вид иммуноповреждения после лечения</li>
                                                    <li>Помогает определить векторность иммунологической коррекции</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingSurgery">
                                            <button className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseSurgery"
                                                aria-expanded="false"
                                                aria-controls="collapseSurgery">
                                                Хирургия
                                            </button>
                                        </h2>
                                        <div id="collapseSurgery"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingSurgery">
                                            <div className="accordion-body">
                                                <ul>
                                                    <li>Документирует прогноз и риск осложнений после первичного химио/лучевого лечения пациента</li>
                                                    <li>Оценивает риск неблагоприятного исхода хирургического лечения</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTherapy">
                                            <button className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTherapy"
                                                aria-expanded="false"
                                                aria-controls="collapseTherapy">
                                                Терапия
                                            </button>
                                        </h2>
                                        <div id="collapseTherapy"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTherapy">
                                            <div className="accordion-body">
                                                <ul>
                                                    <li>Помогает определить патологический элемент системной воспалительной реакции</li>
                                                    <li>Проводит расчет параметров иммунограммы.(Расшифровка)</li>
                                                    <li>Оценивает динамику изменений иммунитета в сезонах весна/осень</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingRights">
                            <button className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseRights"
                                aria-expanded="false"
                                aria-controls="collapseRights">
                                {t('about.copyright.title')}
                            </button>
                        </h2>
                        <div id="collapseRights"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingRights">
                            <div className="accordion-body">
                                <h3>{t('about.copyright.attention')}</h3>
                                <p>{t('about.copyright.text1')}</p>
                                <p>{t('about.copyright.text2')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingAbbreviation">
                            <button className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseAbbreviation"
                                aria-expanded="false"
                                aria-controls="collapseAbbreviation">
                                {t('about.abbreviation.title')}
                            </button>
                        </h2>
                        <div id="collapseAbbreviation"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingAbbreviation">
                            <div className="accordion-body">
                                <ul>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.mot')}
                                        </span>
                                        - {t('about.abbreviation.motDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.g')}
                                        </span>
                                        - {t('about.abbreviation.gDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.tnm')}
                                        </span>
                                        - {t('about.abbreviation.tnmDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.neu')}
                                        </span>
                                        - {t('about.abbreviation.neuDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.mon')}
                                        </span>
                                        - {t('about.abbreviation.monDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.lymf')}
                                        </span>
                                        - {t('about.abbreviation.lymfDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.pl')}
                                        </span>
                                        - {t('about.abbreviation.plDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.neulymf')}
                                        </span>
                                        - {t('about.abbreviation.neulymfDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.neumon')}
                                        </span>
                                        - {t('about.abbreviation.neumonDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.lymfmon')}
                                        </span>
                                        - {t('about.abbreviation.lymfmonDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.siri')}
                                        </span>
                                        - {t('about.abbreviation.siriDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.piv')}
                                        </span>
                                        - {t('about.abbreviation.pivDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.densne')}
                                        </span>
                                        - {t('about.abbreviation.densneDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.cd19')}
                                        </span>
                                        - {t('about.abbreviation.cd19Definition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.cd4')}
                                        </span>
                                        - {t('about.abbreviation.cd4Definition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.cd8')}
                                        </span>
                                        - {t('about.abbreviation.cd8Definition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.cd3')}
                                        </span>
                                        - {t('about.abbreviation.cd3Definition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.neucd19cd19cdcd19cd8')}
                                        </span>
                                        - {t('about.abbreviation.neucd19cd19cdcd19cd8Definition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.neucd3neucd4neucd8')}
                                        </span>
                                        - {t('about.abbreviation.neucd3neucd4neucd8Definition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.il2')}
                                        </span>
                                        - {t('about.abbreviation.il2Definition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.ifny')}
                                        </span>
                                        - {t('about.abbreviation.ifnyDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.tnfa')}
                                        </span>
                                        - {t('about.abbreviation.tnfaDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.cvid')}
                                        </span>
                                        - {t('about.abbreviation.cvidDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.scid')}
                                        </span>
                                        - {t('about.abbreviation.scidDefinition')}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;