import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../../utils/fetchData";

const BASE_URL = "https://todu.mn/bs/lms/v1";

const CreateExam = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    duration: 120,
    totalMarks: 100,
    passingMarks: 50,
  });

  // Topic selection state: { topicId: questionCount }
  const [selectedTopics, setSelectedTopics] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseRes, topicRes, questionRes] = await Promise.all([
          fetchData(`${BASE_URL}/courses/${course_id}`, "GET"),
          fetchData(`${BASE_URL}/courses/${course_id}/topics`, "GET"),
          fetchData(`${BASE_URL}/questions`, "GET"),
        ]);
        setCourse(courseRes);
        setTopics(Array.isArray(topicRes) ? topicRes : []);
        setQuestionBank(Array.isArray(questionRes) ? questionRes : []);
      } catch (error) {
        console.error("⚠️ Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [course_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTopicCountChange = (topicId, count) => {
    const numCount = parseInt(count) || 0;
    setSelectedTopics((prev) => {
      const updated = { ...prev };
      if (numCount === 0) delete updated[topicId];
      else updated[topicId] = numCount;
      return updated;
    });
  };

  const totalQuestions = Object.values(selectedTopics).reduce(
    (sum, count) => sum + count,
    0
  );

  const selectedTopicsList = Object.entries(selectedTopics).map(
    ([topicId, count]) => ({
      topicId: parseInt(topicId),
      questionCount: count,
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Шалгалтын нэр оруулна уу!");
      return;
    }
    if (totalQuestions === 0) {
      alert("Хамгийн багадаа 1 асуулт сонгоно уу!");
      return;
    }

    const examPayload = {
      ...formData,
      courseId: parseInt(course_id),
      startDateTime: `${formData.startDate}T${formData.startTime}:00Z`,
      selectedTopics: selectedTopicsList,
      totalQuestions,
      status: "upcoming",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetchData(
        `${BASE_URL}/courses/${course_id}/exams`,
        "POST",
        examPayload
      );
      console.log("✅ Exam created:", response);
      alert(
        `Шалгалт амжилттай үүсгэлээ! Нийт ${totalQuestions} асуулт сонгогдлоо.`
      );
      navigate(`/team6/teacher/courses/${course_id}/exams`);
    } catch (error) {
      console.error("❌ Failed to create exam:", error);
      alert("Шалгалт үүсгэхэд алдаа гарлаа.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        ⏳ Ачааллаж байна...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/team6/teacher/courses/${course_id}/exams`}
            className="text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Буцах
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Шинэ шалгалт үүсгэх
          </h1>
          <p className="text-gray-600">
            {course?.name || "Нэргүй хичээл"} - Банкнаас асуулт сонгох
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Үндсэн мэдээлэл
            </h2>

            <div className="space-y-4">
              <InputField
                label="Шалгалтын нэр *"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Жишээ: Дунд шалгалт"
                required
              />

              <TextAreaField
                label="Тайлбар"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Шалгалтын талаархи мэдээлэл..."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Огноо *"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Цаг *"
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  label="Үргэлжлэх хугацаа (минут) *"
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="1"
                />
                <InputField
                  label="Нийт оноо *"
                  type="number"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  required
                  min="1"
                />
                <InputField
                  label="Тэнцэх оноо *"
                  type="number"
                  name="passingMarks"
                  value={formData.passingMarks}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Question Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Асуултын банкнаас сонгох
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Сэдэв бүрээс хэдэн асуулт авахаа сонгоно уу
                </p>
              </div>
              <Link
                to="/team6/teacher/question-bank"
                target="_blank"
                className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Банк харах →
              </Link>
            </div>

            {topics.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Энэ хичээлд сэдэв байхгүй байна
              </div>
            ) : (
              <div className="space-y-4">
                {topics.map((topic) => {
                  const availableQuestions = questionBank.filter(
                    (q) => q.topicId === topic.id
                  );
                  const selectedCount = selectedTopics[topic.id] || 0;

                  return (
                    <div
                      key={topic.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedCount > 0
                          ? "border-black bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {topic.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {topic.description}
                          </p>
                          <div className="text-xs text-gray-500 mt-2">
                            Банкинд байгаа: {availableQuestions.length} асуулт
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">
                              Асуултын тоо
                            </label>
                            <input
                              type="number"
                              min="0"
                              max={availableQuestions.length}
                              value={selectedCount}
                              onChange={(e) =>
                                handleTopicCountChange(topic.id, e.target.value)
                              }
                              className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg text-center focus:border-black focus:outline-none"
                            />
                          </div>
                          {selectedCount > 0 && (
                            <div className="text-green-600 font-bold text-lg">
                              ✓
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Summary */}
            {totalQuestions > 0 && (
              <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-blue-900">
                      Нийт сонгогдсон асуулт
                    </div>
                    <div className="text-sm text-blue-700 mt-1">
                      {selectedTopicsList.length} сэдвээс {totalQuestions}{" "}
                      асуулт
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-900">
                    {totalQuestions}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Шалгалт үүсгэх
            </button>
            <Link
              to={`/team6/teacher/courses/${course_id}/exams`}
              className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-lg font-medium text-center hover:bg-gray-50 transition-colors"
            >
              Болих
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable input components
const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-900 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
    />
  </div>
);

const TextAreaField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-900 mb-2">
      {label}
    </label>
    <textarea
      {...props}
      rows="3"
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
    />
  </div>
);

export default CreateExam;
