import { Link } from "react-router-dom";
import {
  mockCourses,
  mockExams,
  mockQuestionBank,
  mockTopics,
} from "../../data/mockData";

const TeacherHome = () => {
  // Calculate statistics
  const totalExams = mockExams.length;
  const totalQuestions = mockQuestionBank.length;
  const totalTopics = mockTopics.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                👨‍🏫 Багшийн систем
              </h1>
              <p className="text-gray-600 mt-1">
                Шалгалт удирдах, асуултын сангаас сонгох
              </p>
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
                📚
              </div>
              <div>
                <div className="text-xs text-gray-600">Нийт хичээл</div>
                <div className="text-xl font-bold text-gray-900">
                  {mockCourses.length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                📑
              </div>
              <div>
                <div className="text-xs text-gray-600">Сэдвүүд</div>
                <div className="text-xl font-bold text-gray-900">
                  {totalTopics}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">
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
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">
                ❓
              </div>
              <div>
                <div className="text-xs text-gray-600">Асуултын сан</div>
                <div className="text-xl font-bold text-gray-900">
                  {totalQuestions}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Шалгалтын хуудсууд */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📝</span> Шалгалтын хуудсууд
            </h2>
            <div className="space-y-2">
              {mockCourses.slice(0, 2).map((course) => (
                <Link
                  key={course.id}
                  to={`/team6/teacher/courses/${course.id}/exams`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-black">
                        {course.name} - Шалгалтын жагсаалт
                      </div>
                      <div className="text-sm text-gray-600">
                        {
                          mockExams.filter((e) => e.courseId === course.id)
                            .length
                        }{" "}
                        шалгалт
                      </div>
                    </div>
                    <span className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </Link>
              ))}

              <Link
                to={`/team6/teacher/courses/1/exams/create`}
                className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-black flex items-center gap-2">
                      <span>➕</span> Шинэ шалгалт үүсгэх
                    </div>
                    <div className="text-sm text-gray-600">
                      Асуултын сангаас сонгох
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </Link>

              {totalExams > 0 && (
                <>
                  <Link
                    to={`/team6/teacher/courses/1/exams/1`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-black">
                          Шалгалтын мэдээлэл харах
                        </div>
                        <div className="text-sm text-gray-600">
                          Дэлгэрэнгүй мэдээлэл, тохиргоо
                        </div>
                      </div>
                      <span className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>
                  </Link>

                  <Link
                    to={`/team6/teacher/courses/1/exams/1/edit`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-black flex items-center gap-2">
                          <span>✏️</span> Шалгалт засах
                        </div>
                        <div className="text-sm text-gray-600">
                          Сэдэв, асуулт, тохиргоо засах
                        </div>
                      </div>
                      <span className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>
                  </Link>

                  <Link
                    to={`/team6/teacher/exams/1/report`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-black flex items-center gap-2">
                          <span>📊</span> Шалгалтын тайлан
                        </div>
                        <div className="text-sm text-gray-600">
                          Статистик, үр дүн харах
                        </div>
                      </div>
                      <span className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Вариантын хуудсууд */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📋</span> Вариантын хуудсууд
            </h2>
            <div className="space-y-2">
              {totalExams > 0 && (
                <>
                  <Link
                    to={`/team6/teacher/exams/1/variants`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-black">
                          Вариантын жагсаалт
                        </div>
                        <div className="text-sm text-gray-600">
                          Бүх вариантууд харах
                        </div>
                      </div>
                      <span className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>
                  </Link>

                  <Link
                    to={`/team6/teacher/courses/1/exams/1/variants/create`}
                    className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-black flex items-center gap-2">
                          <span>➕</span> Вариант нэмэх
                        </div>
                        <div className="text-sm text-gray-600">
                          Санамсаргүй асуулт сонгох
                        </div>
                      </div>
                      <span className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>
                  </Link>

                  <Link
                    to={`/team6/teacher/exams/1/variants/1`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-black">
                          Вариант харах
                        </div>
                        <div className="text-sm text-gray-600">
                          Асуултууд, хариултууд харах
                        </div>
                      </div>
                      <span className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>
                  </Link>

                  <Link
                    to={`/team6/teacher/courses/1/exams/1/variants/1/edit`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-black flex items-center gap-2">
                          <span>✏️</span> Вариант засах
                        </div>
                        <div className="text-sm text-gray-600">
                          Асуулт солих, засах
                        </div>
                      </div>
                      <span className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Асуултын сан - Highlighted Section */}
        <div className="bg-gray-800 text-white py-8 px-8 rounded-lg mt-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <span className="text-3xl">🗃️</span> Асуултын сан
              </h2>
              <p className="text-purple-100 mb-4">
                Олон төрлийн асуултууд: Сонгох, олон зөв хариулт, өгүүлбэр
                нөхөх, бичгээр хариулах
              </p>
              <ul className="space-y-2 text-sm text-purple-100 mb-6">
                <li className="flex items-center gap-2">
                  <span>✓</span> Хичээл болон сэдвээр шүүх
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> Хэцүү, дунд, хялбар түвшинээр ангилах
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> {totalQuestions} асуулт бэлэн байна
                </li>
              </ul>
              <Link
                to="/team6/teacher/question-bank"
                className="inline-block px-6 py-3 bg-white text-purple-700 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Асуултын сан нээх →
              </Link>
            </div>
            <div className="hidden lg:block text-8xl opacity-20">❓</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
