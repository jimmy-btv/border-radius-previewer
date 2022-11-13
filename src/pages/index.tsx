import { type NextPage } from "next";

import { MutableRefObject, useRef, useState } from "react";
interface IBorderRadius {
  [key: string]: string;
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

  const mouseStartPosition = useRef<number>(0);
  const targetName = useRef<string>("");
  const [numStart, setNumStart] = useState<number>(0);

  const [borderRadius, setBorderRadius] = useState<IBorderRadius>({
    topLeftLeft: "10",
    topLeftRight: "10",
    topRightLeft: "10",
    topRightRight: "10",
    bottomLeftLeft: "10",
    bottomLeftRight: "10",
    bottomRightLeft: "10",
    bottomRightRight: "10",
  });

  const mouseDownHandler = (e: React.MouseEvent<HTMLInputElement>): void => {
    mouseStartPosition.current = e.pageY;
    setNumStart(Number(borderRadius[(e.target as HTMLFormElement).name]));
    setNumStart(isNaN(numStart) ? 0 : numStart);
    targetName.current = (e.target as HTMLFormElement).name;
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    return;
  };

  const mouseMoveHandler = (e: any): void => {
    const diff = mouseStartPosition.current - e.pageY;

    let newLeft = numStart + diff;

    newLeft = newLeft > 100 ? 100 : newLeft;
    newLeft = newLeft < 0 ? 0 : newLeft;
    //* bugFix: e.target changes when mouse moves outside of box on chrome
    setBorderRadius({
      ...borderRadius,
      [targetName.current]: newLeft.toString(),
    });
  };

  const mouseUpHandler = (): void => {
    window.removeEventListener("mousemove", mouseMoveHandler);
    window.removeEventListener("mouseup", mouseUpHandler);
    return;
  };

  const onChangeRadiusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorderRadius({
      ...borderRadius,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#182f55]">
      <div className="mb-4 flex h-10 w-96 justify-between ">
        <input
          type="text"
          value={borderRadius.topLeftRight}
          className="z-10 h-7 w-8 cursor-ns-resize appearance-none rounded border border-black outline-none"
          name="topLeftRight"
          onChange={onChangeRadiusHandler}
          onMouseDown={mouseDownHandler}
          min={0}
          max={100}
          inputMode={"none"}
        />
        <input
          type="text"
          value={borderRadius.topRightLeft}
          className="h-7 w-8 cursor-ns-resize appearance-none rounded border border-black"
          name="topRightLeft"
          onChange={onChangeRadiusHandler}
          onMouseDown={mouseDownHandler}
          min={0}
          max={100}
        />
      </div>

      <div className="flex flex-row">
        <div className="mr-5 grid flex-col content-between">
          <input
            type="text"
            value={borderRadius.topLeftLeft}
            className="h-7 w-8 cursor-ns-resize rounded border border-black"
            name="topLeftLeft"
            onChange={onChangeRadiusHandler}
            onMouseDown={mouseDownHandler}
            min={0}
            max={100}
          />
          <input
            type="text"
            value={borderRadius.bottomLeftLeft}
            className=" h-7 w-8 cursor-ns-resize rounded border border-black"
            name="bottomLeftLeft"
            onChange={onChangeRadiusHandler}
            onMouseDown={mouseDownHandler}
            min={0}
            max={100}
          />
        </div>

        <div
          className=" h-96 w-96 "
          style={{
            borderStartStartRadius: `${borderRadius.topLeftLeft}% ${borderRadius.topLeftRight}%`,
            borderStartEndRadius: `${borderRadius.topRightLeft}% ${borderRadius.topRightRight}%`,
            borderEndStartRadius: `${borderRadius.bottomLeftLeft}% ${borderRadius.bottomLeftRight}%`,
            borderEndEndRadius: `${borderRadius.bottomRightLeft}% ${borderRadius.bottomRightRight}%`,
            background: "linear-gradient(145deg, #1a325b, #162a4d)",
            boxShadow: `inset 18px 18px 36px #0a1322,inset -18px -18px 36px #264b88`,
          }}
        ></div>
        <div className="ml-5 grid content-between">
          <input
            type="text"
            value={borderRadius.topRightRight}
            className="h-7 w-8 cursor-ns-resize rounded border border-black"
            name="topRightRight"
            onChange={onChangeRadiusHandler}
            onMouseDown={mouseDownHandler}
            min={0}
            max={100}
          />
          <input
            type="text"
            value={borderRadius.bottomRightRight}
            className="h-7 w-8 cursor-ns-resize rounded border border-black"
            name="bottomRightRight"
            onChange={onChangeRadiusHandler}
            onMouseDown={mouseDownHandler}
            min={0}
            max={100}
          />
        </div>
      </div>

      <div className="mt-5 flex h-10 w-96 justify-between ">
        <input
          type="text"
          value={borderRadius.bottomLeftRight}
          className="h-7 w-8 cursor-ns-resize rounded border border-black"
          name="bottomLeftRight"
          onChange={onChangeRadiusHandler}
          onMouseDown={mouseDownHandler}
          min={0}
          max={100}
        />
        <input
          type="text"
          value={borderRadius.bottomRightLeft}
          className="h-7 w-8 cursor-ns-resize rounded border border-black"
          name="bottomRightLeft"
          onChange={onChangeRadiusHandler}
          onMouseDown={mouseDownHandler}
          min={0}
          max={100}
        />
      </div>

      <p className="text-gray-100">
        border-radius: {borderRadius.topLeftRight}% {borderRadius.topRightLeft}%{" "}
        {borderRadius.bottomLeftRight}% {borderRadius.bottomRightLeft}% /{" "}
        {borderRadius.topLeftLeft}% {borderRadius.topRightRight}%{" "}
        {borderRadius.bottomLeftLeft}% {borderRadius.bottomRightRight}%
      </p>
      <button
        className="m-1 border border-black bg-gradient-to-r from-[#BCED0C] to-[#1ac929] p-3"
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
        <p className="bg-gradient-to-r from-[#BCED0C] to-[#1ac929] bg-clip-text text-4xl font-extrabold text-transparent">
          Copied to clipboard!
        </p>
      )}
      <p className="mt-5 text-gray-200">
        Made with 💚 by James Ball. Check out the repo{" "}
        <span>
          <a
            href="https://github.com/jimmy-btv/border-radius-previewer"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            here
          </a>
        </span>
      </p>
    </div>
  );
};

export default Home;
