import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { isMobile } from "react-device-detect";
import Image from "../components/ui/Image";
import Button from "../components/ui/Button";
import HeaderForm from "../components/HeaderForm";
import Spinner from "../components/ui/Spinner";
import Logo from "../components/ui/Logo";
import FooterForm from "../components/FooterForm";
import { useAuth } from "../contexts/AuthContext";
import styles from "./LoginAndSignup.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token, user, login, isAuthenticated } = useAuth();

  useEffect(
    function () {
      console.log(user, "user");
      if (isAuthenticated) {
        navigate(user.role === "admin" ? "/main/admin" : "/main/player");
      }
    },
    [(isAuthenticated, navigate, token)]
  );

  const handleSubmit = async e => {
    e.preventDefault();
    if (!username && !password) return;
    setIsLoading(true);

    try {
      await login({ username, password });
      localStorage.setItem("token", token);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      {isLoading && <Spinner fullScreen={true} />}
      <Logo />
      <form className={styles.form} onSubmit={handleSubmit}>
        <HeaderForm>Log in</HeaderForm>

        <div className={styles.row}>
          <label
            htmlFor="username"
            className="block text-sm  font-medium text-gray-700 mb-1"
          >
            Enter Yor User Name*
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            onChange={e => setUserName(e.target.value)}
            value={username}
          />
        </div>

        <div className={styles.row}>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter Yor Password*
          </label>

          <input
            id="password"
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Enter your password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
        <FooterForm text=" Don’t have an account?" path="signup" />
      </form>

      {!isMobile && <Image name="register" />}
    </main>
  );
}
