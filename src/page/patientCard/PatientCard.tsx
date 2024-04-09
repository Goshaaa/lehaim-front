import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Header from "../header/Header";
import PatientInfo from "./components/PatientInfo";
import AdditionaInfolBlock from './components/AdditionalInfoBlock';
import AnalyzesBlock from "./components/AnalyzesBlock";
import GraphBlock from "./components/GraphBlock";
import { Patient, SelectAnalyzeCallback } from '../../types/CommonTypes';
import * as patientService from '../../services/PatientService';

function PatientCard() {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [selectedAnalyzeId, setSelectedAnalyzeId] = useState<string|undefined>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { patientId } = useParams();

    const loadPatient = async () => {
        setError("");
        setLoading(true);

        if (patientId) {
            try {
                const data = await patientService.getPatientById(Number(patientId));
                setPatient(data);
            } catch (err) {
                setError("Ошибка загрузки: " + err);
            }
            setLoading(false);
            
        }
    }

    useEffect(() => {
        loadPatient() 
    }, [patientId]);


    const selectAnalyzeCallback: SelectAnalyzeCallback = (selectedAnalyzeId?: string) => {
        setSelectedAnalyzeId(selectedAnalyzeId);
    }

    return (
        <>
            <Header title="Карточка пациента"></Header>
            {loading &&
                <div className='container'>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                </div>
            }
            {patient && !loading &&
                <div className="container-lg">
                    <div className="row">
                        <div className="col-md-4 col-sm-12 mb-3">
                            <PatientInfo patient={patient}></PatientInfo>
                            <AdditionaInfolBlock patient={patient}></AdditionaInfolBlock>
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <AnalyzesBlock selectAnalyzeCallback={selectAnalyzeCallback}></AnalyzesBlock>
                            <GraphBlock selectedAnayzeId={selectedAnalyzeId}></GraphBlock>
                        </div>
                    </div>
                </div>
            }
            {error &&
                <div className="container">
                    <h3>{error}</h3>
                </div>
            }
        </>
    )

}

export default PatientCard;