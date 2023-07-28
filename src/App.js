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
  const [currQuestion, setcurrQuestion] = useState(0);
  const [isQuizStart, setIsQuizStart] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [refreshIntervalId, setRefreshIntervalId] = useState(null);
  const [isAnswer, setIsAnswer] = useState(false);
  const options = ["A", "B", "C", "D"];

  function handleOptionClick(val) {
    const questionAndAnswer = Object.assign({}, question[currQuestion]);
    questionAndAnswer.selectedAnswer = val;
    const newQuestions = question.slice();
    newQuestions[currQuestion] = questionAndAnswer;
    setQuestion(newQuestions);
  }

  function getOpotions(question) {
    let optionItems = question.options.map((option, index) => {
      let optionStyle = "";
      if (
        // question.selectedAnswer === question.correctAnswer &&
        question.correctAnswer === option &&
        isAnswer
      ) {
        optionStyle += " correct-answer";
      }
      if (
        question.selectedAnswer !== question.correctAnswer &&
        question.selectedAnswer === option &&
        isAnswer
      ) {
        optionStyle += " wrong-answer";
      }

      if (
        question.selectedAnswer !== undefined &&
        question.selectedAnswer === option &&
        isAnswer === false
      ) {
        optionStyle += " selected-answer";
      }
      return (
        <p
          onClick={(e) => handleOptionClick(option)}
          id={option}
          className={optionStyle}
        >
          {options[index] + ". " + option}
        </p>
        // </div>
      );
    });
    return optionItems;
  }

  function handleNext() {
    let nextQuestionNo = currQuestion + 1;
    const questionSize = question.length - 1;
    if (nextQuestionNo > questionSize) {
      clearInterval(refreshIntervalId);
      setIsLastQuestion(true);
    }
    setcurrQuestion(nextQuestionNo);
  }

  var currentDate = new Date();
  var twentyMinutesLater = new Date(currentDate.getTime() + 5 * 60 * 1000);
  function startTimer(refreshIntervalId) {
    const diffTime = twentyMinutesLater - Date.now();
    const minutes = Math.floor((diffTime / 1000 / 60) % 60);
    const seconds = Math.floor((diffTime / 1000) % 60);
    const timer =
      (minutes > 9 ? minutes : "0" + minutes) +
      ":" +
      (seconds > 9 ? seconds : "0" + seconds);

    if (minutes === 0 && seconds === 0) {
      setIsLastQuestion(true);
      clearInterval(refreshIntervalId);
    }
    document.getElementById("time").innerHTML = timer;
  }

  function handleStartQuizBtn() {
    setIsQuizStart(true);

    const refreshIntervalId = setInterval(() => {
      startTimer(refreshIntervalId);
    }, 1000);
    setRefreshIntervalId(refreshIntervalId);
  }

  function StartQuiz() {
    return (
      // <div className="App">
      <div className="landing-page">
        <h1>Java Basic Quiz</h1>
        {/* <p>Good luck!</p> */}
        <button
          type="submit"
          className="btn start-btn"
          onClick={() => handleStartQuizBtn()}
        >
          Start Quiz ❯
        </button>
      </div>
      // </div>
    );
  }

  function QuestionPage({ question }) {
    return (
      // <div className="App">
      <div>
        <nav>
          <h2>Java Quiz</h2>
          <h2 id="time">Timer</h2>
        </nav>
        <div className="quiz-container">
          <Question currentQuestion={question} />
        </div>
      </div>
      // </div>
    );
  }

  function Question({ currentQuestion }) {
    let optionClass = isAnswer ? "option no-hover" : "option";
    return (
      <div className="question">
        <h4>{currentQuestion.questionNo + ". " + currentQuestion.question}</h4>
        <div className={optionClass}>{getOpotions(currentQuestion)}</div>
        <div className="redirect-btn">
          <button
            type="submit"
            onClick={() => handleNext()}
            style={isAnswer ? { display: "none" } : null}
            className="next-btn"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  function Result({ question }) {
    const correctCount = getCrtQuesCount(question);
    const questionCount = question.length;
    return (
      <div className="result-container">
        <div className="result-page">
          <button
            type="submit"
            className="btn"
            onClick={() => handleTryAgainBtn()}
          >
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
    setIsAnswer(true);
  }

  function getCrtQuesCount(question) {
    let correctCount = 0;
    question.forEach((quest) => {
      if (
        quest.selectedAnswer !== "" &&
        quest.selectedAnswer === quest.correctAnswer
      ) {
        correctCount += 1;
      }
    });
    return correctCount;
  }

  function Answer({ questions }) {
    return (
      <div className="answer-container">
        <h3>Answer</h3>
        {getAllAnswer(questions)}
        <button
          type="submit"
          className="btn try-again"
          onClick={() => handleTryAgainBtn()}
        >
          Try Again
        </button>
      </div>
    );
  }

  function handleTryAgainBtn() {
    setIsQuizStart(true);
    setIsLastQuestion(false);
    setcurrQuestion(0);
    setQuestion(questions);
    setIsAnswer(false);
    handleStartQuizBtn();
  }

  function getAllAnswer(questions) {
    let allAnswer = questions.map((quest) => {
      return <Question currentQuestion={quest} />;
    });
    return allAnswer;
  }

  let className = "App ";
  if (isAnswer) {
    className += "full-height";
  }

  return (
    <div className={className}>
      {isAnswer ? (
        <Answer questions={question} />
      ) : isLastQuestion ? (
        <Result question={question} />
      ) : isQuizStart ? (
        <QuestionPage question={question[currQuestion]} />
      ) : (
        <StartQuiz />
      )}
      {/* {isLastQuestion ? (
        <Result question={question} />
      ) : isQuizStart ? (
        <QuestionPage />
      ) : (
        <StartQuiz />
      )} */}
    </div>
  );
}

export default App;
