export function parseHashParams(hash: string): Map<string, string> {
    return hash.split('&').reduce((result, item) => {
        let parts = item.split("=");
        result.set(parts[0], parts[1]);
        return result;
    }, new Map());
}
