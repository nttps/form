const config = useRuntimeConfig();
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const surveySubmit = async (data) => {

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    try {
        const response = await fetch(
            `${config.public.apiUrl}/api/servey/ServeyInfo/Save`,
            requestOptions
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const quizSubmit = async (data) => {
    var raw = JSON.stringify(data);

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    try {
        const response = await fetch(
            `${config.public.apiUrl}/api/servey/Quiz/AddQuiz`,
            requestOptions
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const answerSubmit = async (data) => {
    var raw = JSON.stringify(data);

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    try {
        const response = await fetch(
            `${config.public.apiUrl}/api/servey/Quiz/AddAnswer`,
            requestOptions
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};
