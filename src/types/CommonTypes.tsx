interface Patient {
    id?: number,
    name: string,
    lastname: string,
    patronymic: string,
    birthdate: string,
    gender?: string,
    mainDiagnosis?: string,
    otherDiagnosis?: string,
    diagnosisComments?: string,
    operationComments?: string,
    chemotherapyComments?: string
}

export function getEmptyPatient(): Patient {
    return {
        name: "",
        lastname: "",
        patronymic: "",
        birthdate: ""
    }
}

interface PatientSearchParam {
    firstName?: string | undefined,
    lastName?: string | undefined,
    patronymic?: string | undefined,
    birthDate?: string | undefined,
}

interface AnalyzesData {
    id?: number,
    testDate?: string,
    results: Map<number, number>;
}

interface AnalyzeBriefInfo {
    id?: string,
    testDate?: string
}

interface AnalyzeDetailedInfo {
    id?: number,
    value: number,
    parameter?: AnalyzeParameter
}

interface AnalyzeParameter {
    id?: number,
    name?: string,
    additionalName?: string,
    unit?: string,
    refMin: number,
    refMax: number,
    researchType?: string
}

interface CatalogItem {
    id: number,
    name: string,
    additionalName?: string,
    unit: string,
    refMin: number,
    refMax: number,
    researchType: string
}

interface CatalogData {
    Cytokine: CatalogItem[],
    Immunological: CatalogItem[],
    Hematological: CatalogItem[]
}

export class NotFoundError extends Error {}

export enum ChartType {
    B_Type,
    T_Type,
    Cytokine_Type
}

interface SelectAnalyzeCallback { (analyzeId?: string | undefined): void }

export type { Patient, PatientSearchParam, AnalyzeBriefInfo, SelectAnalyzeCallback, AnalyzeDetailedInfo, AnalyzeParameter, CatalogData, 
    CatalogItem, AnalyzesData };