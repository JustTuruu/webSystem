import { Link } from "react-router-dom";
import { mockExams, mockStudentExams } from "../../data/mockData";

const StudentHome = () => {
  // Mock student ID (өөрийн ID)
  const currentStudentId = 1;

  // Багшийн идэвхтэй шалгалтууд
  const activeExams = mockExams.filter((e) => e.status === "active");

  // Суралцагчийн өгсөн шалгалтууд
  const myExams = mockStudentExams.filter(
    (se) => se.studentId === currentStudentId
  );

  // Статистик
  const totalExams = myExams.length;
  const completedExams = myExams.filter((e) => e.status === "completed").length;
  const inProgressExams = myExams.filter(
    (e) => e.status === "in_progress"
  ).length;
  const averageScore =
    completedExams > 0
      ? Math.round(
          myExams
            .filter((e) => e.score !== null)
            .reduce((sum, e) => sum + e.score, 0) / completedExams
        )
      : 0;

  const getStatusBadge = (status) => {
    const badges = {
      not_started: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    };
    const labels = {
      not_started: "Эхлээгүй",
      in_progress: "Явагдаж байна",
      completed: "Дууссан",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                👨‍🎓 Суралцагчийн систем
              </h1>
              <p className="text-gray-600 mt-1">Шалгалт өгөх, үр дүн харах</p>
            </div>
            <Link
              to="/team6"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Гарах
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                📝
              </div>
              <div>
                <div className="text-xs text-gray-600">Нийт шалгалт</div>
                <div className="text-xl font-bold text-gray-900">
                  {totalExams}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                ✅
              </div>
              <div>
                <div className="text-xs text-gray-600">Дууссан</div>
                <div className="text-xl font-bold text-gray-900">
                  {completedExams}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">
                ⏳
              </div>
              <div>
                <div className="text-xs text-gray-600">Явагдаж байна</div>
                <div className="text-xl font-bold text-gray-900">
                  {inProgressExams}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                📊
              </div>
              <div>
                <div className="text-xs text-gray-600">Дундаж оноо</div>
                <div className="text-xl font-bold text-gray-900">
                  {averageScore}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Exams from Teacher */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎯</span> Идэвхтэй шалгалтууд
          </h2>

          {activeExams.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📭</div>
              <p>Идэвхтэй шалгалт байхгүй байна</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeExams.map((exam) => {
                const myExam = myExams.find((me) => me.examId === exam.id);
                const canStart = !myExam || myExam.status === "not_started";

                return (
                  <div
                    key={exam.id}
                    className="border-2 border-gray-200 rounded-lg p-5 hover:border-black transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {exam.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {exam.description}
                        </p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>⏱ {exam.duration} минут</span>
                          <span>📊 {exam.totalMarks} оноо</span>
                          <span>🎯 Тэнцэх: {exam.passingMarks}</span>
                        </div>
                      </div>
                      {myExam && getStatusBadge(myExam.status)}
                    </div>

                    <div className="flex gap-2">
                      {canStart ? (
                        <Link
                          to={`/team6/student/exams/${exam.id}/students/${currentStudentId}/start`}
                          className="flex-1 px-4 py-2 bg-black text-white text-center rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                          Шалгалт эхлүүлэх
                        </Link>
                      ) : myExam.status === "completed" ? (
                        <Link
                          to={`/team6/student/exams/${exam.id}/students/${currentStudentId}/result`}
                          className="flex-1 px-4 py-2 bg-green-600 text-white text-center rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                          Үр дүн харах ({myExam.score}/{exam.totalMarks})
                        </Link>
                      ) : (
                        <Link
                          to={`/team6/student/exams/${exam.id}/students/${currentStudentId}/edit`}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          Үргэлжлүүлэх
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* My Past Exams */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📚</span> Миний өгсөн шалгалтууд
          </h2>

          {myExams.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <p>Та одоогоор шалгалт өгөөгүй байна</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myExams.map((studentExam) => {
                const exam = mockExams.find((e) => e.id === studentExam.examId);
                if (!exam) return null;

                return (
                  <div
                    key={studentExam.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {exam.title}
                        </h3>
                        <div className="flex gap-3 text-sm text-gray-600">
                          {getStatusBadge(studentExam.status)}
                          {studentExam.score !== null && (
                            <span className="font-semibold">
                              Оноо: {studentExam.score}/{exam.totalMarks}
                            </span>
                          )}
                        </div>
                      </div>
                      {studentExam.status === "completed" && (
                        <Link
                          to={`/team6/student/exams/${exam.id}/students/${currentStudentId}/result`}
                          className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          Үр дүн харах
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
