import { Link, useParams } from "react-router-dom";
import { mockExams, mockQuestionBank } from "../../data/mockData";
import { useState, useEffect } from "react";

const CheckExam = () => {
  const { exam_id, student_id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState({});

  const exam = mockExams.find((e) => e.id === parseInt(exam_id));

  useEffect(() => {
    // SessionStorage-аас асуултууд болон хариултуудыг авах
    const storedQuestionIds = JSON.parse(
      sessionStorage.getItem(`exam_${exam_id}_questions`) || "[]"
    );
    const storedAnswers = JSON.parse(
      sessionStorage.getItem(`exam_${exam_id}_answers`) || "{}"
    );

    const loadedQuestions = storedQuestionIds
      .map((id) => mockQuestionBank.find((q) => q.id === id))
      .filter(Boolean);
    setQuestions(loadedQuestions);
    setStudentAnswers(storedAnswers);
  }, [exam_id]);

  if (!exam || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Мэдээлэл олдсонгүй
          </h2>
          <Link to="/team6/student" className="text-black hover:underline">
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to check if answer is correct
  const checkAnswer = (question, studentAnswer) => {
    if (!studentAnswer) return false;

    if (question.type === "multiple_choice") {
      return question.correctAnswers[0] === studentAnswer;
    }

    if (question.type === "multiple_correct") {
      const correctSet = new Set(question.correctAnswers);
      const studentSet = new Set(studentAnswer);
      return (
        correctSet.size === studentSet.size &&
        [...correctSet].every((ans) => studentSet.has(ans))
      );
    }

    if (question.type === "fill_blank") {
      const userLower = studentAnswer.toLowerCase().trim();
      return (
        question.acceptableAnswers?.some(
          (acceptable) => acceptable.toLowerCase().trim() === userLower
        ) || question.correctAnswers[0].toLowerCase().trim() === userLower
      );
    }

    if (question.type === "text_answer") {
      const userLower = studentAnswer.toLowerCase().trim();
      return question.acceptableAnswers?.some(
        (acceptable) =>
          acceptable.toLowerCase().trim().includes(userLower) ||
          userLower.includes(acceptable.toLowerCase().trim())
      );
    }

    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/team6/student/exams/${exam_id}/students/${student_id}/result`}
            className="text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Буцах
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Зөв хариултууд
          </h1>
          <p className="text-gray-600">{exam.title} - 7 санамсаргүй асуулт</p>
        </div>

        {/* Questions and Answers */}
        <div className="space-y-6">
          {questions.map((question, index) => {
            const studentAnswer = studentAnswers[question.id];
            const isCorrect = checkAnswer(question, studentAnswer);

            return (
              <div
                key={question.id}
                className={`bg-white rounded-lg shadow-sm border-2 p-6 ${
                  isCorrect ? "border-green-200" : "border-red-200"
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-black text-white px-3 py-1 rounded-lg font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {question.question}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {question.type === "multiple_choice" &&
                          "☑️ Нэг сонголт"}
                        {question.type === "multiple_correct" &&
                          "✅ Олон сонголт"}
                        {question.type === "fill_blank" && "✍️ Нөхөх"}
                        {question.type === "text_answer" && "📝 Текст"}
                      </span>
                      <span className="text-sm text-gray-600">
                        Оноо: {question.marks}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full font-semibold text-sm ${
                      isCorrect
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isCorrect ? "✓ Зөв" : "✗ Буруу"}
                  </span>
                </div>

                {/* Question Image */}
                {question.image && (
                  <div className="mb-4">
                    <img
                      src={question.image}
                      alt="Асуултын зураг"
                      className="max-w-full h-auto rounded-lg border-2 border-gray-300 shadow-sm"
                      style={{ maxHeight: "400px" }}
                    />
                  </div>
                )}

                {/* Student Answer */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    Таны хариулт:
                  </div>
                  <div
                    className={`font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}
                  >
                    {question.type === "multiple_correct" &&
                    Array.isArray(studentAnswer) ? (
                      <div className="space-y-1">
                        {studentAnswer.map((ans, idx) => (
                          <div key={idx}>• {ans}</div>
                        ))}
                      </div>
                    ) : (
                      studentAnswer || (
                        <span className="text-gray-400">Хариулаагүй</span>
                      )
                    )}
                  </div>
                </div>

                {/* Correct Answer */}
                {!isCorrect && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm text-green-700 mb-1 font-medium">
                      ✓ Зөв хариулт:
                    </div>
                    <div className="font-semibold text-green-800">
                      {question.type === "multiple_correct" ? (
                        <div className="space-y-1">
                          {question.correctAnswers.map((ans, idx) => (
                            <div key={idx}>• {ans}</div>
                          ))}
                        </div>
                      ) : (
                        question.correctAnswers[0]
                      )}
                    </div>
                    {question.acceptableAnswers &&
                      question.acceptableAnswers.length > 0 && (
                        <div className="mt-2 text-sm text-green-600">
                          Бусад зөв хариултууд:{" "}
                          {question.acceptableAnswers.join(", ")}
                        </div>
                      )}
                  </div>
                )}

                {/* Options (for multiple choice and multiple correct) */}
                {(question.type === "multiple_choice" ||
                  question.type === "multiple_correct") && (
                  <div className="mt-4 space-y-2">
                    {question.options.map((option, idx) => {
                      const isStudentChoice =
                        question.type === "multiple_correct"
                          ? Array.isArray(studentAnswer) &&
                            studentAnswer.includes(option)
                          : studentAnswer === option;
                      const isCorrectOption =
                        question.correctAnswers.includes(option);

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border-2 ${
                            isCorrectOption
                              ? "border-green-300 bg-green-50"
                              : isStudentChoice
                                ? "border-red-300 bg-red-50"
                                : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isCorrectOption && (
                              <span className="text-green-600">✓</span>
                            )}
                            {isStudentChoice && !isCorrectOption && (
                              <span className="text-red-600">✗</span>
                            )}
                            <span
                              className={`font-medium ${
                                isCorrectOption
                                  ? "text-green-800"
                                  : isStudentChoice
                                    ? "text-red-800"
                                    : "text-gray-700"
                              }`}
                            >
                              {option}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            to={`/team6/student/exams/${exam_id}/students/${student_id}/result`}
            className="block w-full px-6 py-4 text-center bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Үр дүн рүү буцах
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckExam;
