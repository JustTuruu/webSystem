import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../../../utils/fetchData";

const BASE_URL = "https://todu.mn/bs/lms/v1";

const TeacherHome = () => {
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseRes, examRes, questionRes] = await Promise.all([
          fetchData(`${BASE_URL}/courses`, "GET"),
          fetchData(`${BASE_URL}/exams`, "GET"),
          fetchData(`${BASE_URL}/questions`, "GET"),
        ]);
        setCourses(courseRes || []);
        setExams(examRes || []);
        setQuestions(questionRes || []);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalCourses = courses.length;
  const totalExams = exams.length;
  const totalQuestions = questions.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        ⏳ Ачааллаж байна...
      </div>
    );
  }

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
          <StatCard
            icon="📚"
            label="Нийт хичээл"
            value={totalCourses}
            color="bg-blue-100"
          />
          <StatCard
            icon="📑"
            label="Нийт шалгалт"
            value={totalExams}
            color="bg-green-100"
          />
          <StatCard
            icon="❓"
            label="Асуултын сан"
            value={totalQuestions}
            color="bg-yellow-100"
          />
          <StatCard icon="🧩" label="Бусад" value="—" color="bg-purple-100" />
        </div>

        {/* Шалгалтын хуудсууд */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionBox title="📝 Шалгалтын хуудсууд">
            {courses.slice(0, 3).map((course) => (
              <Link
                key={course.id}
                to={`/team6/teacher/courses/${course.id}/exams`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-black">
                      {course.name || "Нэргүй хичээл"} - Шалгалтын жагсаалт
                    </div>
                    <div className="text-sm text-gray-600">
                      {
                        (exams.filter((e) => e.courseId === course.id) || [])
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
              </div>
            </Link>
          </SectionBox>

          {/* Вариантын хуудсууд */}
          <SectionBox title="📋 Вариантын хуудсууд">
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
          </SectionBox>
        </div>

        {/* Асуултын сан */}
        <div className="bg-gray-800 text-white py-8 px-8 rounded-lg mt-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <span className="text-3xl">🗃️</span> Асуултын сан
              </h2>
              <p className="text-purple-100 mb-4">
                {totalQuestions} асуулт бэлэн байна. Хичээл болон сэдвээр шүүх
                боломжтой.
              </p>
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

// Small stat card component
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-xl`}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-600">{label}</div>
        <div className="text-xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  </div>
);

const SectionBox = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      {title}
    </h2>
    <div className="space-y-2">{children}</div>
  </div>
);

export default TeacherHome;
