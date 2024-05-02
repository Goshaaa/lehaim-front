interface Patient {
    id?: string,
    name: string,
    lastname: string,
    patronymic: string,
    birthdate: string,
    diagnosisId?: number,
    info?: string,
    gender?: string,
    diagnosisComments?: string,
    operationComments?: string,
    chemotherapyComments?: string,
    m?: string,
    n?: string,
    t?: string
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

interface ParameterResultRestDTO {
    catalogId: number,
    value?: number
}

interface OncologicalTestRestDTO {
    id? : number,
    testDate?: string,
    results?: ParameterResultRestDTO[]
}

interface TestParamType {
    [key: string]: number | undefined;
}

interface OncoTestData {
    id?: number | undefined,
    testDate?: string | undefined,
    params: TestParamType
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
    researchType: string,
    isActive: boolean
}

interface GroupedCatalogData {
    Cytokine: CatalogItem[],
    Immunological: CatalogItem[],
    Hematological: CatalogItem[]
}

export class NotFoundError extends Error {}

export enum ChartType {
    B_Type,
    T_Type,
    Cytokine_Type,
    Regeneration_Type
}

interface SelectAnalyzeCallback { (analyzeId?: string | undefined): void }

export type { Patient, PatientSearchParam, AnalyzeBriefInfo, SelectAnalyzeCallback, AnalyzeDetailedInfo, AnalyzeParameter,
    CatalogItem, AnalyzesData, TestParamType, OncoTestData, OncologicalTestRestDTO, ParameterResultRestDTO };