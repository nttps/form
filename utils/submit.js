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

        if (data.cover_path) {
            const coverUpload = await uploadSurveyCover(
                result.surveyInfo.survey_id,
                data.cover_path
            );
        }
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
export const uploadSurveyCover = async (id, file) => {
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
        method: "POST",
        body: formdata,
    };

    try {
        const response = await fetch(
            `${config.public.apiUrl}/api/survey/Upload/UploadSurveyCover?survey_id=${id}`,
            requestOptions
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const uploadAnswerImage = async (id, file) => {
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
        method: "POST",
        body: formdata,
    };

    try {
        const response = await fetch(
            `${config.public.apiUrl}/api/survey/Upload/UploadAnswerImage?answer_id=${id}`,
            requestOptions
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const uploadQuizImage = async (id, file) => {
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
        method: "POST",
        body: formdata,
    };

    try {
        const response = await fetch(
            `${config.public.apiUrl}/api/survey/Upload/UploadQuizImage?quiz_id=${id}`,
            requestOptions
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const uploadAnsImage = async (submitId, quizId, file) => {
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
        method: "POST",
        body: formdata,
    };

    try {
        const response = await fetch(
            `${config.public.apiUrl}/api/survey/Upload/UploadAnswerInRegisterFormImage?submit_id=${submitId}&quiz_id=${quizId}`,
            requestOptions
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};