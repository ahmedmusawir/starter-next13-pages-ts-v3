import { useForm } from "react-hook-form";
import { uploadImage } from "@/services/strapiApiClient";
import { User } from "@/global-interfaces";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const useProfileImageUpload = ({ user, setUser }: Props) => {
  const { register, handleSubmit, watch } = useForm();
  const selectedFile = watch("profileImage");

  const onImageSubmit = async (data: any) => {
    const file = data.profileImage[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("files", selectedFile[0]);

    try {
      const strapiRes = await uploadImage(formData);
      console.log(strapiRes.data);

      // Get the ID of the uploaded image
      const uploadedImageId = strapiRes.data[0].id;

      if (!user) return;

      // Update the user's profile with the new image ID
      const response = await fetch("/api/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          imageId: uploadedImageId,
        }),
      });

      // After successfully updating the user's profile image, fetch the updated user data
      const updatedUserDataResponse = await fetch(`/api/current-user`);
      const updatedUserDataWithImage = await updatedUserDataResponse.json();

      // console.log("Updated User Image Data:", updatedUserDataWithImage);

      setUser(updatedUserDataWithImage);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onImageSubmit),
  };
};

export default useProfileImageUpload;
