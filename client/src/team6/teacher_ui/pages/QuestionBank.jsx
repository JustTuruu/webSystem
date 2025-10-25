import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses, mockTopics, mockQuestionBank } from '../../data/mockData';

const QuestionBank = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Filter topics by selected course
  const filteredTopics = selectedCourse
    ? mockTopics.filter(t => t.courseId === selectedCourse.id)
    : [];

  // Filter questions
  const filteredQuestions = mockQuestionBank.filter(q => {
    if (selectedCourse && q.courseId !== selectedCourse.id) return false;
    if (selectedTopic && q.topicId !== selectedTopic.id) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const getQuestionTypeLabel = (type) => {
    const labels = {
      multiple_choice: 'Нэг сонголт',
      multiple_correct: 'Олон сонголт',
      fill_blank: 'Нөхөх',
      text_answer: 'Бичгээр хариулах',
    };
    return labels[type] || type;
  };

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800',
    };
    const labels = {
      easy: 'Хялбар',
      medium: 'Дунд',
      hard: 'Хүнд',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[difficulty]}`}>
        {labels[difficulty]}
      </span>
    );
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Асуултын банк</h1>
          <p className="text-gray-600">Хичээлийн асуултуудыг харах, удирдах</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Шүүлтүүр</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Хичээл
              </label>
              <select
                value={selectedCourse?.id || ''}
                onChange={(e) => {
                  const course = mockCourses.find(c => c.id === parseInt(e.target.value));
                  setSelectedCourse(course);
                  setSelectedTopic(null);
                }}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
              >
                <option value="">Бүгд</option>
                {mockCourses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>

            {/* Topic Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Сэдэв
              </label>
              <select
                value={selectedTopic?.id || ''}
                onChange={(e) => {
                  const topic = filteredTopics.find(t => t.id === parseInt(e.target.value));
                  setSelectedTopic(topic);
                }}
                disabled={!selectedCourse}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none disabled:bg-gray-100"
              >
                <option value="">Бүгд</option>
                {filteredTopics.map(topic => (
                  <option key={topic.id} value={topic.id}>{topic.name}</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Хүндийн түвшин
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
              >
                <option value="all">Бүгд</option>
                <option value="easy">Хялбар</option>
                <option value="medium">Дунд</option>
                <option value="hard">Хүнд</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Нийт асуулт</div>
            <div className="text-2xl font-bold text-gray-900">{filteredQuestions.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Хялбар</div>
            <div className="text-2xl font-bold text-green-600">
              {filteredQuestions.filter(q => q.difficulty === 'easy').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Дунд</div>
            <div className="text-2xl font-bold text-yellow-600">
              {filteredQuestions.filter(q => q.difficulty === 'medium').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Хүнд</div>
            <div className="text-2xl font-bold text-red-600">
              {filteredQuestions.filter(q => q.difficulty === 'hard').length}
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Асуулт олдсонгүй</h3>
              <p className="text-gray-600">Өөр шүүлтүүр сонгоно уу</p>
            </div>
          ) : (
            filteredQuestions.map((question) => {
              const course = mockCourses.find(c => c.id === question.courseId);
              const topic = mockTopics.find(t => t.id === question.topicId);

              return (
                <div key={question.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-black text-white px-3 py-1 rounded-lg font-bold text-sm">
                          #{question.id}
                        </span>
                        {getDifficultyBadge(question.difficulty)}
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          {getQuestionTypeLabel(question.type)}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {question.marks} оноо
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">{course?.name}</span> • {topic?.name}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {question.question}
                      </h3>
                    </div>
                  </div>

                  {/* Question Options/Answers */}
                  {question.type === 'multiple_choice' && (
                    <div className="space-y-2 ml-4">
                      {question.options.map((option, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border-2 ${
                            question.correctAnswers.includes(option)
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {question.correctAnswers.includes(option) && (
                              <span className="text-green-600 font-bold">✓</span>
                            )}
                            <span className={question.correctAnswers.includes(option) ? 'font-semibold text-green-800' : 'text-gray-700'}>
                              {option}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'multiple_correct' && (
                    <div className="space-y-2 ml-4">
                      <div className="text-sm text-gray-600 mb-2 font-medium">
                        Олон зөв хариулттай (Зөв: {question.correctAnswers.length})
                      </div>
                      {question.options.map((option, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border-2 ${
                            question.correctAnswers.includes(option)
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {question.correctAnswers.includes(option) && (
                              <span className="text-green-600 font-bold">✓</span>
                            )}
                            <span className={question.correctAnswers.includes(option) ? 'font-semibold text-green-800' : 'text-gray-700'}>
                              {option}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {(question.type === 'fill_blank' || question.type === 'text_answer') && (
                    <div className="ml-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                      <div className="text-sm text-green-700 mb-1 font-medium">✓ Зөв хариулт:</div>
                      <div className="font-semibold text-green-800 mb-2">
                        {question.correctAnswers.join(', ')}
                      </div>
                      {question.acceptableAnswers && (
                        <div className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">Хүлээн зөвшөөрөгдөх:</span> {question.acceptableAnswers.join(', ')}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {question.tags && (
                    <div className="flex gap-2 mt-4 ml-4">
                      {question.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
