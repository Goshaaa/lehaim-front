import Header from '../header/Header';
import { useTranslation } from "react-i18next";

function About() {
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const getDemoVideoSrc = (): string => {
        if (i18n.language == "en") {
            return "https://rutube.ru/play/embed/bcc2999c2706b63a1fa615db22002b03?skinColor=9e9e9e"
        }
        return "https://rutube.ru/play/embed/1aabf7861e33400c709aa2f3034de175?skinColor=9e9e9e"
    }

    return (
        <>
            <Header title={t('about.pageTitle')}></Header>
            <div className="container-lg">
                <div className="accordion">

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingDemo">
                            <button className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseDemo"
                                aria-expanded="false"
                                aria-controls="collapseDemo">
                                {t('about.projectDemo.title')}
                            </button>
                        </h2>
                        <div id="collapseDemo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingDemo">
                            <div className="accordion-body d-flex justify-content-center">
                                <iframe width="720" height="405"
                                    src={getDemoVideoSrc()}
                                    allow="clipboard-write; autoplay"
                                    custom-attribute="webkitAllowFullScreen mozallowfullscreen allowFullScreen"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingAbout">
                            <button className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseAbout"
                                aria-expanded="false"
                                aria-controls="collapseAbout">
                                {t('about.scope.title')}
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
                                                {t('about.scope.oncology.title')}
                                            </button>
                                        </h2>
                                        <div id="collapseOncology"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingOncology">
                                            <div className="accordion-body">
                                                <ul>
                                                    <li>{t('about.scope.oncology.onco_1')}</li>
                                                    <li>{t('about.scope.oncology.onco_2')}</li>
                                                    <li>{t('about.scope.oncology.onco_3')}</li>
                                                    <li>{t('about.scope.oncology.onco_4')}</li>
                                                    <li>{t('about.scope.oncology.onco_5')}</li>
                                                    <li>{t('about.scope.oncology.onco_6')}</li>
                                                    <li>{t('about.scope.oncology.onco_7')}</li>
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
                                                {t('about.scope.hematology.title')}
                                            </button>
                                        </h2>
                                        <div id="collapseHematology"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingHematology">
                                            <div className="accordion-body">
                                                <ul>
                                                    <li>{t('about.scope.hematology.hemato_1')}</li>
                                                    <li>{t('about.scope.hematology.hemato_2')}</li>
                                                    <li>{t('about.scope.hematology.hemato_3')}</li>
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
                                                {t('about.scope.surgery.title')}
                                            </button>
                                        </h2>
                                        <div id="collapseSurgery"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingSurgery">
                                            <div className="accordion-body">
                                                <ul>
                                                    <li>{t('about.scope.surgery.surgery_1')}</li>
                                                    <li>{t('about.scope.surgery.surgery_2')}</li>
                                                    <li>{t('about.scope.surgery.surgery_3')}</li>
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
                                                {t('about.scope.therapy.title')}
                                            </button>
                                        </h2>
                                        <div id="collapseTherapy"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTherapy">
                                            <div className="accordion-body">
                                                <ul>
                                                    <li>{t('about.scope.therapy.therapy_1')}</li>
                                                    <li>{t('about.scope.therapy.therapy_2')}</li>
                                                    <li>{t('about.scope.therapy.therapy_3')}</li>
                                                    <li>{t('about.scope.therapy.therapy_4')}</li>
                                                    <li>{t('about.scope.therapy.therapy_5')}</li>
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
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.si')}
                                        </span>
                                        - {t('about.abbreviation.siDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.iih')}
                                        </span>
                                        - {t('about.abbreviation.iihDefinition')}
                                    </li>
                                    <li>
                                        <span className='fw-bold'>
                                            {t('about.abbreviation.mof')}
                                        </span>
                                        - {t('about.abbreviation.mofDefinition')}
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