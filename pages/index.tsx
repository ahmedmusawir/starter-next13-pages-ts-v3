import Head from "next/head";
import Layout from "@/components/globals/Layout";
import { Box, Container, Row } from "@/components/ui-ux";
import HomeContent from "@/components/page-view/HomeContent";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Next Starter Home</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      {/* <Container className={"border border-gray-500"} FULL={false}> */}
      <Container className={""} FULL={true}>
        <HomeContent />
      </Container>
    </Layout>
  );
}
