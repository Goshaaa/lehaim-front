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
                                Авторские права
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

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingAbbreviation">
                            <button className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseAbbreviation"
                                aria-expanded="false"
                                aria-controls="collapseAbbreviation">
                                Список сокращений
                            </button>
                        </h2>
                        <div id="collapseAbbreviation"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingAbbreviation">
                            <div className="accordion-body">
                                <ul>
                                    <li>
                                        <span className='fw-bold'>ЗНО</span> - злокачественное образование
                                    </li>
                                    <li>
                                        <span className='fw-bold'>G</span> - степень дифференцировки опухоли
                                    </li>
                                    <li>
                                        <span className='fw-bold'>TNM</span> - критерии классификации - тумор, нодуль, метастаз
                                    </li>
                                    <li>
                                        <span className='fw-bold'>Neu</span> - нейтрофильные лейкоциты
                                    </li>
                                    <li>
                                        <span className='fw-bold'>Mon</span> - моноциты
                                    </li>
                                    <li>
                                        <span className='fw-bold'>Lymf</span> - лимфоциты
                                    </li>
                                    <li>
                                        <span className='fw-bold'>Pl</span> - тромбоциты
                                    </li>
                                    <li>
                                        <span className='fw-bold'>Neu/Lymf</span> - индекс абс. числа нейтрофилов/лимфоцитов
                                    </li>
                                    <li>
                                        <span className='fw-bold'>Neu/Mon</span> - индекс абс. числа нейтрофилов/моноцитов
                                    </li>
                                    <li>
                                        <span className='fw-bold'>Lymf/Mon</span> - индекс абс. числа лимфоциов/моноцитов
                                    </li>
                                    <li>
                                        <span className='fw-bold'>SiRi</span> - индекс системного воспалительного ответа = Neu x Mon/Lym
                                    </li>
                                    <li>
                                        <span className='fw-bold'>PiV</span> - общий иммуно-воспалительный индекс=Neu x Pl x Mon/Lym
                                    </li>
                                    <li>
                                        <span className='fw-bold'>DensNe</span> - плотность нейтрофильв= Ne/(Lym+Mon)
                                    </li>
                                    <li>
                                        <span className='fw-bold'>CD19+</span> - количество В-лимфоцитов
                                    </li>
                                    <li>
                                        <span className='fw-bold'>CD4+</span> - количество субпопуляции Т-лимфоцитов-хелперов
                                    </li>
                                    <li>
                                        <span className='fw-bold'>CD8+</span> - количество субпопуляции Т-лимфоцитов-киллеры
                                    </li>
                                    <li>
                                        <span className='fw-bold'>CD3</span> - общие Т-клеточные лимфоциты
                                    </li>
                                    <li>
                                        <span className='fw-bold'>Neu/CD19; CD19/СD+; CD19/СD8+</span> - интегральные критерии визуализации В-клеточного звена иммунитета
                                    </li>
                                    <li>
                                        <span className='fw-bold'>Neu/СD3; Neu/CD4+; Neu/CD8+</span> - интегральные критерии визуализации Т-коеточного звена иммунитета
                                    </li>
                                    <li>
                                        <span className='fw-bold'>IL-2</span> - интерлейкин-2
                                    </li>
                                    <li>
                                        <span className='fw-bold'>IFNy</span> - интерферон гамма
                                    </li>
                                    <li>
                                        <span className='fw-bold'>TNFa</span> - фактор некроза опухоли альфа
                                    </li>
                                    <li>
                                        <span className='fw-bold'>ОВИД</span> - общевариабельный иммунодефицит (В-клеточный)
                                    </li>
                                    <li>
                                        <span className='fw-bold'>ТКИД</span> - тяжелый комбинированный иммунодефицит (Т-клеточный)
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