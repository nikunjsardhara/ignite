import React from "react";
import CustomLoaderStyled from "../common/CustomLoaderStyledInfinite";

function Loading() {
  return (
    <div className="w-full flex flex-row justify-center items-center text-white ">
      <CustomLoaderStyled>
        <div className="spinner"></div>
      </CustomLoaderStyled>
    </div>
  );
}

export default Loading;
