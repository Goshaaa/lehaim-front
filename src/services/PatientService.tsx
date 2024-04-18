import { Patient, PatientSearchParam, NotFoundError, AnalyzeBriefInfo, OncologicalTestRestDTO, OncoTestData } from "../types/CommonTypes";
import { ApiHost } from "../config";

export async function getPatientById(patientId: string): Promise<Patient> {
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

export async function listAllPatientOncoTests(patientId: string): Promise<AnalyzeBriefInfo[]> {
    const response = await fetch(ApiHost + '/patients/' + patientId + "/test/all",
        {
            method: "GET"
        }
    );
    if (response.ok) {
        return response.json();
    } else {
        throw Error("[" + response.status + "] Ошибка загрузики сведений об обследованиях пациента");
    }
}

export async function getPatientOncoTest(patientId: string, testId: number): Promise<OncologicalTestRestDTO> {
    const response = await fetch(ApiHost + '/patients/' + patientId + "/test/" + testId,
        {
            method: "GET"
        }
    );
    if (response.ok) {
        return response.json();
    } else {
        throw Error("[" + response.status + "] Ошибка загрузики сведений об обследованиях пациента");
    }
}

export async function addNewPatientOncoTestData(patientId: string, oncoTestData: OncoTestData) {
    console.log("addNewPatientOncoTestData");
    const payload = {
        testDate: oncoTestData.testDate,
        results: Object.entries(oncoTestData.params)
            .map(entry => {
                return {
                    "catalogId": entry[0],
                    "value": entry[1]
                }
            })
    }

    const response = await fetch(ApiHost + "/patients/" + patientId + "/test/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }
    );
    if (response.ok) {
        return response.json();
    } else {
        throw Error("[" + response.status + "] Ошибка сохранения сведений об обследовании");
    }
}

export async function editPatientOncoTestData(patientId: string, oncoTestData: OncoTestData) {
    const payload = {
        testDate: oncoTestData.testDate,
        results: Object.entries(oncoTestData.params)
            .map(entry => {
                return {
                    "catalogId": entry[0],
                    "value": entry[1]
                }
            })
    }

    const response = await fetch(ApiHost + "/patients/" + patientId + "/test/" + oncoTestData.id,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }
    );
    if (response.ok) {
        return response.json();
    } else {
        throw Error("[" + response.status + "] Ошибка сохранения сведений об обследовании");
    }
}