export function formatDate(dateStr?: string): string {
    if (dateStr) {

        let timeStamp = new Date(Date.parse(dateStr));
        return timeStamp.toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          });
    }
    return "";
}