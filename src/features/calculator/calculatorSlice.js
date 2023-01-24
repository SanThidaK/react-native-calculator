import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CalculatorState {
  num1: any,
  num2: any,
  result: any,
  mResult: any,
  mTotal: any
}

const initialState: CalculatorState = {
  num1: '',
  num2: '',
  result: null,
  mResult: null,
  mTotal: null
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setNum1: (state, action: PayloadAction<String>) => {
      state.num1 = action.payload.result !== null ? action.payload.result : state.num1.concat('', action.payload.num1);
    },
    setNum2: (state, action: PayloadAction<String>) => {
      state.num2 = action.payload.result !== null ? action.payload.result : state.num2.concat('', action.payload.num2);
    },
    add: (state, action: PayloadAction<String>) => {
      state.result = parseInt(state.num1) + parseInt(state.num2);
    },
    sub: (state, action: PayloadAction<String>) => {
      state.result = parseInt(state.num1) - parseInt(state.num2);
    },
    multiply: (state, action: PayloadAction<String>) => {
      state.result = parseInt(state.num1) * parseInt(state.num2);
    },
    division: (state, action: PayloadAction<String>) => {
      state.result = parseInt(state.num1) / parseInt(state.num2);
    },
    square: () => {
      state.result = Math.pow(parseInt(state.num1));
    },
    squareRoot: () => {
      state.result = Math.sqrt(parseInt(state.num1));
    },
    clearAll: (state) => {
      state.num1 = '';
      state.num2 = '';
      state.result = null
    },
    mStore: (state, action: PayloadAction<Number>) => {
      state.mResult = action.payload
      state.mTotal = action.payload
    },
    mClear: (state) => {
      state.mResult = null
      state.mTotal = null
    },
    mPlus: (state, action: PayloadAction<Number>) => {
      state.mResult = action.payload
      state.mTotal += state.mResult
    },
    mSub: (state, action: PayloadAction<Number>) => {
      state.mTotal -= state.mResult
      state.mResult = 0
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setNum1, setNum2,
  add, sub,
  multiply, division,
  square, squareRoot,
  mStore, mClear, mPlus, mSub,
  clearAll
} = calculatorSlice.actions

export default calculatorSlice.reducer