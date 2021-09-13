import React from "react";
import styles from "./Button.module.css";

function Button(props: {
  children?: any;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const checkDefault = <T,>(toCheck: T | undefined, defaultValue: T) => {
    if (toCheck) return toCheck;
    return defaultValue;
  };
  const children = checkDefault(props.children, "");
  const className = checkDefault(props.className, "");
  const onClick = checkDefault(props.onClick, () => {});
  return (
    <div className={`${styles.btnDiv} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;
