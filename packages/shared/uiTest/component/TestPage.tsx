import { SharedCheckBox } from '../../component/SharedCheckBox';
import { SharedTextButton } from '../../component/SharedTextButton';
import React, { ReactNode, useMemo, useState } from 'react';
import { TestPageContext } from '../../uiTest/context';
import {
  ITestCheckbox,
  ITestSelect,
  ITestInput,
  ITestButton,
} from '../../uiTest/type';
import styles from './TestPage.module.scss';
import { SharedText } from '../../component/SharedText';
import { UI_TEST_PARAMS } from '../../component/SharedContainer';

interface IProps {
  children: ReactNode;
  goToList: () => void;
}

export default function TestPage({ children, goToList }: IProps) {
  const [checkboxList, setCheckboxList] = useState<ITestCheckbox[]>([]);
  const [selectList, setSelectList] = useState<Array<ITestSelect<any>>>([]);
  const [inputList, setInputList] = useState<Array<ITestInput<any>>>([]);
  const [buttonList, setButtonList] = useState<ITestButton[]>([]);
  const contextValue = useMemo(
    () => ({
      checkboxList,
      setCheckboxList,
      selectList,
      setSelectList,
      inputList,
      setInputList,
      buttonList,
      setButtonList,
    }),
    [checkboxList, selectList, inputList, buttonList],
  );
  const isShowInputContainer =
    !!checkboxList.length ||
    !!selectList.length ||
    !!inputList.length ||
    !!buttonList.length;
  return (
    <div className={styles.testPage}>
      <SharedTextButton
        variant={UI_TEST_PARAMS.buttonVariant}
        textVariant={UI_TEST_PARAMS.buttonTextVariant}
        width="100px"
        height="30px"
        onClick={goToList}
        className="mt-20"
      >
        목록으로
      </SharedTextButton>
      {isShowInputContainer && (
        <div
          className={cn(styles.inputsWrapper, 'my-10', 'px-10', 'pb-10')}
          style={{ zIndex: UI_TEST_PARAMS.inputZIndex }}
        >
          {checkboxList.map((item, index) => (
            <SharedCheckBox
              key={index}
              text={item.label}
              textVariant={UI_TEST_PARAMS.checkBoxTextVariant}
              checked={item.isTrue}
              className="mt-10"
              textClassName="mt-2"
              id={item.label}
              onChange={() =>
                setCheckboxList(
                  checkboxList.map((item2, index2) =>
                    index === index2
                      ? { ...item2, isTrue: !item.isTrue }
                      : item2,
                  ),
                )
              }
            />
          ))}
          {selectList.map((item, index) => (
            <div key={index} className={cn('mt-20')}>
              {item.label && (
                <SharedText
                  variant={UI_TEST_PARAMS.labelTextVariant}
                >{`${item.label} : `}</SharedText>
              )}
              <div className={styles.selectWrapper}>
                {item.options.map(option => (
                  <SharedTextButton
                    key={option.key}
                    className="mr-10"
                    variant={
                      option.key === item.selectedKey
                        ? UI_TEST_PARAMS.activeButtonVariant
                        : UI_TEST_PARAMS.buttonVariant
                    }
                    textVariant={UI_TEST_PARAMS.buttonTextVariant}
                    onClick={() => {
                      setSelectList(
                        selectList.map((item2, index2) =>
                          index === index2
                            ? { ...item2, selectedKey: option.key }
                            : item2,
                        ),
                      );
                    }}
                  >
                    {option.text}
                  </SharedTextButton>
                ))}
              </div>
            </div>
          ))}
          {inputList.map((item, index) => (
            <div key={index} className={cn(styles.inputWrapper, 'mt-10')}>
              <div className={cn(styles.label)}>
                <SharedText variant={UI_TEST_PARAMS.labelTextVariant}>
                  <label htmlFor={item.label}>{item.label}</label>
                </SharedText>
              </div>
              <input
                id={item.label}
                type={item.type}
                value={item.value}
                disabled={item.disabled}
                style={item.disabled ? { opacity: 0.5 } : undefined}
                onChange={e => {
                  const inputValue = e.currentTarget.value;
                  setInputList(
                    inputList.map((item2, index2) =>
                      index === index2
                        ? {
                            ...item2,
                            value:
                              inputValue && item2.type === 'number'
                                ? Number(inputValue)
                                : inputValue,
                          }
                        : item2,
                    ),
                  );
                }}
              />
            </div>
          ))}
          {buttonList.map(({ text, ...rest }, index) => (
            <div key={index} className="mt-10">
              <SharedTextButton
                {...rest}
                variant={UI_TEST_PARAMS.buttonVariant}
                textVariant={UI_TEST_PARAMS.buttonTextVariant}
                height="30px"
              >
                {text}
              </SharedTextButton>
            </div>
          ))}
        </div>
      )}
      <TestPageContext.Provider value={contextValue}>
        {children}
      </TestPageContext.Provider>
    </div>
  );
}
