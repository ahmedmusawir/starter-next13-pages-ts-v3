import { ReactNode } from "react";
import { Layout } from "../globals";

interface Props {
  children: ReactNode;
  FULL: boolean;
  className?: string;
  customYMargin?: string;
}

function Page({ children, className, FULL, customYMargin }: Props) {
  return (
    <>
      {FULL && (
        <Layout>
          <section
            className={`min-h-full min-w-full ${
              customYMargin ? customYMargin : "my-10"
            } ${className}`}
          >
            {children
              ? children
              : "This is a Page container. Must have children"}
          </section>
        </Layout>
      )}
      {!FULL && (
        <Layout>
          <section
            className={`min-h-full w-11/12 xl:w-4/5 mx-auto ${
              customYMargin ? customYMargin : "my-10"
            } ${className}`}
          >
            {children
              ? children
              : "This is a Page Container. Must have children"}
          </section>
        </Layout>
      )}
      {/* LG: 1024+ IS SET TO 91% WIDTH (w-11/12) */}
      {/* XL: 1280+ IS SET TO 80% WIDTH (w-4/5) */}
    </>
  );
}

export default Page;
