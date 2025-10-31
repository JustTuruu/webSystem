import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mockExams, mockQuestionBank, mockTopics } from "../../data/mockData";

const CreateVariant = () => {
  const { course_id, exam_id } = useParams();
  const navigate = useNavigate();

  const exam = mockExams.find((e) => e.id === parseInt(exam_id));

  const [variantName, setVariantName] = useState("");
  const [variantDescription, setVariantDescription] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionSelectionMode, setQuestionSelectionMode] = useState("auto"); // 'auto' or 'manual'

  // Auto selection settings
  const [questionCounts, setQuestionCounts] = useState({
    multiple_choice: 3,
    multiple_correct: 1,
    fill_blank: 1,
    text_answer: 1,
  });

  // Get available questions from question bank
  const availableQuestions = exam
    ? mockQuestionBank.filter((q) =>
        exam.selectedTopics?.some((st) => st.topicId === q.topicId)
      )
    : [];

  // Handle auto selection
  const handleAutoSelect = () => {
    const selected = [];

    // Select multiple choice questions
    const multipleChoice = availableQuestions.filter(
      (q) => q.type === "multiple_choice"
    );
    const selectedMC = multipleChoice
      .sort(() => 0.5 - Math.random())
      .slice(0, questionCounts.multiple_choice);
    selected.push(...selectedMC);

    // Select multiple correct questions
    const multipleCorrect = availableQuestions.filter(
      (q) => q.type === "multiple_correct"
    );
    const selectedMCor = multipleCorrect
      .sort(() => 0.5 - Math.random())
      .slice(0, questionCounts.multiple_correct);
    selected.push(...selectedMCor);

    // Select fill blank questions
    const fillBlank = availableQuestions.filter((q) => q.type === "fill_blank");
    const selectedFB = fillBlank
      .sort(() => 0.5 - Math.random())
      .slice(0, questionCounts.fill_blank);
    selected.push(...selectedFB);

    // Select text answer questions
    const textAnswer = availableQuestions.filter(
      (q) => q.type === "text_answer"
    );
    const selectedTA = textAnswer
      .sort(() => 0.5 - Math.random())
      .slice(0, questionCounts.text_answer);
    selected.push(...selectedTA);

    setSelectedQuestions(selected.sort(() => 0.5 - Math.random()));
  };

  const toggleQuestionSelection = (question) => {
    if (selectedQuestions.find((q) => q.id === question.id)) {
      setSelectedQuestions(
        selectedQuestions.filter((q) => q.id !== question.id)
      );
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedQuestions.length === 0) {
      alert("Хамгийн багадаа 1 асуулт сонгоно уу!");
      return;
    }

    const variantData = {
      name: variantName,
      description: variantDescription,
      examId: parseInt(exam_id),
      questionIds: selectedQuestions.map((q) => q.id),
      totalQuestions: selectedQuestions.length,
      createdAt: new Date().toISOString(),
    };

    console.log("New variant:", variantData);
    alert(
      `Вариант амжилттай үүсгэлээ! ${selectedQuestions.length} асуулт сонгогдлоо.`
    );
    navigate(`/team6/teacher/exams/${exam_id}/variants`);
  };

  const getQuestionTypeLabel = (type) => {
    const labels = {
      multiple_choice: "☑️ Нэг сонголт",
      multiple_correct: "✅ Олон сонголт",
      fill_blank: "✏️ Нөхөх",
      text_answer: "📝 Бичгээр",
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
        className={`px-2 py-1 rounded-full text-xs font-medium ${badges[difficulty]}`}
      >
        {labels[difficulty]}
      </span>
    );
  };

  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Шалгалт олдсонгүй
          </h2>
          <Link
            to={`/team6/teacher/courses/${course_id}/exams`}
            className="text-black hover:underline"
          >
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants`}
            className="text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Буцах
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Хувилбар үүсгэх
          </h1>
          <p className="text-gray-600">{exam.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Variant Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Вариантын мэдээлэл
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Вариантын нэр *
                </label>
                <input
                  type="text"
                  value={variantName}
                  onChange={(e) => setVariantName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                  placeholder="Жишээ: Вариант A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Тайлбар
                </label>
                <textarea
                  value={variantDescription}
                  onChange={(e) => setVariantDescription(e.target.value)}
                  rows="2"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                  placeholder="Вариантын талаар тайлбар..."
                />
              </div>
            </div>
          </div>

          {/* Question Selection Mode */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Асуулт сонгох арга
            </h2>

            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setQuestionSelectionMode("auto")}
                className={`flex-1 px-6 py-4 rounded-lg font-medium transition-all ${
                  questionSelectionMode === "auto"
                    ? "bg-black text-white"
                    : "bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50"
                }`}
              >
                🎲 Автоматаар сонгох
              </button>
              <button
                type="button"
                onClick={() => setQuestionSelectionMode("manual")}
                className={`flex-1 px-6 py-4 rounded-lg font-medium transition-all ${
                  questionSelectionMode === "manual"
                    ? "bg-black text-white"
                    : "bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50"
                }`}
              >
                ✋ Гараар сонгох
              </button>
            </div>

            {/* Auto Selection Settings */}
            {questionSelectionMode === "auto" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Төрөл бүрээс хэдэн асуулт санамсаргүй сонгохоо тодорхойлно уу:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      ☑️ Нэг сонголттой асуулт
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={questionCounts.multiple_choice}
                      onChange={(e) =>
                        setQuestionCounts({
                          ...questionCounts,
                          multiple_choice: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Боломжит:{" "}
                      {
                        availableQuestions.filter(
                          (q) => q.type === "multiple_choice"
                        ).length
                      }
                    </p>
                  </div>

                  <div className="p-4 border-2 border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      ✅ Олон сонголттой асуулт
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={questionCounts.multiple_correct}
                      onChange={(e) =>
                        setQuestionCounts({
                          ...questionCounts,
                          multiple_correct: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Боломжит:{" "}
                      {
                        availableQuestions.filter(
                          (q) => q.type === "multiple_correct"
                        ).length
                      }
                    </p>
                  </div>

                  <div className="p-4 border-2 border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      ✏️ Нөхөх асуулт
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={questionCounts.fill_blank}
                      onChange={(e) =>
                        setQuestionCounts({
                          ...questionCounts,
                          fill_blank: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Боломжит:{" "}
                      {
                        availableQuestions.filter(
                          (q) => q.type === "fill_blank"
                        ).length
                      }
                    </p>
                  </div>

                  <div className="p-4 border-2 border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      📝 Бичгээр хариулах асуулт
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={questionCounts.text_answer}
                      onChange={(e) =>
                        setQuestionCounts({
                          ...questionCounts,
                          text_answer: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Боломжит:{" "}
                      {
                        availableQuestions.filter(
                          (q) => q.type === "text_answer"
                        ).length
                      }
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAutoSelect}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  🎲 Санамсаргүй сонгох (
                  {Object.values(questionCounts).reduce((a, b) => a + b, 0)}{" "}
                  асуулт)
                </button>
              </div>
            )}

            {/* Manual Selection */}
            {questionSelectionMode === "manual" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Асуултын банкнаас сонгох ({availableQuestions.length} асуулт
                  боломжтой):
                </p>

                <div className="max-h-96 overflow-y-auto space-y-3">
                  {availableQuestions.map((question) => {
                    const isSelected = selectedQuestions.find(
                      (q) => q.id === question.id
                    );
                    const topic = mockTopics.find(
                      (t) => t.id === question.topicId
                    );

                    return (
                      <div
                        key={question.id}
                        onClick={() => toggleQuestionSelection(question)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                isSelected
                                  ? "bg-black border-black"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <span className="text-white text-xs">✓</span>
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-gray-500">
                                #{question.id}
                              </span>
                              {getDifficultyBadge(question.difficulty)}
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                {getQuestionTypeLabel(question.type)}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                {question.marks} оноо
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 mb-2">
                              {topic?.name}
                            </div>
                            <div className="font-medium text-gray-900">
                              {question.question}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Selected Questions Summary */}
            {selectedQuestions.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-green-900">
                      Сонгогдсон асуултууд
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      Нийт: {selectedQuestions.length} асуулт, Нийт оноо:{" "}
                      {selectedQuestions.reduce((sum, q) => sum + q.marks, 0)}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-900">
                    {selectedQuestions.length}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={selectedQuestions.length === 0}
              className="flex-1 px-6 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Вариант үүсгэх
            </button>
            <Link
              to={`/team6/teacher/exams/${exam_id}/variants`}
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

export default CreateVariant;
