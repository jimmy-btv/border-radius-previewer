import { type NextPage } from "next";

import { useRef, useState } from "react";
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

// ? ------------------ *
// ! This could all be split into multiple components but I wanted to keep it simple as it's a single page app
// ? ------------------ *

const Home: NextPage = () => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [numStart, setNumStart] = useState<number>(0);
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({
    width: 384,
    height: 384,
  });

  const mouseStartPosition = useRef<number>(0);
  const targetName = useRef<string>("");

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
    <div className="flex flex-col items-center justify-center bg-[#182f55]">
      <div className="my-4 flex h-10 w-96 justify-between">
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
        {/* // ! below div could be put into it's own component */}
        <div
          style={{
            borderStartStartRadius: ` ${borderRadius.topLeftRight}% ${borderRadius.topLeftLeft}%`,
            borderStartEndRadius: `${borderRadius.topRightLeft}% ${borderRadius.topRightRight}%`,
            borderEndStartRadius: `${borderRadius.bottomLeftRight}% ${borderRadius.bottomLeftLeft}% `,
            borderEndEndRadius: `${borderRadius.bottomRightLeft}% ${borderRadius.bottomRightRight}%`,
            background: "linear-gradient(145deg, #1c3661, #172d52)",
            boxShadow: `12px 12px 23px #0a1424, -12px -12px 23px #2a5092`,
            height: `${boxSize.height}px`,
            width: `${boxSize.width}px`,
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
      <div className="w-70 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <label htmlFor="height" className="pr-2 text-gray-200">
            Box height:
          </label>
          <input
            type="number"
            name="height"
            className="w-12"
            value={boxSize.height}
            onChange={(e) =>
              setBoxSize({
                ...boxSize,
                height: +e.target.value > 440 ? 440 : +e.target.value,
              })
            }
          />
        </div>

        <div className="mt-2 flex flex-row items-center justify-between">
          <label htmlFor="width" className="pr-2 text-gray-200">
            Box width:
          </label>
          <input
            type="number"
            name="width"
            className="w-12"
            value={boxSize.width}
            onChange={(e) =>
              setBoxSize({
                ...boxSize,
                width: +e.target.value > 440 ? 440 : +e.target.value,
              })
            }
          />
        </div>
      </div>

      <p className="m-1 text-gray-100">
        border-radius: {borderRadius.topLeftRight}% {borderRadius.topRightLeft}%{" "}
        {borderRadius.bottomLeftRight}% {borderRadius.bottomRightLeft}% /{" "}
        {borderRadius.topLeftLeft}% {borderRadius.topRightRight}%{" "}
        {borderRadius.bottomLeftLeft}% {borderRadius.bottomRightRight}%
      </p>
      <div className="flex flex-row items-center">
        <button
          className="m-1 border border-black bg-gradient-to-r from-[#BCED0C] to-[#1ac929] p-3"
          onClick={() => {
            navigator.clipboard.writeText(
              `border-radius: ${borderRadius.topLeftRight}% ${borderRadius.topRightLeft}% ${borderRadius.bottomLeftRight}% ${borderRadius.bottomRightLeft}% / ${borderRadius.topLeftLeft}% ${borderRadius.topRightRight}% ${borderRadius.bottomLeftLeft}% ${borderRadius.bottomRightRight}%`
            );
            setCopySuccess(true);
          }}
          style={{
            borderStartStartRadius: `${borderRadius.topLeftRight}% ${borderRadius.topLeftLeft}% `,
            borderStartEndRadius: `${borderRadius.topRightLeft}% ${borderRadius.topRightRight}%`,
            borderEndStartRadius: `${borderRadius.bottomLeftRight}% ${borderRadius.bottomLeftLeft}% `,
            borderEndEndRadius: `${borderRadius.bottomRightLeft}% ${borderRadius.bottomRightRight}%`,
          }}
        >
          Copy to clipboard
        </button>
        {copySuccess && <p className="text-4xl font-extrabold ">✅</p>}
      </div>
      <p className="my-5 text-gray-200">
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
