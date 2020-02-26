// Action creators
export const setStepOne = () => ({
  type: "SET_STEP_ONE"
});

export const setStepTwo = () => ({
  type: "SET_STEP_TWO"
});

export const setStepThree = () => ({
  type: "SET_STEP_THREE"
});

export const setStepOneGiftFetch = () => ({
  type: "SET_STEP_ONE_GIFT_FETCH"
});

export const setStepOneGiftFetchSuccess = giftUrl => ({
  type: "SET_STEP_ONE_GIFT_FETCH_SUCCESS",
  payload: giftUrl
});

export const setStepOneGiftFetchError = error => ({
  type: "SET_STEP_ONE_GIFT_FETCH_ERROR",
  payload: {
    error
  }
});

const GIPHY_API_KEY = "6pdVxhu3mrCt3J25aQ1QOB3Z28yV9Shy";

export const fetchStepOneGift = () => dispatch => {
  dispatch(setStepOneGiftFetch());
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&limit=1`;

  fetch(url)
    .then(result => result.json())
    .then(result => {
      dispatch(setStepOneGiftFetchSuccess(result.data.image_url));
    })
    .catch(err => dispatch(setStepOneGiftFetchError(err.message)));
};

// Initial state
const initialState = {
  step: 1,
  step_one: {
    gift: "",
    isFetching: false,
    error: null
  },
  step_two_gift: "",
  step_three_gift: ""
};

// Reducer
const userRegister = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STEP_ONE":
      return Object.assign({}, state, {
        step: 1
      });
    case "SET_STEP_ONE_GIFT_FETCH":
      return Object.assign({}, state, {
        step_one: {
          isFetching: true,
          gift: "",
          error: null
        }
      });
    case "SET_STEP_ONE_GIFT_FETCH_SUCCESS":
      return Object.assign({}, state, {
        step_one: {
          isFetching: false,
          gift: action.payload
        }
      });
    case "SET_STEP_ONE_GIFT_FETCH_ERROR":
      return Object.assign({}, state, {
        step_one: {
          isFetching: false,
          error: action.payload.error
        }
      });

    case "SET_STEP_TWO":
      return Object.assign({}, state, {
        step: 2
      });

    case "SET_STEP_THREE":
      return Object.assign({}, state, {
        step: 3
      });
    default:
      return state;
  }
};

export default userRegister;
