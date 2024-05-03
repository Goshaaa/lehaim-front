export async function handleResponse<T>(response: Response, errMsg: string): Promise<T> {
    if (response.ok) {
        return response.json();
    } else {
        var errorMsg = "[" + response.status + "] " + errMsg;
        try {
            const errBody = await response.json();
            errorMsg = errBody['msg'] ?? errorMsg;
        } catch (err) {
        }
        throw new Error(errorMsg);
    }
}