import { Link } from 'react-router-dom';

const LoginSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Шалгалтын систем
          </h1>
          {/* <p className="text-gray-600 text-lg">
            Баг-6 Шалгалтын хэсэг
          </p> */}
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Teacher Card */}
          <Link
            to="/team6/teacher"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-black"
          >
            <div className="p-8 text-center">
              <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                👨‍🏫
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Багш</h2>
              <div className="px-6 py-3 bg-black text-white rounded-lg font-medium group-hover:bg-gray-800 transition-colors inline-block">
                Багшаар нэвтрэх →
              </div>
            </div>
          </Link>

          {/* Student Card */}
          <Link
            to="/team6/student"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-black"
          >
            <div className="p-8 text-center">
              <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                👨‍🎓
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Сурагч</h2>
              <div className="px-6 py-3 bg-black text-white rounded-lg font-medium group-hover:bg-gray-800 transition-colors inline-block">
                Сурагчаар нэвтрэх →
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          {/* <p>© 2025 Team 6 Exam System. All rights reserved.</p> */}
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
