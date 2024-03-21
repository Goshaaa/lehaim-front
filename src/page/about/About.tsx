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
                                                    <li>Целесообразность применения для наблюдения за пациентами с раком легкого C50, C64, C43, Саркома Капоша, C18-20</li>
                                                    <li>Докумменатция иммунокопрометации пациента</li>
                                                    <li>Фиксация глубины и вида нарушения для реабилитации</li>
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
                                                    <li>Оценка степени регенерации пациента</li>
                                                    <li>Прогноз осложнений для пересадки переферических стволовых клеток</li>
                                                    <li>Мониторинг</li>
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
                                                    <li>Документирует риски послеоперационных осложнений (особенно после химио и лучевого компонента) </li>
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