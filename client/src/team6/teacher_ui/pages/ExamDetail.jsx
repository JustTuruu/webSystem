import { Link, useParams } from "react-router-dom";
import { mockExams, mockVariants, mockExamStats } from "../../data/mockData";

const ExamDetail = () => {
  const { exam_id } = useParams();
  const exam = mockExams.find((e) => e.id === parseInt(exam_id));
  const variants = mockVariants.filter((v) => v.examId === parseInt(exam_id));
  const stats = mockExamStats[exam_id];

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
        className={`px-4 py-2 rounded-full text-sm font-medium ${badges[status]}`}
      >
        {labels[status]}
      </span>
    );
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
                {exam.title}
              </h1>
              <p className="text-gray-600">{exam.description}</p>
            </div>
            {getStatusBadge(exam.status)}
          </div>
        </div>

        {/* Main Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Шалгалтын мэдээлэл
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Эхлэх огноо, цаг:</span>
                <span className="font-semibold text-gray-900">
                  {formatDate(exam.startDate)}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Дуусах огноо, цаг:</span>
                <span className="font-semibold text-gray-900">
                  {formatDate(exam.endDate)}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Үргэлжлэх хугацаа:</span>
                <span className="font-semibold text-gray-900">
                  {exam.duration} минут
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Нийт оноо:</span>
                <span className="font-semibold text-gray-900">
                  {exam.totalMarks}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Тэнцэх оноо:</span>
                <span className="font-semibold text-gray-900">
                  {exam.passingMarks}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Үүсгэсэн:</span>
                <span className="font-semibold text-gray-900">
                  {exam.createdBy}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        {stats && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Статистик</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.totalStudents}
                </div>
                <div className="text-sm text-gray-600">Нийт оролцогчид</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.completedStudents}
                </div>
                <div className="text-sm text-gray-600">Дууссан</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.averageScore}
                </div>
                <div className="text-sm text-gray-600">Дундаж оноо</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.passingRate}%
                </div>
                <div className="text-sm text-gray-600">Тэнцсэн хувь</div>
              </div>
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
                        {variant.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {variant.description}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {variant.totalQuestions} асуулт
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
            to={`/team6/teacher/exams/${exam_id}/edit`}
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

export default ExamDetail;
