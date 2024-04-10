import { ApiHost } from "../config";

interface DiagnosisDTO {
    id: number,
    code: string,
    description: string
}

export async function loadAllDiagnosis(): Promise<DiagnosisDTO[]> {
    const response = await fetch(ApiHost + '/diagnoses/all', { method: "GET" });
    if (response.ok) {
        return await response.json();
    } else {
        throw Error("Не удалось загрузить каталог диагнозов");
    }
}

export type { DiagnosisDTO };