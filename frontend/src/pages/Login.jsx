import { isMobile } from "react-device-detect";
import Image from "../components/ui/Image";
import Button from "../components/ui/Button";
import HeaderForm from "../components/HeaderForm";
import Spinner from "../components/ui/Spinner";
import Logo from "../components/ui/Logo";
import FooterForm from "../components/FooterForm";
import styles from "../style/LoginAndSignup.module.css";
import { useLoginAuth } from "../hooks/useLoginAuth";
import FormInput from "../components/FormInput";

const Login = () => {
  const {
    username,
    setUserName,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    login,
  } = useLoginAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!username || !password) return;
    setIsLoading(true);

    try {
      await login({ username, password });
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

        <FormInput
          id="username"
          label="Enter Your Username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUserName(e.target.value)}
        />

        <FormInput
          id="password"
          label="Enter Your Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button type="primary">Login</Button>
        <FooterForm text="Don’t have an account?" path="signup" />
      </form>

      {!isMobile && <Image name="register" />}
    </main>
  );
};

export default Login;
