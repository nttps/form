export default defineNuxtRouteMiddleware(async (_to, from) => {
    const response = await useApi(
        `/api/servey/ServeyInfo/GetDocSet?survey_id=${_to.params.id}`,
        "GET"
    );

    if (
        !response.surveyInfo.is_require_login
        //_to.path === `/forms/${_to.params.id}/public`
    ) {
        return ;
    }else {
        return navigateTo(`/forms/${_to.params.id}`);
    }

    
});
