import { useEffect } from "react";
import { useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-500">
        404 - Page Not Found 😢
      </h1>
      <p className="text-gray-600 mt-2">Redirecting you to the login page...</p>
      <div className="mt-5">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-500 text-black rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
