export const submitVote = async (vote) => {
    let status = false
    const survey = await surveySubmit(vote.value);

    if (vote.value.cover_path) {
        const coverUpload = await uploadSurveyCover(
            survey.surveyInfo.survey_id,
            vote.value.cover_path
        );
    }
    if (survey.outputAction.result === "ok") {
        const quizId = survey.quizSetList[0].quiz.quiz_id;

        for (let index = 0; index < vote.value.choices.length; index++) {
            const answer = vote.value.choices[index];
            answer.quiz_id = quizId;
            answer.modified_by = "";
            answer.answer_sort = index + 1;
            const res = await answerSubmit(answer);

            if (answer.image_path) {
                const resImage = await uploadAnswerImage(
                    res.answer_id,
                    answer.image_path
                );
                console.log(resImage);
            }
        }
        status = true;
    }

    return {
        survey,
        status,
    };
};
