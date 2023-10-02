import React from "react";
import { Box, Row } from "../ui-ux";
import Head from "next/head";
import { Page } from "../globals";

const DemoContentCopyMe = () => {
  return (
    <>
      <Head>
        <title>Demo Content - copy me</title>
        <meta name="description" content="This is the DemoContentCopyMe page" />
      </Head>
      {/* <Container className={"border border-gray-500"} FULL={false}> */}
      <Page className={""} FULL={false}>
        <Row className={"prose"}>
          <h1 className="h1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit
          </h1>
          <h2 className="h2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit
          </h2>
          <h3 className="h3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit
          </h3>
          <p>
            Possimus et, ex eum rem mollitia totam eius ad, sapiente eos maiores
            voluptatum, explicabo harum quos dolores nemo eaque reprehenderit
            quo. Iure. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Possimus et, ex eum rem mollitia totam eius ad, sapiente eos maiores
            voluptatum, explicabo harum quos dolores nemo eaque reprehenderit
            quo. Iure.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Possimus et, ex eum rem mollitia totam eius ad, sapiente eos maiores
            voluptatum, explicabo harum quos dolores nemo eaque reprehenderit
            quo. Iure.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Possimus et, ex eum rem mollitia totam eius ad, sapiente eos maiores
            voluptatum, explicabo harum quos dolores nemo eaque reprehenderit
            quo. Iure.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Possimus et, ex eum rem mollitia totam eius ad, sapiente eos maiores
            voluptatum, explicabo harum quos dolores nemo eaque reprehenderit
            quo. Iure.
          </p>
        </Row>
      </Page>
    </>
  );
};

export default DemoContentCopyMe;
