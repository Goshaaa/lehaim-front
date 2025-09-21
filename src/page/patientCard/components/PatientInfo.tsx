import { Patient } from "../../../types/CommonTypes";

interface Props {
    patient: Patient;
}

function PatientInfo({ patient }: Props) {
    return (
        <>
            <div className="border border-dark rounded-3 text-dark p-3 mb-3">
                <div className="row">
                    <div className="col fw-bold">
                        Фамилия
                    </div>
                    <div className="col">
                        {patient.lastname}
                    </div>
                </div>
                <div className="row">
                    <div className="col fw-bold">
                        Имя
                    </div>
                    <div className="col">
                        {patient.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col fw-bold">
                        Отчество
                    </div>
                    <div className="col">
                        {patient.patronymic}
                    </div>
                </div>
                <div className="row">
                    <div className="col fw-bold">
                        Дата рождения
                    </div>
                    <div className="col">
                        {patient.birthdate}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientInfo;