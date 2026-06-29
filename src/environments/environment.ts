const apiBase = "/api";
const apiVersions = {
    v1 : `${apiBase}/v1`,
    v2 : `${apiBase}/v2`
}

export const environment = {
    production : false,
    apiBase,
    apiVersions
};