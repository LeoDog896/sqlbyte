// find the column headers of a table
// e.g. [{ id: 1, name: "foo" }, { id: 2, name: "bar", cat: true }] -> ["id", "name", "cat"]
export function findColumnsHeaders(data: any[]): string[] {
    const headers = new Set<string>();
    for (const row of data) {
        for (const key in row) {
            headers.add(key);
        }
    }
    return Array.from(headers);
}