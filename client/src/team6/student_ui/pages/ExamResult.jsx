import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "../../../utils/fetchData";

const BASE_URL = "https://todu.mn/bs/lms/v1";

const ExamResult = () => {
  const { exam_id, student_id } = useParams();
  const [exam, setExam] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResult = async () => {
      try {
        const [examData, resultData] = await Promise.all([
          fetchData(`${BASE_URL}/exams/${exam_id}`, "GET"),
          fetchData(
            `${BASE_URL}/students/${student_id}/exams/${exam_id}/result`,
            "GET"
          ),
        ]);

        setExam(examData);
        setResult(resultData);
      } catch (error) {
        console.error("⚠️ Failed to load exam result:", error);
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [exam_id, student_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
        ⏳ Үр дүнг ачааллаж байна...
      </div>
    );
  }

  if (!exam || !result) {
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

  const { score, totalMarks, correctCount, totalQuestions, duration, status } =
    result;
  const passed = score >= exam.passingMarks;
  const percentage = ((score / totalMarks) * 100).toFixed(1);

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
            className={`p-8 text-center ${
              passed ? "bg-green-600" : "bg-red-600"
            } text-white`}
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
                  <span className="text-3xl text-gray-500">/{totalMarks}</span>
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
              <InfoRow label="Шалгалт:" value={exam.title} />
              <InfoRow label="Нийт асуулт:" value={totalQuestions} />
              <InfoRow
                label="Шалгалт өгсөн огноо:"
                value={formatDate(result.submittedAt)}
              />
              <InfoRow
                label="Үргэлжилсэн хугацаа:"
                value={`${duration} минут`}
              />
              <InfoRow label="Тэнцэх оноо:" value={exam.passingMarks} />
              <InfoRow
                label="Үр дүн:"
                value={
                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      passed
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {passed ? "✓ Тэнцсэн" : "✗ Тэнцээгүй"}
                  </span>
                }
              />
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

// ✅ Small helper component for rows
const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

export default ExamResult;
