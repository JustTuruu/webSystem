import { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  {
    email: "admin@must.edu.mn",
    password: "123",
    role: "admin",
    name: "Админ А А",
    description: "Системийн админ",
  },
  {
    email: "user@must.edu.mn",
    password: "123",
    role: "user",
    name: "Хэрэглэгч Х Х",
    description: "Системийн хэрэглэгч",
  },
  {
    email: "schooladmin@must.edu.mn",
    password: "123",
    role: "schooladmin",
    name: "Админ С С",
    description: "Сургуулийн админ",
  },
  {
    email: "schoolteacher@must.edu.mn",
    password: "123",
    role: "teacher",
    name: "Багш С С",
    description: "Сургуулийн багш",
  },
  {
    email: "schoolstudent@must.edu.mn",
    password: "123",
    role: "student",
    name: "Оюутан С С",
    description: "Сургуулийн оюутан",
  },
];

const LoginSelection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      setError("Имэйл эсвэл нууц үг буруу байна!");
      return;
    }

    // Store session statically
    sessionStorage.setItem("loggedUser", JSON.stringify(user));

    // Redirect by role
    switch (user.role) {
      case "admin":
        navigate("/team6/admin");
        break;
      case "user":
        navigate("/team6/user");
        break;
      case "schooladmin":
        navigate("/team6/school-admin");
        break;
      case "teacher":
        navigate("/team6/teacher");
        break;
      case "student":
        navigate("/team6/student");
        break;
      default:
        navigate("/team6");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Цахим шалгалтын систем
          </h1>
          <p className="text-gray-600 text-sm">
            Бие даалт 2 — Frontend хэсгийн статик систем
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Имэйл хаяг
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:border-black outline-none"
              placeholder="name@must.edu.mn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Нууц үг
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-3 focus:border-black outline-none"
              placeholder="•••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Нэвтрэх
          </button>
        </form>

        {/* Static Demo Accounts */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
          <h3 className="font-bold text-gray-900 mb-2">💡 Тест хэрэглэгчид:</h3>
          <ul className="space-y-1">
            {users.map((u) => (
              <li key={u.email}>
                <span className="font-semibold">{u.role}</span> — {u.email} /{" "}
                <span className="italic text-gray-600">{u.password}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
