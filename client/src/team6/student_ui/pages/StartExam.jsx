import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "../../../utils/fetchData";

const BASE_URL = "https://todu.mn/bs/lms/v1";

const StartExam = () => {
  const { exam_id, student_id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [studentExam, setStudentExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExamData = async () => {
      try {
        const [examData, studentExamData] = await Promise.all([
          fetchData(`${BASE_URL}/exams/${exam_id}`, "GET"),
          fetchData(
            `${BASE_URL}/students/${student_id}/exams/${exam_id}`,
            "GET"
          ),
        ]);
        setExam(examData);
        setStudentExam(studentExamData);
      } catch (error) {
        console.error("⚠️ Failed to fetch exam data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadExamData();
  }, [exam_id, student_id]);

  const handleStartExam = async () => {
    try {
      // Request backend for random question IDs
      const randomQuestions = await fetchData(
        `${BASE_URL}/exams/${exam_id}/random-questions`,
        "GET"
      );

      if (!Array.isArray(randomQuestions) || randomQuestions.length === 0) {
        alert("Асуулт олдсонгүй. Багш шалгалт тохируулсан эсэхийг шалгана уу.");
        return;
      }

      console.log("✅ Selected random questions:", randomQuestions);

      // Save to sessionStorage
      sessionStorage.setItem(
        `exam_${exam_id}_questions`,
        JSON.stringify(randomQuestions)
      );

      // Redirect to TakeExam page
      navigate(`/team6/student/exams/${exam_id}/students/${student_id}/edit`);
    } catch (error) {
      console.error("⚠️ Failed to start exam:", error);
      alert("Шалгалт эхлүүлэхэд алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
        ⏳ Ачааллаж байна...
      </div>
    );
  }

  if (!exam || !studentExam) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Шалгалт олдсонгүй
          </h2>
          <Link to="/team6/student" className="text-black hover:underline">
            Буцах
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="bg-black text-white p-8 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h1 className="text-3xl font-bold mb-2">{exam.title}</h1>
            <p className="text-gray-300">{exam.description}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="space-y-6 mb-8">
              <InfoRow label="Эхлэх цаг:" value={formatDate(exam.startDate)} />
              <InfoRow
                label="Үргэлжлэх хугацаа:"
                value={`${exam.duration} минут`}
              />
              <InfoRow label="Нийт оноо:" value={exam.totalMarks} />
              <InfoRow label="Тэнцэх оноо:" value={exam.passingMarks} />
            </div>

            {/* Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-3">
                📌 Анхаарах зүйлс:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • Шалгалт эхэлсний дараа тогтоосон хугацаанд дуусгах
                  шаардлагатай
                </li>
                <li>
                  • Хариултаа оруулсны дараа “Дараагийнх” товчийг дарна уу
                </li>
                <li>
                  • Бүх асуултад хариулсны дараа “Дуусгах” товчийг дарна уу
                </li>
                <li>• Шалгалт дууссаны дараа өөрчлөлт хийх боломжгүй</li>
              </ul>
            </div>

            {/* Actions */}
            {studentExam.status === "not_started" ? (
              <div className="flex gap-4">
                <Link
                  to="/team6/student"
                  className="flex-1 px-6 py-4 text-center border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Буцах
                </Link>
                <button
                  onClick={handleStartExam}
                  className="flex-1 px-6 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Шалгалт эхлүүлэх
                </button>
              </div>
            ) : studentExam.status === "in_progress" ? (
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    navigate(
                      `/team6/student/exams/${exam_id}/students/${student_id}/edit`
                    )
                  }
                  className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Үргэлжлүүлэх
                </button>
                <Link
                  to="/team6/student"
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-50"
                >
                  Буцах
                </Link>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-yellow-600 mb-4">
                  ⚠️ Та энэ шалгалтыг аль хэдийн өгсөн байна
                </div>
                <Link
                  to={`/team6/student/exams/${exam_id}/students/${student_id}/result`}
                  className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Үр дүн харах
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Small UI helper
const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

export default StartExam;
