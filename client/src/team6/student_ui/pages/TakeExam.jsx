import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../../utils/fetchData";

const BASE_URL = "https://todu.mn/bs/lms/v1";

const TakeExam = () => {
  const { exam_id, student_id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load exam and questions
  useEffect(() => {
    const loadExamData = async () => {
      try {
        const examData = await fetchData(`${BASE_URL}/exams/${exam_id}`, "GET");
        const questionData = await fetchData(
          `${BASE_URL}/exams/${exam_id}/questions`,
          "GET"
        );

        setExam(examData);
        setQuestions(questionData || []);
        setTimeRemaining((examData?.duration || 30) * 60);

        // Restore saved answers
        const saved = JSON.parse(
          sessionStorage.getItem(`exam_${exam_id}_answers`) || "{}"
        );
        setAnswers(saved);
      } catch (error) {
        console.error("⚠️ Failed to load exam or questions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadExamData();
  }, [exam_id]);

  // Timer countdown
  useEffect(() => {
    if (!exam) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [exam]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (answer) => {
    const question = questions[currentQuestion];
    setAnswers((prev) => {
      const updated = { ...prev, [question.id]: answer };
      sessionStorage.setItem(
        `exam_${exam_id}_answers`,
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  const handleMultipleCorrectChange = (option) => {
    const currentQ = questions[currentQuestion];
    const currentAnswers = answers[currentQ.id] || [];
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter((a) => a !== option)
      : [...currentAnswers, option];

    setAnswers((prev) => {
      const updated = { ...prev, [currentQ.id]: newAnswers };
      sessionStorage.setItem(
        `exam_${exam_id}_answers`,
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await fetchData(
        `${BASE_URL}/students/${student_id}/exams/${exam_id}/submit`,
        "POST",
        {
          answers,
        }
      );

      sessionStorage.removeItem(`exam_${exam_id}_answers`);
      navigate(`/team6/student/exams/${exam_id}/students/${student_id}/result`);
    } catch (error) {
      console.error("⚠️ Failed to submit exam:", error);
      alert("Шалгалт илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-600">
        ⏳ Ачааллаж байна...
      </div>
    );
  }

  if (!exam || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Асуулт олдсонгүй
          </h2>
          <Link to="/team6/student" className="text-black hover:underline">
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const currentAnswer =
    answers[question.id] || (question.type === "multiple_correct" ? [] : "");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            to={`/team6/student/exams/${exam_id}/students/${student_id}/start`}
            className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2"
            onClick={(e) => {
              if (
                !window.confirm(
                  "Та шалгалтыг зогсоож буцах уу? Таны хариултууд устах болно."
                )
              ) {
                e.preventDefault();
              }
            }}
          >
            ← Буцах
          </Link>
        </div>

        {/* Timer Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{exam.title}</h2>
              <p className="text-sm text-gray-600">
                {questions.length} асуулт • Нийт {exam.totalMarks} оноо
              </p>
            </div>
            <div className="text-right">
              <div
                className={`text-3xl font-bold ${
                  timeRemaining < 300 ? "text-red-600" : "text-gray-900"
                }`}
              >
                ⏱️ {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-gray-600">Үлдсэн хугацаа</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Асуулт {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              Хариулсан: {Object.keys(answers).length} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="bg-black text-white px-3 py-1 rounded-lg font-bold text-sm">
                {currentQuestion + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {question.question}
                </h3>
                <p className="text-sm text-gray-600">Оноо: {question.marks}</p>
              </div>
            </div>
            {question.image && (
              <div className="mt-4 mb-4">
                <img
                  src={question.image}
                  alt="Асуултын зураг"
                  className="max-w-full h-auto rounded-lg border-2 border-gray-300 shadow-sm"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {question.type === "multiple_choice" &&
              question.options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    currentAnswer === option
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={currentAnswer === option}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="w-5 h-5"
                    />
                    <span className="text-gray-900 font-medium">{option}</span>
                  </div>
                </label>
              ))}

            {question.type === "multiple_correct" &&
              question.options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    currentAnswer.includes(option)
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      value={option}
                      checked={currentAnswer.includes(option)}
                      onChange={() => handleMultipleCorrectChange(option)}
                      className="w-5 h-5"
                    />
                    <span className="text-gray-900 font-medium">{option}</span>
                  </div>
                </label>
              ))}

            {question.type === "fill_blank" && (
              <input
                type="text"
                value={currentAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-black outline-none"
                placeholder="Хариултаа бичнэ үү..."
              />
            )}

            {question.type === "text_answer" && (
              <textarea
                value={currentAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-black outline-none resize-none"
                rows={6}
                placeholder="Хариултаа энд бичнэ үү..."
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Өмнөх
          </button>

          <div className="flex gap-2 overflow-x-auto">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  index === currentQuestion
                    ? "bg-black text-white"
                    : answers[questions[index].id]
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Дуусгах ✓
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Дараагийнх →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeExam;
