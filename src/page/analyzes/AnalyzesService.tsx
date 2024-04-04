import { ApiHost } from '../../config';
import { CatalogData } from '../../types/CommonTypes';


export async function loadAnalyzeCatalog(): Promise<CatalogData> {
    const response = await fetch(ApiHost + '/catalog/all/grouped', { method: "GET" });
    if (response.ok) {
        return await response.json();
    } else {
        throw Error("Не удалось загрузить каталог параметров");
    }
}

