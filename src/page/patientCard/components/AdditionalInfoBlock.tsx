import { FormEvent, useState } from "react";
import { ApiHost } from "../../../config";
import { Patient } from "../../../types/CommonTypes";

interface Props {
    patient: Patient;
}

function AdditionaInfolBlock({ patient }: Props) {
    const [editMode, setEditMode] = useState(false);
    const [sourcePatient, setSourcePatient] = useState<Patient>(patient);
    const [changePatient, setChangePatient] = useState<Patient>(patient);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleEditMode = () => {
        if (editMode) {
            setChangePatient(sourcePatient);
        }
        setEditMode(!editMode);
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setChangePatient(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(ApiHost + "/patients/" + patient.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(changePatient)
            })
            setLoading(false);
            if (response.ok) {
                const data = await response.json();
                setSourcePatient(data);
                setChangePatient(data);
                setEditMode(false);
            } else {
                setError("Ошибка сохранения");
            }
        } catch (err) {
            setError("Ошибка сохранения: " + err);
        }
    }

    return (
        <>
            <div className="border border-secondary rounded-3 text-secondary p-3 clearfix">
                <form onSubmit={handleSubmit} className="container-fluid">
                    <div>
                        <label htmlFor="mainDiagnosisArea"
                            className="fw-bold">Диагноз:</label>
                        <div className="mt-2">
                            <textarea className="w-100"
                                id="mainDiagnosisArea"
                                name="mainDiagnosis"
                                onChange={handleChange}
                                disabled={!editMode}
                                value={changePatient.mainDiagnosis ?? ""} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="additionalDiagnosisArea"
                            className="fw-bold">Дополнительный диагноз:</label>
                        <div className="mt-2">
                            <textarea className="w-100"
                                id="additionalDiagnosisArea"
                                name="otherDiagnosis"
                                onChange={handleChange}
                                disabled={!editMode}
                                value={changePatient.otherDiagnosis ?? ""} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="diagnosisArea"
                            className="fw-bold">Комментарий о диагнозе:</label>
                        <div className="mt-2">
                            <textarea className="w-100"
                                id="diagnosisArea"
                                name="diagnosisComments"
                                value={changePatient.diagnosisComments ?? ""}
                                onChange={handleChange}
                                disabled={!editMode} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="surgeryArea" className="fw-bold">Комментарий об операции:</label>
                        <div className="mt-2">
                            <textarea
                                className="w-100"
                                id="surgeryArea"
                                name="operationComments"
                                value={changePatient.operationComments ?? ""}
                                onChange={handleChange}
                                disabled={!editMode} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="therapyArea" className="fw-bold">Комментарий о курсах химиотерапии:</label>
                        <div className="mt-2">
                            <textarea
                                className="w-100"
                                id="therapyArea"
                                name="chemotherapyComments"
                                value={changePatient.chemotherapyComments ?? ""}
                                onChange={handleChange}
                                disabled={!editMode} />
                        </div>
                    </div>
                    {error &&
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    }
                    <div className="d-flex justify-content-end mt-3">
                        {editMode &&
                            <button type="submit"
                                className="btn btn-outline-success float-end"
                                disabled={loading}>
                                {loading &&
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                }
                                Сохранить
                            </button>
                        }
                        <button
                            type="button"
                            onClick={toggleEditMode}
                            className="btn btn-outline-secondary ms-3 float-end"
                            disabled={loading}>
                            {editMode ? "Отмена" : "Редактировать"}
                        </button>
                    </div>
                </form>
            </div>
        </>

    );
}

export default AdditionaInfolBlock;