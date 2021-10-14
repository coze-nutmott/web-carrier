import { createContext, SetStateAction } from 'react';
import {
  ITestCheckbox,
  ITestSelect,
  ITestInput,
  ITestButton,
} from '../uiTest/type';

export interface ITestPageContext {
  checkboxList: ITestCheckbox[];
  setCheckboxList: (v: SetStateAction<ITestCheckbox[]>) => void;
  selectList: Array<ITestSelect<any>>;
  setSelectList: (v: SetStateAction<Array<ITestSelect<any>>>) => void;
  inputList: Array<ITestInput<any>>;
  setInputList: (v: SetStateAction<Array<ITestInput<any>>>) => void;
  buttonList: ITestButton[];
  setButtonList: (v: SetStateAction<ITestButton[]>) => void;
}
export const TestPageContext = createContext<ITestPageContext>({} as any);
