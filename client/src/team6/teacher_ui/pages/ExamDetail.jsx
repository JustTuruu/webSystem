import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchData } from "../../../utils/fetchData";

const BASE_URL = "https://todu.mn/bs/lms/v1";

const ExamDetail = () => {
  const { exam_id } = useParams();
  const [exam, setExam] = useState(null);
  const [variants, setVariants] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExamDetails = async () => {
      try {
        const [examData, variantData, statsData] = await Promise.all([
          fetchData(`${BASE_URL}/exams/${exam_id}`, "GET"),
          fetchData(`${BASE_URL}/exams/${exam_id}/variants`, "GET"),
          fetchData(`${BASE_URL}/exams/${exam_id}/stats`, "GET"), // optional if available
        ]);

        setExam(examData);
        setVariants(Array.isArray(variantData) ? variantData : []);
        setStats(statsData || null);
      } catch (error) {
        console.error("⚠️ Error fetching exam detail:", error);
      } finally {
        setLoading(false);
      }
    };

    loadExamDetails();
  }, [exam_id]);

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
    };
    const labels = {
      upcoming: "Удахгүй",
      active: "Явагдаж байна",
      completed: "Дууссан",
    };
    return (
      <span
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          badges[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {labels[status] || "Тодорхойгүй"}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-600">
        ⏳ Ачааллаж байна...
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Шалгалт олдсонгүй
          </h2>
          <Link to="/team6/teacher" className="text-black hover:underline">
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/team6/teacher"
            className="text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Буцах
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {exam.title || "Нэргүй шалгалт"}
              </h1>
              <p className="text-gray-600">
                {exam.description || "Тайлбар байхгүй"}
              </p>
            </div>
            {getStatusBadge(exam.status)}
          </div>
        </div>

        {/* Exam Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Шалгалтын мэдээлэл
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InfoRow
                label="Эхлэх огноо, цаг:"
                value={formatDate(exam.startDate)}
              />
              <InfoRow
                label="Дуусах огноо, цаг:"
                value={formatDate(exam.endDate)}
              />
              <InfoRow
                label="Үргэлжлэх хугацаа:"
                value={`${exam.duration || 0} минут`}
              />
            </div>
            <div className="space-y-4">
              <InfoRow label="Нийт оноо:" value={exam.totalMarks || "—"} />
              <InfoRow label="Тэнцэх оноо:" value={exam.passingMarks || "—"} />
              <InfoRow
                label="Үүсгэсэн:"
                value={exam.createdBy || "Тодорхойгүй"}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Статистик</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatBox label="Нийт оролцогчид" value={stats.totalStudents} />
              <StatBox label="Дууссан" value={stats.completedStudents} />
              <StatBox label="Дундаж оноо" value={stats.averageScore} />
              <StatBox label="Тэнцсэн хувь" value={`${stats.passingRate}%`} />
            </div>
          </div>
        )}

        {/* Variants */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Вариантууд ({variants.length})
            </h2>
            <Link
              to={`/team6/teacher/exams/${exam_id}/variants/create`}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              + Вариант нэмэх
            </Link>
          </div>
          {variants.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Вариант нэмэгдээгүй байна
            </div>
          ) : (
            <div className="space-y-3">
              {variants.map((variant) => (
                <Link
                  key={variant.id}
                  to={`/team6/teacher/exams/${exam_id}/variants/${variant.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {variant.name || "Нэргүй вариант"}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {variant.description || "Тайлбар байхгүй"}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {variant.totalQuestions || 0} асуулт
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            to={`/team6/teacher/courses/${exam.courseId}/exams/${exam_id}/edit`}
            className="flex-1 px-6 py-3 text-center border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Засах
          </Link>
          <Link
            to={`/team6/teacher/exams/${exam_id}/report`}
            className="flex-1 px-6 py-3 text-center bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Тайлан харах
          </Link>
        </div>
      </div>
    </div>
  );
};

// Small reusable components
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-100 pb-3">
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

const StatBox = ({ label, value }) => (
  <div className="text-center p-4 bg-gray-50 rounded-lg">
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export default ExamDetail;
