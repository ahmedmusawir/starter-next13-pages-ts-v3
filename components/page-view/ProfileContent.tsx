import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Page } from "../globals";
import { useAuth } from "@/contexts/AuthContext";
import { useForm, FieldValues } from "react-hook-form";
import strapiApiClient, {
  updateUserProfileImage,
  uploadImage,
} from "@/services/strapiApiClient";

const ProfileContent = () => {
  const defaultImageUrl = "#";
  const { user } = useAuth();

  // Local state for user data
  const [userData, setUserData] = useState(user);

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

      console.log("Updated User Image Data:", updatedUserDataWithImage);

      setUserData(updatedUserDataWithImage);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  const password = watchPassword("password");

  const onPasswordSubmit = (data: any) => {
    console.log("pass form data", data);
    console.log("submitted");
    // Handle password update logic here
  };

  return (
    <>
      <Head>
        <title>Next Starter Home</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={true}>
        <main className="profile-page">
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg border-2 border-gray-100">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="w-32 h-32 overflow-hidden rounded-full   -mt-16 bg-gray-200">
                        <img
                          alt="..."
                          // src="https://res.cloudinary.com/dyb0qa58h/image/upload/v1693536449/Moose_ip4al4.png"
                          src={
                            user?.profileImage?.url
                              ? `http://localhost:1337${userData?.profileImage.url}`
                              : defaultImageUrl
                          }
                          className="w-full h-full object-cover shadow-xl"
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            22
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Friends
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            10
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Photos
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            89
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-5">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 capitalize">
                      {user?.username}
                    </h3>
                    <p>{user?.email}</p>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      Los Angeles, California
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                      Solution Manager - Creative Team Officer
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      University of CyberizeGroup
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-9/12 px-4">
                            <h4 className="mb-5">Upload Profile Image:</h4>
                            <form onSubmit={handleSubmit(onImageSubmit)}>
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
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <h4>Manage Password:</h4>
                        <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
                          <div className="mb-4">
                            <input
                              type="password"
                              placeholder="New Password"
                              {...registerPassword("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 8,
                                  message:
                                    "Password should be at least 8 characters",
                                },
                              })}
                              className="input input-bordered w-full"
                            />
                            {errorsPassword.password && (
                              <p className="text-red-500">
                                {errorsPassword.password.message as string}
                              </p>
                            )}
                          </div>
                          <div className="mb-4">
                            <input
                              type="password"
                              placeholder="Confirm Password"
                              {...registerPassword("confirmPassword", {
                                required: "Please confirm password",
                                validate: (value) =>
                                  value === password ||
                                  "Passwords do not match",
                              })}
                              className="input input-bordered w-full"
                            />
                            {errorsPassword.confirmPassword && (
                              <p className="text-red-500">
                                {
                                  errorsPassword.confirmPassword
                                    .message as string
                                }
                              </p>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            // onClick={() => console.log("Button clicked")}
                          >
                            Update Password
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Page>
    </>
  );
};

export default ProfileContent;
