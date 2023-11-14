import { useForm } from "react-hook-form";
import { User } from "@/global-interfaces";

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface ImageUploadFormData {
  profileImage: FileList;
}

const useProfileImageUpload = ({ user, setUser }: Props) => {
  const { register, handleSubmit, watch } = useForm<ImageUploadFormData>();
  const selectedFile = watch("profileImage");

  const onImageSubmit = async (data: ImageUploadFormData) => {
    const file = data.profileImage[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("files", selectedFile[0]);

    try {
      // Local fetch call to your Next.js API endpoint
      const responseImg = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!responseImg.ok) {
        throw new Error("Error uploading image");
      }

      const strapiRes = await responseImg.json();
      console.log(strapiRes);

      // Get the ID of the uploaded image
      const uploadedImageId = strapiRes[0].id;
      // console.log("Uploaded Image ID:", uploadedImageId);

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
