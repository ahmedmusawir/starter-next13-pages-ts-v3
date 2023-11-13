import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface PasswordResetForm {
  password: string;
  currentPassword: string;
  confirmPassword: string;
}

const usePasswordUpdate = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordResetForm>();
  const password = watch("password");

  const onPasswordSubmit = async (data: PasswordResetForm) => {
    try {
      const response = await fetch("/api/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData.message);
        // Maybe show a success message to the user
        setErrorMessage(null); // Clear any previous error messages
        toast.success("Password update successful! Please login.");
      } else {
        console.error("Error updating password:", responseData.error);
        // Display the error message to the user
        setErrorMessage(responseData.error);
        toast.error("Error during signup. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle other unexpected errors
      setErrorMessage("An unexpected error occurred.");
      toast.error("Error during signup. Please try again.");
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onPasswordSubmit),
    errors,
    password,
    errorMessage,
  };
};

export default usePasswordUpdate;
