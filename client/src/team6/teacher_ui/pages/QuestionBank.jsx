import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../../utils/fetchData";

const BASE_URL = "https://todu.mn/bs/lms/v1";

const QuestionBank = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedQuestionType, setSelectedQuestionType] = useState("all");

  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, crs, tpcs, qs] = await Promise.all([
          fetchData(`${BASE_URL}/categories`, "GET"),
          fetchData(`${BASE_URL}/courses`, "GET"),
          fetchData(`${BASE_URL}/topics`, "GET"),
          fetchData(`${BASE_URL}/questions`, "GET"),
        ]);
        setCategories(cats || []);
        setCourses(crs || []);
        setTopics(tpcs || []);
        setQuestions(qs || []);
      } catch (err) {
        console.error("⚠️ Failed to load question bank:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter logic
  const filteredCourses = selectedCategory
    ? courses.filter((c) => c.categoryId === selectedCategory.id)
    : courses;

  const filteredTopics = selectedCourse
    ? topics.filter((t) => t.courseId === selectedCourse.id)
    : [];

  const filteredQuestions = questions.filter((q) => {
    if (selectedCourse && q.courseId !== selectedCourse.id) return false;
    if (selectedTopic && q.topicId !== selectedTopic.id) return false;
    if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty)
      return false;
    if (selectedQuestionType !== "all" && q.type !== selectedQuestionType)
      return false;
    return true;
  });

  const getQuestionTypeLabel = (type) => {
    const labels = {
      multiple_choice: "☑️ Нэг сонголт",
      multiple_correct: "✅ Олон сонголт",
      fill_blank: "✏️ Нөхөх",
      text_answer: "📝 Бичгээр хариулах",
    };
    return labels[type] || type;
  };

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      easy: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      hard: "bg-red-100 text-red-800",
    };
    const labels = {
      easy: "Хялбар",
      medium: "Дунд",
      hard: "Хүнд",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          badges[difficulty] || "bg-gray-100 text-gray-700"
        }`}
      >
        {labels[difficulty] || "Тодорхойгүй"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-600">
        ⏳ Ачааллаж байна...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/team6/teacher"
            className="text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Dashboard руу буцах
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Асуултын банк
          </h1>
          <p className="text-gray-600">Хичээлийн асуултуудыг харах, удирдах</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            🔍 Шүүлтүүр
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Category Selection */}
            <SelectBox
              label="Ангилал"
              value={selectedCategory?.id || ""}
              onChange={(id) => {
                const category = categories.find((c) => c.id === parseInt(id));
                setSelectedCategory(category);
                setSelectedCourse(null);
                setSelectedTopic(null);
              }}
              options={categories}
              placeholder="Бүгд"
            />

            {/* Course Selection */}
            <SelectBox
              label="Хичээл"
              value={selectedCourse?.id || ""}
              onChange={(id) => {
                const course = filteredCourses.find(
                  (c) => c.id === parseInt(id)
                );
                setSelectedCourse(course);
                setSelectedTopic(null);
              }}
              options={filteredCourses}
              placeholder="Бүгд"
            />

            {/* Topic Selection */}
            <SelectBox
              label="Сэдэв"
              value={selectedTopic?.id || ""}
              onChange={(id) => {
                const topic = filteredTopics.find((t) => t.id === parseInt(id));
                setSelectedTopic(topic);
              }}
              options={filteredTopics}
              placeholder="Бүгд"
              disabled={!selectedCourse}
            />

            {/* Question Type */}
            <SelectInput
              label="Асуултын төрөл"
              value={selectedQuestionType}
              onChange={setSelectedQuestionType}
              options={[
                { value: "all", label: "Бүгд" },
                { value: "multiple_choice", label: "☑️ Нэг сонголт" },
                { value: "multiple_correct", label: "✅ Олон сонголт" },
                { value: "fill_blank", label: "✏️ Нөхөх" },
                { value: "text_answer", label: "📝 Бичгээр хариулах" },
              ]}
            />

            {/* Difficulty */}
            <SelectInput
              label="Хүндийн түвшин"
              value={selectedDifficulty}
              onChange={setSelectedDifficulty}
              options={[
                { value: "all", label: "Бүгд" },
                { value: "easy", label: "Хялбар" },
                { value: "medium", label: "Дунд" },
                { value: "hard", label: "Хүнд" },
              ]}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          <Stat
            label="Нийт асуулт"
            value={filteredQuestions.length}
            color="text-gray-900"
          />
          <Stat
            label="☑️ Нэг сонголт"
            value={
              filteredQuestions.filter((q) => q.type === "multiple_choice")
                .length
            }
            color="text-blue-600"
          />
          <Stat
            label="✅ Олон сонголт"
            value={
              filteredQuestions.filter((q) => q.type === "multiple_correct")
                .length
            }
            color="text-purple-600"
          />
          <Stat
            label="✏️ Нөхөх"
            value={
              filteredQuestions.filter((q) => q.type === "fill_blank").length
            }
            color="text-orange-600"
          />
          <Stat
            label="📝 Бичгээр"
            value={
              filteredQuestions.filter((q) => q.type === "text_answer").length
            }
            color="text-indigo-600"
          />
          <Stat
            label="Хялбар"
            value={
              filteredQuestions.filter((q) => q.difficulty === "easy").length
            }
            color="text-green-600"
          />
          <Stat
            label="Дунд/Хүнд"
            value={
              filteredQuestions.filter(
                (q) => q.difficulty === "medium" || q.difficulty === "hard"
              ).length
            }
            color="text-yellow-600"
          />
        </div>

        {/* Questions List */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">❓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Асуулт олдсонгүй
            </h3>
            <p className="text-gray-600">Өөр шүүлтүүр сонгоно уу</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                q={q}
                getDifficultyBadge={getDifficultyBadge}
                getQuestionTypeLabel={getQuestionTypeLabel}
                courses={courses}
                topics={topics}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ Small reusable components
const SelectBox = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-900 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none disabled:bg-gray-100"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

const SelectInput = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-900 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const Stat = ({ label, value, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 text-center">
    <div className="text-sm text-gray-600 mb-1">{label}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
  </div>
);

const QuestionCard = ({
  q,
  getDifficultyBadge,
  getQuestionTypeLabel,
  courses,
  topics,
}) => {
  const course = courses.find((c) => c.id === q.courseId);
  const topic = topics.find((t) => t.id === q.topicId);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-black text-white px-3 py-1 rounded-lg font-bold text-sm">
              #{q.id}
            </span>
            {getDifficultyBadge(q.difficulty)}
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
              {getQuestionTypeLabel(q.type)}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {q.marks} оноо
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-3">
            <span className="font-medium">{course?.name}</span> • {topic?.name}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {q.question}
          </h3>
          {q.image && (
            <div className="mb-4">
              <img
                src={q.image}
                alt="Question illustration"
                className="max-w-md rounded-lg border-2 border-gray-200"
              />
            </div>
          )}
        </div>
      </div>

      {/* Question Type Display */}
      {(q.type === "multiple_choice" || q.type === "multiple_correct") && (
        <div className="space-y-2 ml-4">
          {q.options?.map((opt, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border-2 ${
                q.correctAnswers?.includes(opt)
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {q.correctAnswers?.includes(opt) && (
                  <span className="text-green-600 font-bold">✓</span>
                )}
                <span
                  className={
                    q.correctAnswers?.includes(opt)
                      ? "font-semibold text-green-800"
                      : "text-gray-700"
                  }
                >
                  {opt}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {(q.type === "fill_blank" || q.type === "text_answer") && (
        <div className="ml-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
          <div className="text-sm text-green-700 mb-1 font-medium">
            ✓ Зөв хариулт:
          </div>
          <div className="font-semibold text-green-800 mb-2">
            {q.correctAnswers?.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
