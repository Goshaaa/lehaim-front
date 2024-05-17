import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AnalyzeBriefInfo, SelectAnalyzeCallback } from '../../../types/CommonTypes';
import * as patientService from '../../../services/PatientService';
import * as oncoTestService from '../../../services/OncoTestSerive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { saveAs } from 'file-saver';
import * as PdfReportGenerator from '../../report/PdfReportGenerator';


interface Props {
    patientId: string,
    selectAnalyzeCallback: SelectAnalyzeCallback
}

function AnalyzeList({ patientId, selectAnalyzeCallback }: Props) {
    const [oncoTests, setOncoTests] = useState<AnalyzeBriefInfo[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [error, setError] = useState("");
    const [testToDelete, setTestToDelete] = useState<AnalyzeBriefInfo>({});
    const navigate = useNavigate();


    const loadPatientOncoTests = async () => {
        setError("");

        if (patientId) {
            try {
                const data = await patientService.listAllPatientOncoTests(patientId);
                setOncoTests(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError("Ошибка: " + err.message);
                } else {
                    setError("Ошибка загрузки: " + err);
                }
            }
        }
    }

    useEffect(() => {
        loadPatientOncoTests();
    }, [patientId]);

    const handleClick = (id: string) => {
        setActiveId(id);
        selectAnalyzeCallback!!(id);
    }

    const handleEdit = (event: React.MouseEvent, id: string) => {
        event.preventDefault();
        event.stopPropagation();
        navigate("/patient/" + patientId + "/analyzes/" + id);
    }

    const buildPdfReport = async (event: React.MouseEvent, id: string) => {
        event.preventDefault();
        event.stopPropagation();
        const blob = await PdfReportGenerator.generateReportBlob();
        saveAs(blob, "pdfReport.pdf");
    }

    const onClickDelete = (selectedTest: AnalyzeBriefInfo) => {
        setTestToDelete(selectedTest);
    }

    const handleDeleteConfirmationCallback = async (id: string) => {
        try {
            selectAnalyzeCallback();
            await oncoTestService.deleteOncoTest(Number(id));
            const result = oncoTests.filter((item) => {
                return item.id !== id
            });
            setOncoTests(result);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <ConfirmationModal
                title="Подтвердите действие"
                body={"Вы точно хотите удалить \"Обследование от " + testToDelete.testDate + "\""}
                yesCallback={() => { handleDeleteConfirmationCallback(testToDelete.id!!) }} />
            {!oncoTests && <h5 className="text-center m-3">Нет данных</h5>}
            <ul className="list-group">
                {oncoTests?.map((test) =>
                    <li key={test.id}
                        role='button'
                        className={"list-group-item list-group-item-action " + (test.id === activeId ? "active" : "")}
                        onClick={() => handleClick(test.id!!)}>
                        <div className='d-flex justify-content-between'>
                            <div>
                                Обследование от {test.testDate}
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    className="ps-1 me-3"
                                    icon={faPrint}
                                    onClick={(event) => buildPdfReport(event, test.id!!)}
                                    role="button"
                                    title="Сформировать отчет" />

                                <FontAwesomeIcon
                                    className="ps-1 me-3"
                                    onClick={(event) => handleEdit(event, test.id!!)}
                                    icon={faEdit}
                                    role="button"
                                    title="Редактировать обследование" />

                                <FontAwesomeIcon
                                    className="ps-1"
                                    data-bs-toggle="modal" data-bs-target="#confirmationModal"
                                    icon={faTrash}
                                    onClick={() => onClickDelete(test)}
                                    role="button"
                                    title="Удалить обследование" />
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    );
}

export default AnalyzeList;