import { User } from "@/global-interfaces";
import useProfileImageUpload from "@/hooks/useProfileImageUpload";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UploadProfileImage = ({ user, setUser }: Props) => {
  const { register, handleSubmit } = useProfileImageUpload({ user, setUser });

  return (
    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-9/12 px-4">
          <h4 className="mb-5">Upload Profile Image:</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              {...register("profileImage", {
                required: true,
              })}
            />
            <button className="btn" type="submit">
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProfileImage;
