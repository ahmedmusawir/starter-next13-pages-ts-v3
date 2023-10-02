import SignupContent from "@/components/page-view/SignupContent";
import styles from "./signup.module.scss";
import withoutAuth from "@/hoc/withoutAuth";

const SignupPage = () => {
  return <SignupContent />;
};

export default withoutAuth(SignupPage);
