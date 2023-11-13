import withAuth from "@/hoc/withAuth";
import styles from "./profile.module.scss";
import ProfileContentTest from "@/components/page-view/ProfileContentTest";

const ProfilePageTest = () => {
  return <ProfileContentTest />;
};

export default withAuth(ProfilePageTest);
