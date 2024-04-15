import { useState, useEffect, FormEvent } from 'react';
import Header from "../header/Header";
import CatalogParamItem from './CatalogParamItem';
import { useParams, useNavigate } from "react-router-dom";
import { CatalogData, TestParamType, OncoTestData } from '../../types/CommonTypes';
import * as oncoTestService from '../../services/OncoTestSerive';
import * as patientService from '../../services/PatientService';
import { ChangeEvent } from 'react';


function EditAnalyzes() {
    const navigate = useNavigate();

    const [oncoTestData, setOncoTestData] = useState<OncoTestData>({
        params: {}
    });

    const [catalogData, setCatalogData] = useState<CatalogData | null>(null);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { patientId, testId } = useParams();

    useEffect(() => {
        loadAllData();
    }, [isDataLoaded]);

    const requestCatalog = async () => {
        try {
            const data = await oncoTestService.loadOncoTestCatalog();
            setCatalogData(data);
        } catch (err) {
            setCatalogData(null);
        }
    }

    const requestOncoTestData = async () => {
        try {
            const data = await patientService.getPatientOncoTest(patientId!!, Number(testId));
            oncoTestData.id = Number(data.id);
            oncoTestData.testDate = data.testDate;
            data.results?.forEach((result) => {
                oncoTestData.params[result.catalogId] = result.value;
            });

            setOncoTestData(oncoTestData);
        } catch (err) {
            setError("Не удалось загрузить результаты обследования");
        }

    }

    const loadAllData = async () => {
        await requestCatalog();
        if (testId) {
            await requestOncoTestData();
        }
        setDataLoaded(true);
    }

    const handleTestDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log("handleTestDateChange " + name + " " + value);
        setOncoTestData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleParamChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOncoTestData(prevData => ({
            ...prevData,
            ...{ "params": { ...oncoTestData.params, ...{ [name]: Number(value) } } }
        }));
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError("")
        try {
            setLoading(true);
            if (oncoTestData.id) {
                await patientService.editPatientOncoTestData(patientId!!, oncoTestData);
            } else {
                await patientService.addNewPatientOncoTestData(patientId!!, oncoTestData);
            }
            navigate("/patient/" + patientId);
        } catch (err) {
            setError("" + err);
        }
        setLoading(false);
    }

    const getPageTitle = () => {
        if (testId) {
            return "Редактирование сведений об обследовании"
        } else {
            return "Внести сведения об обследовании"
        }
    }

    return (
        <>
            <Header title={getPageTitle()}></Header>
            <div className="container-lg text-secondary">
                <div className="border border-secondary rounded-3 p-3 mb-3">
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-center mb-3">
                            {getPageTitle()}
                        </h3>

                        <div className="col-sm-12 col-md-6 col-lg-4 mb-3 ">
                            <label htmlFor="testDate" className="form-label fw-bold">Дата обследования</label>
                            <input
                                type="date"
                                required
                                name="testDate"
                                autoComplete="off"
                                id="testDate"
                                value={oncoTestData.testDate ?? ""}
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
                                                            param={param}
                                                            value={oncoTestData.params[param.id]}
                                                        />
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
                                                            param={param}
                                                            value={oncoTestData.params[param.id]}
                                                        />
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
                                                            param={param}
                                                            value={oncoTestData.params[param.id]}
                                                        />
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {error &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }

                        <div className="d-flex justify-content-end">
                            <button
                                type="submit"
                                className="btn btn-outline-success me-3"
                                disabled={loading}>
                                {loading &&
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                }
                                Сохранить
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => navigate("/patient/" + patientId)}
                                disabled={loading}>
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditAnalyzes;