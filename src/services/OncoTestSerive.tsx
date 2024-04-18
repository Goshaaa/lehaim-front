import { AnalyzeDetailedInfo } from "../types/CommonTypes";
import { ApiHost } from "../config";
import { CatalogItem } from '../types/CommonTypes';

export async function loadOncoTestCatalog(): Promise<CatalogItem[]> {
    const response = await fetch(ApiHost + '/catalog/all', { method: "GET" });
    if (response.ok) {
        return await response.json();
    } else {
        throw Error("Не удалось загрузить каталог параметров");
    }
}

export async function getAllOncoTestParams(testId: number): Promise<AnalyzeDetailedInfo[]> {
    const response = await fetch(ApiHost + '/tests/' + testId,
        {
            method: "GET"
        }
    );
    if (response.ok) {
        return response.json();
    } else {
        throw Error("[" + response.status + "] Ошибка загрузики сведений об обследовании");
    }
}


export async function deleteOncoTest(testId: number) {
    const response = await fetch(ApiHost + '/tests/' + testId,
        {
            method: "DELETE"
        }
    );
    if (!response.ok) {
        throw Error("[" + response.status + "] Ошибка удаления сведений об обследовании");
    }
}