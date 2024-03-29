function SingleQuestion(props) {
    console.log(props.uid);

    const testAnswers = props.answers;
    let answerguide = "";
    if (props.completed) {
        if (props.correct) {
            answerguide = "correct -- " + props.correctAnswer

        } else {
            answerguide = "incorrect -- correct answer is - " + props.correctAnswer

        }

    }
    const renderedOptions = testAnswers.map((answerOption, aIndex) => {

        // do if else bebow to make option disabled or not

        return (
            <div >

                <input type="radio" id={aIndex} name={props.uid} value={answerOption} disabled={props.completed} className="option" onChange={(e) => props.onChange(e, props.qindex, props.questionType, answerOption)} />
                <label htmlFor={aIndex}>{answerOption}</label><br />


            </div>
        );

    });

    let classType = "question";

    if (props.completed && !props.correct) {

        classType = "incorrect"
    }
    return (<div id={props.uid} className={classType}>
        <h4>{props.question}</h4>
        {renderedOptions}
        <br></br>
        <h5>{answerguide}</h5>
    </div>
    );
}

export default SingleQuestion;