import usePasswordUpdate from "@/hooks/usePasswordUpdate";

const UpdatePasswordForm = () => {
  const { register, handleSubmit, errors, password, errorMessage } =
    usePasswordUpdate();

  return (
    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-9/12 px-4">
          <h4 className="mb-5">Manage Password:</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Current Password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.currentPassword && (
                <p className="text-red-500 mt-3">
                  {errors.currentPassword.message as string}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="New Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 characters",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.password && (
                <p className="text-red-500 mt-3">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="input input-bordered w-full"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 mt-3">
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
