import Head from "next/head";
import React from "react";
import { Checkout, Row } from "../ui-ux";
import { Page } from "../globals";

const CheckoutContent = () => {
  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={false}>
        <Checkout />
      </Page>
    </>
  );
};

export default CheckoutContent;
