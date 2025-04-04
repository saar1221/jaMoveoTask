import { Toaster } from "react-hot-toast";

function ToastMessage() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={3}
      toastOptions={{
        duration: 5000,
        removeDelay: 1000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        success: {
          duration: 3000,
          iconTheme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  );
}

export default ToastMessage;
