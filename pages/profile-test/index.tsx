import withAuth from "@/hoc/withAuth";
import styles from "./profile.module.scss";
import ProfileContent from "@/components/page-view/ProfileContent";

const ProfilePageTest = () => {
  return <ProfileContentTest />;
};

export default withAuth(ProfilePageTest);
