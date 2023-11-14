import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const Router = useRouter();
    const { isAuthenticated } = useAuth();

    // If user is not authenticated, redirect to home
    if (isAuthenticated) {
      Router.push("/");
      return null;
    }

    // If user is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
