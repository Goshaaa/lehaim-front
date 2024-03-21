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

export enum ChartType {
    B_Type,
    T_Type,
    Cytokine_Type
}

interface SelectAnalyzeCallback { (analyzeId: string): void }

export type { Patient, AnalyzeBriefInfo, SelectAnalyzeCallback, AnalyzeDetailedInfo, AnalyzeParameter, CatalogData, CatalogItem };