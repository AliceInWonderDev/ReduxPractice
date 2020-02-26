import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setStepOne,
  setStepTwo,
  setStepThree,
  fetchStepOneGift
} from "./reducers/userRegister";

import "./App.css";

function App({
  step,
  setStepOne,
  setStepTwo,
  setStepThree,
  step_one_isFetching,
  step_one_gift,
  step_one_error,
  fetchStepOneGift
}) {
  useEffect(() => {
    fetchStepOneGift();
  }, [fetchStepOneGift]);

  return (
    <div className="App">
      {step === 1 ? (
        <div>
          <h1>step 1</h1>
          {step_one_isFetching ? (
            <div>loading..</div>
          ) : (
            <div>
              {step_one_error ? (
                <div>{step_one_error}</div>
              ) : (
                <div>{<img src={step_one_gift} alt="step one gift" />}</div>
              )}
            </div>
          )}
          <button
            onClick={e => {
              e.preventDefault();
              setStepTwo();
            }}
          >
            Ir al paso 2
          </button>
        </div>
      ) : step === 2 ? (
        <div>
          <h1>step 2</h1>
          <button
            onClick={e => {
              e.preventDefault();
              fetchStepOneGift();
              setStepOne();
            }}
          >
            Ir al paso 1
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              setStepThree();
            }}
          >
            Ir al paso 3
          </button>
        </div>
      ) : step === 3 ? (
        <div>
          <h1>step 3</h1>
          <button
            onClick={e => {
              e.preventDefault();
              setStepTwo();
            }}
          >
            Ir al paso 2
          </button>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = store => ({
  step: store.userRegister.step,
  step_one_isFetching: store.userRegister.step_one.isFetching,
  step_one_gift: store.userRegister.step_one.gift,
  step_one_error: store.userRegister.step_one.error
});

const mapDispatchToProps = dispatch => ({
  setStepOne: () => dispatch(setStepOne()),
  setStepTwo: () => dispatch(setStepTwo()),
  setStepThree: () => dispatch(setStepThree()),
  fetchStepOneGift: () => dispatch(fetchStepOneGift())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
