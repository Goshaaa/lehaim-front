import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { ApiHost } from "../../config";


function SearchPatient() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchData, setSearchData] = useState({
        firstName: null,
        lastName: null,
        patronymic: null,
        birthDate: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const url = new URL(ApiHost + "/patients/fullName?");
        url.searchParams.set('firstname', searchData.firstName ?? "");
        url.searchParams.set('lastname', searchData.lastName ?? "");
        url.searchParams.set('middlename', searchData.patronymic ?? "");
        url.searchParams.set('birthdate', searchData.birthDate ?? "");

        try {
            const response = await fetch(url,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                }
            );
            setLoading(false);
            if (response.ok) {
                const data = await response.json();
                navigate("/patientCard/" + data.id)
            } else {
                setError("Пациент не найден");
            }
        } catch (err) {
            setLoading(false);
            setError("Ошибка загрузки: " + err);
        }
    }

    return (
        <>
            <Header title="Поиск пациента"></Header>
            <div className="container-lg">
                <div className="row justify-content-center">
                    <div className="col-sm-10 col-md-8 col-lg-6">
                        <div className="border border-secondary rounded-3 text-secondary p-3 mb-3">
                            <h4 className="mb-3">Поиск пациента</h4>
                            <form onSubmit={handleSubmit} className="container-fluid">
                                <div className="mb-3">
                                    <label htmlFor="patientLastName" className="form-label fw-bold">Фамилия</label>
                                    <input
                                        type="text"
                                        required
                                        name="lastName"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        id="patientLastName"
                                        className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="patientFirstName" className="form-label fw-bold">Имя</label>
                                    <input
                                        type="text"
                                        required
                                        name="firstName"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        id="patientFirstName"
                                        className="form-control" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="patientMiddleName" className="form-label fw-bold">Отчество</label>
                                    <input
                                        type="text"
                                        id="patientMiddleName"
                                        name="patronymic"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        className="form-control" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="patientBithDate" className="form-label fw-bold">Дата рождения</label>
                                    <input
                                        type="date"
                                        required
                                        id="patientBithDate"
                                        name="birthDate"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>
                                {error &&
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                }

                                <div className="d-flex justify-content-between">
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-outline-success"
                                            onClick={() => {navigate("/addPatient/")}}>
                                            Добавить пациента
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-outline-secondary"
                                            disabled={loading}>
                                            {loading &&
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            }
                                            Поиск
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchPatient;