import { isMobile } from "react-device-detect";
import Button from "../components/ui/Button";
import HeaderForm from "../components/HeaderForm";
import Logo from "../components/ui/Logo";
import Image from "../components/ui/Image";
import Spinner from "../components/ui/Spinner";
import FooterForm from "../components/FooterForm";
import styles from "../style/LoginAndSignup.module.css";
import { useSignupAuth } from "../hooks/useSignupAuth";
import FormInput from "../components/FormInput";

const instruments = [
  "drums",
  "guitars",
  "bass",
  "saxophone",
  "keyboards",
  "vocals",
];
const roles = ["player", "admin"];

const Signup = () => {
  const {
    username,
    setUserName,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    register,
    instrument,
    setInstrument,
    role,
    setRole,
  } = useSignupAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      (role === "player" && (!username || !password || !instrument || !role)) ||
      (role === "admin" && (!username || !password || !role))
    ) {
      return;
    }

    setIsLoading(true);
    try {
      await register({
        username,
        password,
        instrument,
        role,
      });
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

        <FormInput
          id="role"
          label="Your Role"
          type="select"
          value={role}
          onChange={e => setRole(e.target.value)}
          options={roles}
        />
        {role === "player" && (
          <FormInput
            id="instrument"
            label="Your Instrument"
            type="select"
            value={instrument}
            onChange={e => setInstrument(e.target.value)}
            options={instruments}
          />
        )}

        <Button type="primary">Register</Button>
        <FooterForm text="Already have an account? " path="login" />
      </form>

      {!isMobile && <Image name="register" />}
    </main>
  );
};

export default Signup;
