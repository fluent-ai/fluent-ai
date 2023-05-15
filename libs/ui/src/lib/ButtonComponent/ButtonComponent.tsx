import { ReactNode } from "react";
import { ButtonProps } from "../../types";

function ButtonComponent (props: ButtonProps) {

  const primaryButton=`transition
  eas-in-out
  duration-150
  bg-blue-0
  text-white
  hover:bg-blue-10
  rounded-md w-[98%]
  p-1 mt-[2vw] mb-[1vw]
  h-[3vw] uppercase
  text-center`;

  return(
    <button
      type={props.type}
      aria-label={props.ariaLabel}
      className={primaryButton}
      onClick={props.clickHandler}
    >
    {props.buttonContent}
  </button>
  );
}

export {ButtonComponent};