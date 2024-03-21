import { useState, useEffect } from 'react';
import Header from "../header/Header";
import CatalogParamItem from './CatalogParamItem';
import { ApiHost } from '../../config';
import { CatalogData } from '../../types/CommonTypes';


function AddAnalyzes() {
    const [catalogData, setCatalogData] = useState<CatalogData | null>(null)
    const [isCatalogLoaded, setCatalogLoaded] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        requestCatalog();
    }, [isCatalogLoaded]);

    const requestCatalog = async () => {
        try {
            const response = await fetch(ApiHost + '/catalog/all/grouped', { method: "GET" })
            setCatalogLoaded(true);
            if (response.ok) {
                const data = await response.json();
                setCatalogData(data);
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <Header title="Добавить результаты осбледования"></Header>
            <div className="container-lg text-secondary">
                <div className="border border-secondary rounded-3 p-3 mb-3">
                    <h3 className="text-center mb-3">Внести сведения об обследовании</h3>
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-3 ">
                        <label htmlFor="testDate" className="form-label fw-bold">Дата обследования</label>
                        <input
                            type="date"
                            required
                            name="testDate"
                            autoComplete="off"
                            id="testDate"
                            className="form-control" />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="testDate" className="form-label fw-bold">Результаты</label>
                        <div className="accordion" id="accordionTestsFlush">
                            <div className="accordion-item">
                                <h2 className="accordion-header"
                                    id="flush-Hematological">
                                    <button className="accordion-button collapsed fw-bold text-secondary"
                                        type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseHematological"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseHematological">
                                        Результаты гематологического исследования
                                    </button>
                                </h2>
                                <div id="flush-collapseHematological"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="flush-Hematological"
                                    data-bs-parent="#accordionTestsFlush">
                                    <div className="accordion-body">
                                        <div className='row'>
                                            {catalogData && catalogData.Hematological
                                                .map(param =>
                                                    <CatalogParamItem param={param}></CatalogParamItem>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header"
                                    id="flush-Immunological">
                                    <button className="accordion-button collapsed fw-bold text-secondary"
                                        type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseImmunological"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseImmunological">
                                        Иммунный статус
                                    </button>
                                </h2>
                                <div id="flush-collapseImmunological"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="flush-Immunological"
                                    data-bs-parent="#accordionTestsFlush">
                                    <div className="accordion-body">
                                        <div className='row'>
                                            {catalogData && catalogData.Immunological
                                                .map(param =>
                                                    <CatalogParamItem param={param}></CatalogParamItem>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header"
                                    id="flush-Cytokine">
                                    <button className="accordion-button collapsed fw-bold text-secondary"
                                        type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseCytokine"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseCytokine">
                                        Цитокиновый статус
                                    </button>
                                </h2>
                                <div id="flush-collapseCytokine"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="flush-Cytokine"
                                    data-bs-parent="#accordionTestsFlush">
                                    <div className="accordion-body">
                                        <div className='row'>
                                            {catalogData && catalogData.Cytokine
                                                .map(param =>
                                                    <CatalogParamItem param={param}></CatalogParamItem>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end">
                        <div>
                            <button
                                type="submit"
                                className="btn btn-outline-success"
                                disabled={loading}>
                                {loading &&
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                }
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddAnalyzes;