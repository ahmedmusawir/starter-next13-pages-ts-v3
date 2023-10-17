import { useAuth } from "@/contexts/AuthContext";
import Head from "next/head";
import { Page } from "../globals";
import UpdatePassword from "../ui-ux/UpdatePassword";
import UploadProfileImage from "../ui-ux/UploadProfileImage";
import UserProfileHeader from "../ui-ux/UserProfileHeader";

const ProfileContent = () => {
  const { user, setUser } = useAuth();

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
                  <UserProfileHeader user={user} />
                  <UploadProfileImage user={user} setUser={setUser} />
                  <UpdatePassword user={user} />
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
