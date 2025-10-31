import { Link, useParams } from "react-router-dom";
import { mockExams, mockQuestionBank } from "../../data/mockData";
import { useState, useEffect } from "react";

const ExamResult = () => {
  const { exam_id, student_id } = useParams();
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const exam = mockExams.find((e) => e.id === parseInt(exam_id));

  useEffect(() => {
    // SessionStorage-аас асуултууд болон хариултуудыг авах
    const storedQuestionIds = JSON.parse(
      sessionStorage.getItem(`exam_${exam_id}_questions`) || "[]"
    );
    const storedAnswers = JSON.parse(
      sessionStorage.getItem(`exam_${exam_id}_answers`) || "{}"
    );

    if (storedQuestionIds.length > 0) {
      const questions = storedQuestionIds
        .map((id) => mockQuestionBank.find((q) => q.id === id))
        .filter(Boolean);

      // Оноо тооцох
      let totalScore = 0;
      let correct = 0;

      questions.forEach((q) => {
        const userAnswer = storedAnswers[q.id];
        if (userAnswer) {
          // Зөв эсэхийг шалгах
          let isCorrect = false;

          if (q.type === "multiple_choice") {
            isCorrect = q.correctAnswers[0] === userAnswer;
          } else if (q.type === "multiple_correct") {
            const correctSet = new Set(q.correctAnswers);
            const userSet = new Set(userAnswer);
            isCorrect =
              correctSet.size === userSet.size &&
              [...correctSet].every((ans) => userSet.has(ans));
          } else if (q.type === "fill_blank" || q.type === "text_answer") {
            // Жижиг үсгээр харьцуулах
            const userLower = userAnswer.toLowerCase().trim();
            isCorrect =
              q.correctAnswers.some(
                (ans) => ans.toLowerCase().trim() === userLower
              ) ||
              (q.acceptableAnswers &&
                q.acceptableAnswers.some(
                  (ans) => ans.toLowerCase().trim() === userLower
                ));
          }

          if (isCorrect) {
            totalScore += q.marks || 5;
            correct++;
          }
        }
      });

      setScore(totalScore);
      setTotalQuestions(questions.length);
      setCorrectCount(correct);
    }
  }, [exam_id]);

  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Үр дүн олдсонгүй
          </h2>
          <Link to="/team6/student" className="text-black hover:underline">
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  const passed = score >= exam.passingMarks;
  const percentage = ((score / exam.totalMarks) * 100).toFixed(1);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <div className="mb-4 text-center">
          <Link
            to="/team6/student"
            className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2"
          >
            ← Нүүр хуудас руу буцах
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div
            className={`p-8 text-center ${passed ? "bg-green-600" : "bg-red-600"} text-white`}
          >
            <div className="text-6xl mb-4">{passed ? "🎉" : "😞"}</div>
            <h1 className="text-3xl font-bold mb-2">
              {passed ? "Баяр хүргэе!" : "Дахин оролдоорой!"}
            </h1>
            <p className="text-lg opacity-90">
              {passed
                ? "Та шалгалтыг амжилттай давлаа"
                : "Шалгалтыг давж чадсангүй"}
            </p>
          </div>

          {/* Score Display */}
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-block">
                <div className="text-7xl font-bold text-gray-900 mb-2">
                  {score}
                  <span className="text-3xl text-gray-500">
                    /{exam.totalMarks}
                  </span>
                </div>
                <div className="text-2xl font-semibold text-gray-600">
                  {percentage}%
                </div>
                <div className="text-lg text-gray-500 mt-2">
                  Зөв хариулт: {correctCount}/{totalQuestions}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Шалгалт:</span>
                <span className="font-semibold text-gray-900">
                  {exam.title}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Нийт асуулт:</span>
                <span className="font-semibold text-gray-900">
                  {totalQuestions}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">
                  Үргэлжилсэн хугацаа:
                </span>
                <span className="font-semibold text-gray-900">
                  {exam.duration} минут
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Тэнцэх оноо:</span>
                <span className="font-semibold text-gray-900">
                  {exam.passingMarks}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Үр дүн:</span>
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${
                    passed
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {passed ? "✓ Тэнцсэн" : "✗ Тэнцээгүй"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Link
                to="/team6/student"
                className="flex-1 px-6 py-4 text-center border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Буцах
              </Link>
              <Link
                to={`/team6/student/exams/${exam_id}/students/${student_id}/check`}
                className="flex-1 px-6 py-4 text-center bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Зөв хариулт харах
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
