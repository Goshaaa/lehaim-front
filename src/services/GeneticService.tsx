import { ApiHost } from "../config";
import { GeneDto, PatientAllGenesDto, PatientGeneDto } from "../types/CommonTypes";
import { handleResponse } from "./ResponseHandler"

export async function loadAllGenes(): Promise<GeneDto[]> {
    const response = await fetch(ApiHost + '/genes/all', { method: "GET" });
    return await handleResponse<GeneDto[]>(response, "Не удалось загрузить каталог генов");
}

export async function loadGenesByDiagnosys(diagnosisId: number): Promise<GeneDto[]> {
    const response = await fetch(ApiHost + '/genes/diagnosis/' + diagnosisId, { method: "GET" });
    return await handleResponse<GeneDto[]>(response, "Не удалось загрузить гены по диагнозу");
}

export async function updatePatientGenes(patientId: string, genes: PatientGeneDto[]): Promise<GeneDto[]> {
    if (genes.length > 0) {
        const response = await fetch(ApiHost + "/genes/" + patientId,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    values: genes
                })
            }
        );
        return await handleResponse<GeneDto[]>(response, "Ошибка сохранения сведений о пациенте");
    }
    return [];
}

export async function loadGenesByPatient(patientId: string): Promise<PatientAllGenesDto> {
    const response = await fetch(ApiHost + '/genes/' + patientId, { method: "GET" });
    return await handleResponse<PatientAllGenesDto>(response, "Не удалось загрузить гены пациента");
}


export type { GeneDto, PatientGeneDto };