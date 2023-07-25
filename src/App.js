import { useState } from "react";
import "./App.css";

function App() {
  const questions = [
    {
      questionNo: 1,
      question: 'What is a correct syntax to output "Hello World" in Java?',
      options: [
        'echo("Hello World");',
        'Console.WriteLine("Hello World");',
        'System.out.println("Hello World");',
        'print ("Hello World");',
      ],
      correctAnswer: 'System.out.println("Hello World");',
      selectedAnswer: "",
    },
    {
      questionNo: 2,
      question:
        "Choose the appropriate data type for this value: 5.5 you learn react js?",
      options: ["int;", "double", "boolean", "String"],
      correctAnswer: "double",
      selectedAnswer: "",
    },
    {
      questionNo: 3,
      question: "Which of the following is not a Java keyword?",
      options: ["static;", "try", "new", "Integer"],
      correctAnswer: "Integer",
      selectedAnswer: "",
    },
    {
      questionNo: 4,
      question: "Choose the appropriate data type for this field: isSwimmer",
      options: ["double;", "boolean", "string", "int"],
      correctAnswer: "boolean",
      selectedAnswer: "",
    },
    {
      questionNo: 5,
      question: "What is the correct syntax for java main method?",
      options: [
        "public void main(String[] args);",
        "public static void main(string[] args)",
        "public static void main()",
        "none of the above",
      ],
      correctAnswer: "public static void main(string[] args)",
      selectedAnswer: "",
    },
  ];

  const [question, setQuestion] = useState(questions);
  console.log("set question value");
  const [currQuestion, setcurrQuestion] = useState(0);
  const [isQuizStart, setIsQuizStart] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [refreshIntervalId, setRefreshIntervalId] = useState(null);
  const options = ["A", "B", "C", "D"];
  // var refreshIntervalId = null;

  const selectedOptionStyle = {
    backgroundColor: "blueviolet",
    color: "white",
  };

  function handleOptionClick(val) {
    // const oldQuestions = questions.slice();
    // const currentQuestion = oldQuestions[currQuestion];
    // console.log("currentQuestion");
    // console.log(currentQuestion);
    // currentQuestion.selectedAnswer = val;
    // oldQuestions[currQuestion] = currentQuestion;
    // console.log(oldQuestions);
    // setQuestion(oldQuestions);
    const questionAndAnswer = Object.assign({}, question[currQuestion]);
    questionAndAnswer.selectedAnswer = val;
    const newQuestions = question.slice();
    newQuestions[currQuestion] = questionAndAnswer;
    setQuestion(newQuestions);
  }

  function getOpotions(question) {
    let optionItems = question.options.map((option, index) => {
      return (
        <p
          onClick={(e) => handleOptionClick(option)}
          id={option}
          style={
            question.selectedAnswer !== undefined &&
            question.selectedAnswer === option
              ? selectedOptionStyle
              : null
          }
        >
          {options[index] + ". " + option}
        </p>
        // </div>
      );
    });
    //console.log(optionItems);
    return optionItems;
  }

  function handleNext() {
    let nextQuestionNo = currQuestion + 1;
    const questionSize = question.length - 1;
    console.log(
      "nextQuestionNo" + nextQuestionNo + " question length " + questionSize
    );
    if (nextQuestionNo > questionSize) {
      // alert("There is no question available please add more");
      console.log("refreshIntervalId" + refreshIntervalId);
      clearInterval(refreshIntervalId);
      setIsLastQuestion(true);
      // return;
    }
    setcurrQuestion(nextQuestionNo);
  }

  var currentDate = new Date();
  var twentyMinutesLater = new Date(currentDate.getTime() + 10 * 60 * 1000);
  function startTimer() {
    const diffTime = twentyMinutesLater - Date.now();
    //console.log("diffTime " + diffTime);
    const minutes = Math.floor((diffTime / 1000 / 60) % 60);
    const seconds = Math.floor((diffTime / 1000) % 60);
    const timer =
      (minutes > 9 ? minutes : "0" + minutes) +
      ":" +
      (seconds > 9 ? seconds : "0" + seconds);
    //console.log("timer " + timer);
    document.getElementById("time").innerHTML = timer;
  }

  function handleStartQuizBtn() {
    setIsQuizStart(true);

    const refreshIntervalId = setInterval(() => {
      startTimer();
    }, 1000);
    setRefreshIntervalId(refreshIntervalId);
    console.log("refreshIntervalId " + refreshIntervalId);
    // clearInterval(refreshIntervalId);
    // setInterval(() => {
    //   stopTimer();
    // }, 10000);

    // useEffect(() => {
    //   startTimer();
    // }, 1000);
  }

  // function stopTimer() {
  //   console.log("stop timmer called");
  //   clearInterval(refreshIntervalId);
  // }

  function StartQuiz() {
    return (
      <div className="App">
        <div className="landing-page">
          <h1>Start the Quiz</h1>
          <p>Good luck!</p>
          <button
            type="submit"
            className="button"
            onClick={() => handleStartQuizBtn()}
          >
            Start the Java Quiz ❯
          </button>
        </div>
      </div>
    );
  }

  function Question() {
    return (
      <div className="App">
        <div>
          <nav>
            <h2>Java Quiz</h2>
            <p id="time"></p>
          </nav>
          <div className="quiz-container">
            <div className="question">
              {/* <p>Question</p> */}
              <h4>
                {question[currQuestion].questionNo +
                  ". " +
                  question[currQuestion].question}
              </h4>
              <div className="option">
                {getOpotions(question[currQuestion])}
              </div>
              <div className="redirect-btn">
                <button type="submit" onClick={() => handleNext()}>
                  Next
                </button>
                {/* <button type="submit">Pre</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Result({ question }) {
    const correctCount = getCrtQuesCount(question);
    const questionCount = question.length;
    console.log("correctCount " + correctCount);
    return (
      <div className="result-container">
        <div className="result-page">
          <button className="btn" type="submit">
            Try Again
          </button>
          <table>
            <thead>
              <th></th>
              <th></th>
            </thead>
            <tbody>
              <tr>
                <td>Total Question</td>
                <td className="total-question">{questionCount}</td>
              </tr>
              <tr>
                <td>Correct</td>
                <td className="correct">{correctCount}</td>
              </tr>
              <tr>
                <td>Incorrect</td>
                <td className="in-correct">{questionCount - correctCount}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn"
            type="submit"
            onClick={() => handleReviewAnswer()}
          >
            Review Answers
          </button>
        </div>
      </div>
    );
  }

  function handleReviewAnswer() {
    console.log("triggred");
    return <Question />;
  }

  function getCrtQuesCount(question) {
    console.log(question);
    let correctCount = 0;
    question.map((quest) => {
      if (
        quest.selectedAnswer !== "" &&
        quest.selectedAnswer === quest.correctAnswer
      ) {
        correctCount += 1;
      }
    });
    return correctCount;
  }

  function Answer() {
    <Question />;
  }

  return (
    <div>
      {isLastQuestion ? (
        <Result question={question} />
      ) : isQuizStart ? (
        <Question />
      ) : (
        <StartQuiz />
      )}
    </div>
  );
}

export default App;
