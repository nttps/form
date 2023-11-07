export const useApi = async (path, method, data) => {
    const config = useRuntimeConfig();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw
    if(data) raw = JSON.stringify(data);

    var requestOptions = {
        method: method,
        headers: myHeaders,
        body: raw,
    };

    try {
        const response = await fetch(
            `${config.public.apiUrl}${path}`,
            requestOptions
        );
        const result = await response.json();
        return result
    } catch (error) {
        return error;
    }
};
