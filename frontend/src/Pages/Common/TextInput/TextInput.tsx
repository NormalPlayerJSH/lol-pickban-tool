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
  isEditable?: boolean;
  doTrim?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}): [ReactElement, string, React.Dispatch<React.SetStateAction<string>>] {
  const checkDefault = <T,>(toCheck: T | undefined, defaultValue: T) => {
    if (toCheck || typeof toCheck === "boolean") return toCheck;
    return defaultValue;
  };
  const setting = checkDefault(_setting, {});
  const initialValue = checkDefault(setting.initialValue, "");
  const [TextValue, setTextValue] = useState(initialValue);
  const innerText = checkDefault(setting.innerText, "");
  const className = checkDefault(setting.className, "");
  const isEditable = checkDefault(setting.isEditable, true);
  const paramOnChange = checkDefault(setting.onChange, () => {});
  const paramOnEnter = checkDefault(setting.onEnter, () => {});
  const paramOnBlur = checkDefault(setting.onBlur, () => {});
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isEditable) setTextValue(event.target.value);
    paramOnChange(event);
  };
  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      paramOnEnter(event);
    }
  };
  return [
    <div className={`${className} ${styles.inputDiv}`}>
      <input
        type="text"
        className={`${styles.inputElem}`}
        value={TextValue}
        onChange={onChange}
        onKeyPress={onEnter}
        onBlur={paramOnBlur}
      />
      <div className={styles.inputLabelDiv}>{innerText}</div>
    </div>,
    TextValue,
    setTextValue,
  ];
}

export default useTextInput;
