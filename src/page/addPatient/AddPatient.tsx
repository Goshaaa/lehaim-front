import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../header/Header";
import { Patient } from "../../types/CommonTypes";
import * as patientService from '../../services/PatientService';


function AddPatient() {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState<Patient>({
        name: searchParams.get('firstName') ?? "",
        lastname: searchParams.get('lastName') ?? "",
        patronymic: searchParams.get('middleName') ?? "",
        birthdate: searchParams.get('birthDate') ?? ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("")

        try {
            const data = await patientService.saveNewPatient(patient);
            navigate("/patient/" + data.id);
        } catch (err) {
            setError("Ошибка сохранения: " + err);
        }
        setLoading(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPatient(prevData => ({ ...prevData, [name]: value }))
    }

    return (
        <>
            <Header title="Создать карточку пациента" />
            <div className="container-lg">
                <div className="row justify-content-center">
                    <div className="col-sm-10 col-md-8 col-lg-6">
                        <div className="border border-secondary rounded-3 text-secondary p-3 mb-3">
                            <h4 className="mb-3">Создать карточку пациента</h4>
                            <form onSubmit={handleSubmit} className="container-fluid">
                                <div className="mb-3">
                                    <label htmlFor="patientLastName" className="form-label fw-bold">Фамилия</label>
                                    <input type="text"
                                        id="patientLastName"
                                        required
                                        autoComplete="off"
                                        maxLength={40}
                                        name="lastname"
                                        value={patient.lastname}
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="patientFirstName" className="form-label fw-bold">Имя</label>
                                    <input type="text"
                                        id="patientFirstName"
                                        required
                                        autoComplete="off"
                                        maxLength={40}
                                        name="name"
                                        value={patient.name}
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="patientMiddleName" className="form-label fw-bold">Отчество</label>
                                    <input type="text"
                                        id="patientMiddleName"
                                        maxLength={40}
                                        autoComplete="off"
                                        name="patronymic"
                                        value={patient.patronymic}
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="patientBithDate" className="form-label fw-bold">Дата рождения</label>
                                    <input type="date"
                                        id="patientBithDate"
                                        required
                                        autoComplete="off"
                                        maxLength={40}
                                        name="birthdate"
                                        value={patient.birthdate}
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="patientGender" className="form-label fw-bold">Пол</label>
                                    <select
                                        id="patientGender"
                                        name="gender"
                                        onChange={handleChange}
                                        required
                                        className="form-select" >
                                        <option>Выберите пол</option>
                                        <option value="Male">Мужской</option>
                                        <option value="Female">Женский</option>
                                    </select>
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
                                        onClick={() => navigate("/searhPatient/")}
                                        disabled={loading}>
                                        Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default AddPatient;