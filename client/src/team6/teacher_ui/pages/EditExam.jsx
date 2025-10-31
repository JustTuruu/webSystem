import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mockExams } from "../../data/mockData";

const EditExam = () => {
  const { course_id, exam_id } = useParams();
  const navigate = useNavigate();

  const exam = mockExams.find((e) => e.id === parseInt(exam_id));

  const [formData, setFormData] = useState({
    title: exam?.title || "",
    description: exam?.description || "",
    examDate: exam?.examDate || "",
    duration: exam?.duration || "",
    totalMarks: exam?.totalMarks || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated exam:", formData);
    alert("Шалгалтын мэдээлэл амжилттай шинэчлэгдлээ!");
    navigate(`/team6/teacher/courses/${course_id}/exams/${exam_id}`);
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
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            to={`/team6/teacher/courses/${course_id}/exams/${exam_id}`}
            className="text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Буцах
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Шалгалт засах</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Шалгалтын нэр *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                placeholder="Жишээ: Дунд шалгалт"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Тайлбар
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                placeholder="Шалгалтын талаархи мэдээлэл..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Огноо *
                </label>
                <input
                  type="datetime-local"
                  name="examDate"
                  value={formData.examDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Үргэлжлэх хугацаа (минут) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                  placeholder="60"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Нийт оноо *
              </label>
              <input
                type="number"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                placeholder="100"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Хадгалах
              </button>
              <Link
                to={`/team6/teacher/courses/${course_id}/exams/${exam_id}`}
                className="flex-1 px-6 py-3 bg-white border-2 border-gray-200 text-gray-900 rounded-lg font-medium text-center hover:bg-gray-50 transition-colors"
              >
                Болих
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExam;
