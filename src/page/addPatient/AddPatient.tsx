import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../header/Header";
import { Patient } from "../../types/CommonTypes";
import * as patientService from '../../services/PatientService';
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    const fioRegexEn = /^[A-Za-z-]+$/
    const fioRegexRu = /^[А-Яа-я-]+$/

    const validateBeforeSubmit = (): string | null => {
        const errMsgs: string[] = [];
        if (patient.name.trim().length === 0) {
            errMsgs.push("Не заполнено имя пациента");
        }
        if (patient.lastname.trim().length === 0) {
            errMsgs.push("Не заполнена фамилия пациента");
        }
        if (!patient.gender || patient.gender === '-') {
            errMsgs.push("Не указан пол пациента");
        }

        const fio = patient.name + patient.lastname + patient.patronymic;
        if (!((fioRegexEn.test(fio) && !fioRegexRu.test(fio)) || 
            (!fioRegexEn.test(fio) && fioRegexRu.test(fio)))) {
                errMsgs.push("ФИО может быть указано либо только на кирилице либо только на латинице");
        }

        if (!patient.birthdate) {
            errMsgs.push("Не указана дата рождения пациента");
        } else {
            const parsedDate = new Date(patient.birthdate);
            if (parsedDate >= new Date()) {
                errMsgs.push("Дата рождения не может быть в будущем");
            } else if (parsedDate < new Date("1900-01-01")) {
                errMsgs.push("Неверная дата рождения");
            }
        }

        return errMsgs.length > 0 ? "Ошибка заполнения формы: " + errMsgs.join('; ') : null;
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const err = validateBeforeSubmit();
        if (err) {
            setError(err);
            return;
        }
        setLoading(true);

        try {
            const data = await patientService.saveNewPatient(patient);
            navigate("/patient/" + data.id);
        } catch (err) {
            if (err instanceof Error) {
                setError("Ошибка сохранения: " + err.message);
            } else {
                setError("Ошибка сохранения: " + err);
            }
        }
        setLoading(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPatient(prevData => ({ ...prevData, [name]: value.trim() }));
    }

    return (
        <>
            <Header title={t('patientAddForm.pageTitle')} />
            <div className="container-lg">
                <div className="row justify-content-center">
                    <div className="col-sm-10 col-md-8 col-lg-6">
                        <div className="border border-secondary rounded-3 text-secondary p-3 mb-3">
                            <h4 className="mb-3">{t('patientAddForm.modalTitle')}</h4>
                            <form onSubmit={handleSubmit} className="container-fluid">
                                <div className="mb-3">
                                    <label htmlFor="patientLastName" className="form-label fw-bold">{t('patientAddForm.lastName')}</label>
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
                                    <label htmlFor="patientFirstName" className="form-label fw-bold">{t('patientAddForm.firstName')}</label>
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
                                    <label htmlFor="patientMiddleName" className="form-label fw-bold">{t('patientAddForm.middleName')}</label>
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
                                    <label htmlFor="patientBithDate" className="form-label fw-bold">{t('patientAddForm.birthDate')}</label>
                                    <input type="date"
                                        id="patientBithDate"
                                        required
                                        min='1900-01-01'
                                        max='2199-12-12'
                                        autoComplete="off"
                                        maxLength={40}
                                        name="birthdate"
                                        value={patient.birthdate}
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="patientGender" className="form-label fw-bold">{t('patientAddForm.gender')}</label>
                                    <select
                                        id="patientGender"
                                        name="gender"
                                        onChange={handleChange}
                                        required
                                        className="form-select">
                                        <option value="-">{t('patientAddForm.chooseGenderDefaultOption')}</option>
                                        <option value="Male">{t('patientAddForm.maleGenderOption')}</option>
                                        <option value="Female">{t('patientAddForm.femaleGenderOption')}</option>
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
                                        {t('patientAddForm.savePatient')}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate("/searhPatient/")}
                                        disabled={loading}>
                                        {t('patientAddForm.cancel')}
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