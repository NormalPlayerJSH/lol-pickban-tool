import React, {
  ChangeEvent,
  ReactElement,
  useState,
  KeyboardEvent,
} from "react";
import styles from "./TextInput.module.css";

function useTextInput(_setting?: {
  initialValue?: string;
  innerText?: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
}): [ReactElement, string] {
  const checkDefault = <T,>(toCheck: T | undefined, defaultValue: T) => {
    if (toCheck) return toCheck;
    return defaultValue;
  };
  const setting = checkDefault(_setting, {});
  const initialValue = checkDefault(setting.initialValue, "");
  const [TextValue, setTextValue] = useState(initialValue);
  const innerText = checkDefault(setting.innerText, "");
  const className = checkDefault(setting.className, "");
  const paramOnChange = checkDefault(setting.onChange, () => {});
  const paramOnEnter = checkDefault(setting.onEnter, () => {});
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
    paramOnChange(event);
  };
  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      paramOnEnter(event);
    }
  };
  return [
    <input
      type="text"
      placeholder={innerText}
      className={`${className} ${styles.inputElem}`}
      value={TextValue}
      onChange={onChange}
      onKeyPress={onEnter}
    />,
    TextValue,
  ];
}

export default useTextInput;
