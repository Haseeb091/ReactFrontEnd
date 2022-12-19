function SingleQuestion(props) {
    console.log(props.uid);

    const testAnswers=props.answers;
    const renderedOptions=testAnswers.map((answerOption, aIndex) => {

       // do if else bebow to make option disabled or not

        return (
            <div className={props.uid}>
                
<input type="radio" id={aIndex} name={props.uid} value={answerOption} disabled={false} />
                <label htmlFor={aIndex}>{answerOption}</label><br />
           

            </div>
        );

    });
    return (<div>
        <h4>{props.question}</h4>
       {renderedOptions}
       <br></br>
       </div>
    );
}

export default SingleQuestion;