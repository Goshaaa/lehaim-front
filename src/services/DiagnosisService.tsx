import { ApiHost } from "../config";
import { GeneDto } from "../types/CommonTypes";
import { handleResponse } from "./ResponseHandler"

interface DiagnosisDTO {
    id: number,
    code: string,
    description: string,
    genes: GeneDto[]
}

export async function loadAllDiagnosis(): Promise<DiagnosisDTO[]> {
    const response = await fetch(ApiHost + '/diagnoses/all', { method: "GET" });
    return await handleResponse<DiagnosisDTO[]>(response, "Не удалось загрузить каталог диагнозов");
}

export type { DiagnosisDTO };