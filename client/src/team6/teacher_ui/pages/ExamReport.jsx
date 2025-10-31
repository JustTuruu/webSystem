import { Link, useParams } from "react-router-dom";
import {
  mockExams,
  mockExamStats,
  mockStudentExams,
} from "../../data/mockData";

const ExamReport = () => {
  const { exam_id } = useParams();
  const exam = mockExams.find((e) => e.id === parseInt(exam_id));
  const stats = mockExamStats[exam_id];
  const studentExams = mockStudentExams.filter(
    (se) => se.examId === parseInt(exam_id)
  );

  if (!exam || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Тайлан олдсонгүй
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/team6/teacher/exams/${exam_id}`}
            className="text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Буцах
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Шалгалтын тайлан
          </h1>
          <p className="text-gray-600">{exam.title}</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {stats.totalStudents}
            </div>
            <div className="text-sm text-gray-600">Нийт оролцогчид</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {stats.completedStudents}
            </div>
            <div className="text-sm text-gray-600">Дууссан</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {stats.averageScore}
            </div>
            <div className="text-sm text-gray-600">Дундаж оноо</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {stats.highestScore}
            </div>
            <div className="text-sm text-gray-600">Хамгийн өндөр</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {stats.passingRate}%
            </div>
            <div className="text-sm text-gray-600">Тэнцсэн хувь</div>
          </div>
        </div>

        {/* Score Distribution Chart (Mock) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Онооны хуваарилалт
          </h2>
          <div className="h-64 flex items-end justify-around gap-4 border-b border-l border-gray-200 p-4">
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-16 bg-red-500 rounded-t"
                style={{ height: "40%" }}
              ></div>
              <div className="text-sm font-medium text-gray-700">0-40</div>
              <div className="text-xs text-gray-500">5 хүн</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-16 bg-orange-500 rounded-t"
                style={{ height: "60%" }}
              ></div>
              <div className="text-sm font-medium text-gray-700">41-60</div>
              <div className="text-xs text-gray-500">12 хүн</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-16 bg-yellow-500 rounded-t"
                style={{ height: "85%" }}
              ></div>
              <div className="text-sm font-medium text-gray-700">61-80</div>
              <div className="text-xs text-gray-500">18 хүн</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-16 bg-green-500 rounded-t"
                style={{ height: "50%" }}
              ></div>
              <div className="text-sm font-medium text-gray-700">81-100</div>
              <div className="text-xs text-gray-500">10 хүн</div>
            </div>
          </div>
        </div>

        {/* Student Results Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Суралцагчдын үр дүн
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    №
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Суралцагчийн нэр
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Оноо
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Үр дүн
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentExams.map((studentExam, index) => (
                  <tr key={studentExam.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {studentExam.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(studentExam.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {studentExam.score !== null ? (
                        <span className="font-semibold">
                          {studentExam.score}/{exam.totalMarks}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {studentExam.score !== null ? (
                        studentExam.score >= exam.passingMarks ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Тэнцсэн
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            Тэнцээгүй
                          </span>
                        )
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamReport;
