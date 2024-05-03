import { AnalyzeDetailedInfo, CatalogItem } from "../types/CommonTypes";
import { ApiHost } from "../config";
import { handleResponse } from "./ResponseHandler"

export async function loadOncoTestCatalog(): Promise<CatalogItem[]> {
    const response = await fetch(ApiHost + '/catalog/all', { method: "GET" });
    return await handleResponse<CatalogItem[]>(response, "Не удалось загрузить каталог параметров");
}

export async function getAllOncoTestParams(testId: number): Promise<AnalyzeDetailedInfo[]> {
    const response = await fetch(ApiHost + '/tests/' + testId,
        {
            method: "GET"
        }
    );
    return await handleResponse<AnalyzeDetailedInfo[]>(response, "Ошибка загрузики сведений об обследовании");
}


export async function deleteOncoTest(testId: number) {
    const response = await fetch(ApiHost + '/tests/' + testId,
        {
            method: "DELETE"
        }
    );
    if (!response.ok) {
        throw new Error("[" + response.status + "] Ошибка удаления сведений об обследовании");
    }
}