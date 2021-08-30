import React from "react";
import { RouteComponentProps } from "react-router-dom";

function Banpick(RCProps: RouteComponentProps<{ code: string }>) {
  const code = RCProps.match.params.code;
  return (
    <div>
      Banpick Component
      <br />
      {code}
    </div>
  );
}

export default Banpick;
