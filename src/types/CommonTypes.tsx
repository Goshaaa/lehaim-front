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
    operationDate?: string,
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

export enum ChartType {
    B_Type,
    T_Type,
    Cytokine_Type,
    Regeneration_Type,
    Inflammation_Type
}

export enum ChartType2 {
    B_Type = "B_CELL",
    T_Type = "T_CELL",
    Cytokine_Type = "CYTOKINE_PAIRS",
    Regeneration_Type = "REGENERATION",
    Inflammation_Type = "Inflammation"
}

interface ChartsDataUrl {
    regenerationChartData?: string | null,
    bTypeData?: string | null,
    tTypeData?: string | null,
    cytokineTypeData?: string | null,
    inflammationTypeData?: string | null
}
interface SelectAnalyzeCallback { (analyzeId?: string | undefined): void }

interface Recommendation {
    id?: string,
    name?: string,
    conclusion?: string,
    recommendation?: string,
    chartType: string,
}

interface RecommendationData {
    regeneration?: Recommendation | null,
    cytokine?: Recommendation | null,
}


export type { Patient, PatientSearchParam, AnalyzeBriefInfo, SelectAnalyzeCallback, AnalyzeDetailedInfo, AnalyzeParameter,
    CatalogItem, TestParamType, OncoTestData, OncologicalTestRestDTO, ParameterResultRestDTO, ChartsDataUrl, Recommendation, RecommendationData };
