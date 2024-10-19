import { ApiHost } from "../config";
import { handleResponse } from "./ResponseHandler"
import { Patient, AnalyzeDetailedInfo } from "../types/CommonTypes";


interface ReportDTO {
    patient: Patient,
    currentTestDate: string,
    currentTestNote?: string
    currentResults: AnalyzeDetailedInfo[],
    previousResults: AnalyzeDetailedInfo[],
    season: string
}

export async function loadPatientReport(patientId: string, testId: number): Promise<ReportDTO> {
    const response = await fetch(ApiHost + '/reports/' + patientId + '/test/' + testId, { method: "GET" });
    return await handleResponse<ReportDTO>(response, "Не удалось загрузить сведения об отчете");
}

export type { ReportDTO };