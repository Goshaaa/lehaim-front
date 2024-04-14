import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AnalyzeBriefInfo, SelectAnalyzeCallback } from '../../../types/CommonTypes';
import * as patientService from '../../../services/PatientService';
import * as oncoTestService from '../../../services/OncoTestSerive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


interface Props {
    patientId: number,
    selectAnalyzeCallback: SelectAnalyzeCallback
}

function AnalyzeList({ patientId, selectAnalyzeCallback }: Props) {
    const [oncoTests, setOncoTests] = useState<AnalyzeBriefInfo[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loadPatientOncoTests = async () => {
        setError("");

        if (patientId) {
            try {
                const data = await patientService.listAllPatientOncoTests(Number(patientId));
                setOncoTests(data);
            } catch (err) {
                setError("Ошибка загрузки: " + err);
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

    const handleDelete = async (event: React.MouseEvent, id: string) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            selectAnalyzeCallback!!();
            await oncoTestService.deleteOncoTest(Number(id));
            const result = oncoTests.filter((item) => {
                return item.id !== id
            });
            setOncoTests(result);
        } catch (err) {
            console.log(err);
        }
    }

    const handleEdit = (event: React.MouseEvent, id: string) => {
        console.log("handleEdit");
        event.preventDefault();
        event.stopPropagation();
        navigate("/patient/" + patientId + "/analyzes/" + id);
    }


    return (
        <>
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
                                    onClick={(event) => handleEdit(event, test.id!!)}
                                    icon={faEdit}
                                    role="button"
                                    title="Редактировать" />

                                <FontAwesomeIcon
                                    className="ps-1"
                                    onClick={(event) => handleDelete(event, test.id!!)}
                                    icon={faTrash}
                                    role="button"
                                    title="Удалить" />
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    );
}

export default AnalyzeList;