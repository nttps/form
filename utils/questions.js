export const submitQuestion = async (form, survey) => {
    let status = false;

    if (survey.outputAction.result === "ok") {
        for (let index = 0; index < form.value.questions.length; index++) {
            const quiz = form.value.questions[index];
            quiz.survey_id = survey.surveyInfo.survey_id;
            quiz.modified_by = "";
            quiz.quiz_sort = index + 1;
            const resQuiz = await quizSubmit(quiz);

            const quizId = resQuiz.quiz.quiz_id;
            if (quiz.image_path) {
                const resImage = await uploadQuizImage(quizId, quiz.image_path);
                console.log(resImage);
            }

            for (let index = 0; index < quiz.answers.length; index++) {
                const answer = quiz.answers[index];
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
        }

       
        status = true;
    }

    return {
        survey,
        status,
    };
};
