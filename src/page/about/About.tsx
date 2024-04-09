import Header from '../header/Header';

function About() {
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
                                                    <li>Подтверждает приживаемость трастплантата ПГСК</li>
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
                                Авторсике права
                            </button>
                        </h2>
                        <div id="collapseRights"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingRights">
                            <div className="accordion-body">
                                <h3>Внимание</h3>
                                <p>Данный сервис является объектом интеллектуальной собственности и охраняется законом.</p>
                                <p>Любое использование содержимого третьими лицами возможно только с письменного разрешения владельца</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;