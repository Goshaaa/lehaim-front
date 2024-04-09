import { useState, useEffect, FormEvent } from 'react';
import Header from "../header/Header";
import CatalogParamItem from './CatalogParamItem';
import { useParams, useNavigate } from "react-router-dom";
import { CatalogData, AnalyzesData } from '../../types/CommonTypes';
import * as oncoTestService from '../../services/OncoTestSerive';
import * as patientService from '../../services/PatientService';
import { ChangeEvent } from 'react';



function AddAnalyzes() {
    const navigate = useNavigate();
    const [analyzesData, setAnalyzesData] = useState<AnalyzesData>({
        testDate: undefined,
        results: new Map()
    })
    const [catalogData, setCatalogData] = useState<CatalogData | null>(null)
    const [isCatalogLoaded, setCatalogLoaded] = useState(false)
    const [loading, setLoading] = useState(false);
    const { patientId } = useParams();

    useEffect(() => {
        requestCatalog();
    }, [isCatalogLoaded]);

    const requestCatalog = async () => {
        try {
            const data = await oncoTestService.loadOncoTestCatalog();
            setCatalogLoaded(true);
            setCatalogData(data);
        } catch (err) {
            setLoading(false);
            setCatalogData(null);
        }
    }

    const handleTestDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAnalyzesData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleParamChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        analyzesData.results.set(Number(name), Number(value));
        // console.log("analyzesData.paramMap " + JSON.stringify(Object.fromEntries(analyzesData.results)));
        setAnalyzesData(analyzesData);
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await patientService.addNewPatientOncoTest(Number(patientId), analyzesData);
            navigate("/patientCard/" + patientId);
        } catch (err) {
            setLoading(false);
        }
    }

    return (
        <>
            <Header title="Добавить результаты обследования"></Header>
            <div className="container-lg text-secondary">
                <div className="border border-secondary rounded-3 p-3 mb-3">
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-center mb-3">Внести сведения об обследовании</h3>
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-3 ">
                            <label htmlFor="testDate" className="form-label fw-bold">Дата обследования</label>
                            <input
                                type="date"
                                required
                                name="testDate"
                                autoComplete="off"
                                id="testDate"
                                onChange={handleTestDateChange}
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
                                                        <CatalogParamItem
                                                            key={param.id}
                                                            onChange={handleParamChange}
                                                            param={param} />
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
                                                        <CatalogParamItem
                                                            key={param.id}
                                                            onChange={handleParamChange}
                                                            param={param} />
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
                                                        <CatalogParamItem
                                                            key={param.id}
                                                            onChange={handleParamChange}
                                                            param={param} />
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
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddAnalyzes;