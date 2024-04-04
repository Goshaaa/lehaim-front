import { Patient, PatientSearchParam, NotFoundError } from "../types/CommonTypes";
import { ApiHost } from "../config";

export async function getPatientById(patientId: number): Promise<Patient> {
    const response = await fetch(ApiHost + '/patients/' + patientId, { method: "GET" });
    if (response.ok) {
        return response.json();
    } else {
        throw Error("[" + response.status + "] Ошибка загрузики сведений о пациенте");
    }
}

export async function saveNewPatient(patient: Patient): Promise<Patient> {
    const response = await fetch(ApiHost + "/patients/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patient)
        }
    );
    if (response.ok) {
        return response.json();
    } else {
        throw Error("[" + response.status + "] Ошибка сохранения сведений о пациенте");
    }
}

export async function updatePatient(patient: Patient): Promise<Patient> {
    const response = await fetch(ApiHost + "/patients/" + patient.id,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patient)
        }
    );
    if (response.ok) {
        return response.json();
    } else {
        throw Error("[" + response.status + "] Ошибка сохранения сведений о пациенте");
    }
}

export async function searchPatient(searchParam: PatientSearchParam): Promise<Patient> {
    const url = new URL(ApiHost + "/patients/fullName?");
    url.searchParams.set('firstname', searchParam.firstName ?? "");
    url.searchParams.set('lastname', searchParam.lastName ?? "");
    url.searchParams.set('middlename', searchParam.patronymic ?? "");
    url.searchParams.set('birthdate', searchParam.birthDate ?? "");

    const response = await fetch(url,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }
    );

    if (response.ok) {
        return response.json();
    } else if (response.status == 404) {
        throw new NotFoundError("Пациент не найден");
    } else {
        throw new Error("Ошибка загрузки");
    }
}