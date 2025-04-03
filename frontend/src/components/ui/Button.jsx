import styles from "../../style/Button.module.css";

export default function Button({ children, onClick, type }) {
  return (
    <button
      onClick={onClick}
      className={` ${styles.btn} ${styles[type]} w-full  bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200`}
    >
      {children}
    </button>
  );
}
