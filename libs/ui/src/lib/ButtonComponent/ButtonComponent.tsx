import { ReactNode } from "react";
import { ButtonProps } from "../../types";

function ButtonComponent (props: ButtonProps) {

  const primaryButton=`transition
  eas-in-out
  duration-150
  bg-gray-100
  text-primary
  hover:bg-gray-200
  hover:text-primary
  rounded-md w-full
  py-2.5 mt-[2vw] mb-[1vw]
  h-[30px] uppercase
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