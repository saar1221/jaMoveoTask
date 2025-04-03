import { useState } from "react";
import { useNavigate } from "react-router";
import { isMobile } from "react-device-detect";

import Button from "../components/ui/Button";
// import { useAuth } from "../contexts/FakeAuthContext";
import HeaderForm from "../components/HeaderForm";
import Logo from "../components/ui/Logo";
import Image from "../components/ui/Image";
import Spinner from "../components/ui/Spinner";
import styles from "./LoginAndSignup.module.css";
import FooterForm from "../components/FooterForm";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const instruments = [
    "drums",
    "guitars",
    "bass",
    "saxophone",
    "keyboards",
    "vocals",
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    if (!username || !password || !instrument) return;
    setIsLoading(true);

    try {
      const loginSuccess = await register({ username, password, instrument });
      if (loginSuccess) navigate("/main/player");
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      {isLoading && <Spinner fullScreen={true} />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <HeaderForm>Register</HeaderForm>
        <Logo />
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

        <div className={styles.row}>
          <label
            htmlFor="instrument"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your instrument*
          </label>
          <select
            id="instrument"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            value={instrument}
            onChange={e => setInstrument(e.target.value)}
          >
            <option value="" disabled>
              Select an option
            </option>
            {instruments.map(instrument => (
              <option key={instrument} value={instrument}>
                {instrument}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Button type="primary">Register</Button>
        </div>

        <FooterForm text="Already have an account? " path="login" />
      </form>
      {!isMobile && <Image name="register" />}
    </main>
  );
}
