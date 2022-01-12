import { useState, useRef } from "react";
import Head from "next/head";

import styles from "../styles/styles.module.scss";
import FormCard from "../components/FormCard";
import {
  BillingInfo,
  ConfirmPurchase,
  PersonalInfo,
} from "../components/Forms";
import FormCompleted from "../components/FormCompleted";
import { Router } from "next/router";

const App = ({pageStep}) => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => `/?step=${currentStep - 1}`);

  return (
    <div className={styles.container}>
      <Head>
        <title>Unform Multi Step Form</title>
      </Head>
      <h1>Unform Multi Step Form</h1>

      <FormCard currentStep={pageStep} prevFormStep={prevFormStep}>
        {pageStep >= 0 && (
          <PersonalInfo formStep={pageStep} nextFormStep={nextFormStep} />
        )}
        {pageStep >= 1 && (
          <BillingInfo formStep={pageStep} nextFormStep={nextFormStep} />
        )}
        {pageStep >= 2 && (
          <ConfirmPurchase formStep={pageStep} nextFormStep={nextFormStep} />
        )}

        {formStep > 2 && <FormCompleted />}
      </FormCard>
    </div>
  );
};

export default App;

export async function getServerSideProps(context) {
  return {
    props: {
      pageStep: context.query.step ? parseInt(context.query.step) : 0
    }
  }
}