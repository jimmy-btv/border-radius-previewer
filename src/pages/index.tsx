import { type NextPage } from "next";

import React, { useRef, useState } from "react";
interface IBorderRadius {
  topLeftLeft: string;
  topLeftRight: string;
  topRightLeft: string;
  topRightRight: string;
  bottomLeftLeft: string;
  bottomLeftRight: string;
  bottomRightLeft: string;
  bottomRightRight: string;
}
const Home: NextPage = () => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [borderRadius, setBorderRadius] = useState<IBorderRadius>({
    topLeftLeft: "0",
    topLeftRight: "0",
    topRightLeft: "0",
    topRightRight: "0",
    bottomLeftLeft: "0",
    bottomLeftRight: "0",
    bottomRightLeft: "0",
    bottomRightRight: "0",
  });

  const onChangeRadiusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorderRadius({
      ...borderRadius,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-10 w-52 justify-between ">
        <input
          type="text"
          value={borderRadius.topLeftRight}
          className="h-7 w-7 rounded border border-black"
          name="topLeftRight"
          onChange={onChangeRadiusHandler}
        />
        <input
          type="text"
          value={borderRadius.topRightLeft}
          className="h-7 w-7 rounded border border-black"
          name="topRightLeft"
          onChange={onChangeRadiusHandler}
        />
      </div>

      <div className="flex flex-row">
        <div className="grid flex-col content-between">
          <input
            type="text"
            value={borderRadius.topLeftLeft}
            className="mr-3 h-7 w-7 rounded border border-black"
            name="topLeftLeft"
            onChange={onChangeRadiusHandler}
          />
          <input
            type="text"
            value={borderRadius.bottomLeftLeft}
            className="mr-3 h-7 w-7 rounded border border-black"
            name="bottomLeftLeft"
            onChange={onChangeRadiusHandler}
          />
        </div>
        <div
          className="h-52 w-52 border border-black bg-gradient-to-r from-[#1ac929] to-[#BCED0C]"
          style={{
            borderStartStartRadius: `${borderRadius.topLeftLeft}% ${borderRadius.topLeftRight}%`,
            borderStartEndRadius: `${borderRadius.topRightLeft}% ${borderRadius.topRightRight}%`,
            borderEndStartRadius: `${borderRadius.bottomLeftLeft}% ${borderRadius.bottomLeftRight}%`,
            borderEndEndRadius: `${borderRadius.bottomRightLeft}% ${borderRadius.bottomRightRight}%`,
          }}
        ></div>
        <div className="ml-2 grid content-between">
          <input
            type="text"
            value={borderRadius.topRightRight}
            className="h-7 w-7 rounded border border-black"
            name="topRightRight"
            onChange={onChangeRadiusHandler}
          />
          <input
            type="text"
            value={borderRadius.bottomRightRight}
            className="h-7 w-7 rounded border border-black"
            name="bottomRightRight"
            onChange={onChangeRadiusHandler}
          />
        </div>
      </div>

      <div className="mt-3 flex h-10 w-52 justify-between ">
        <input
          type="text"
          value={borderRadius.bottomLeftRight}
          className="h-7 w-7 rounded border border-black"
          name="bottomLeftRight"
          onChange={onChangeRadiusHandler}
        />
        <input
          type="text"
          value={borderRadius.bottomRightLeft}
          className="h-7 w-7 rounded border border-black"
          name="bottomRightLeft"
          onChange={onChangeRadiusHandler}
        />
      </div>
      <p>
        border-radius: {borderRadius.topLeftRight}% {borderRadius.topRightLeft}%{" "}
        {borderRadius.bottomLeftRight}% {borderRadius.bottomRightLeft}% /{" "}
        {borderRadius.topLeftLeft}% {borderRadius.topRightRight}%{" "}
        {borderRadius.bottomLeftLeft}% {borderRadius.bottomRightRight}%
      </p>
      <button
        className="m-1 border border-black bg-blue-200 p-3"
        onClick={() => {
          navigator.clipboard.writeText(
            `border-radius: ${borderRadius.topLeftRight}% ${borderRadius.topRightLeft}% ${borderRadius.bottomLeftRight}% ${borderRadius.bottomRightLeft}% / ${borderRadius.topLeftLeft}% ${borderRadius.topRightRight}% ${borderRadius.bottomLeftLeft}% ${borderRadius.bottomRightRight}%`
          );
          setCopySuccess(true);
        }}
        style={{
          borderStartStartRadius: `${borderRadius.topLeftLeft}% ${borderRadius.topLeftRight}%`,
          borderStartEndRadius: `${borderRadius.topRightLeft}% ${borderRadius.topRightRight}%`,
          borderEndStartRadius: `${borderRadius.bottomLeftLeft}% ${borderRadius.bottomLeftRight}%`,
          borderEndEndRadius: `${borderRadius.bottomRightLeft}% ${borderRadius.bottomRightRight}%`,
        }}
      >
        Copy to clipboard
      </button>
      {copySuccess && (
        <p className="absolute translate-y-52 text-green-500">
          Copied to clipboard!
        </p>
      )}
    </div>
  );
};

export default Home;
