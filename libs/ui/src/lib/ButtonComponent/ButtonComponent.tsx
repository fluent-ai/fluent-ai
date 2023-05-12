import { ReactNode } from "react";

export interface ButtonProps {
  buttonContent?: string | JSX.Element | undefined ,
  type: "button" | "submit" | "reset" | undefined;
  ariaLabel: string;
  classes?: string;
  clickHandler?: () => void;
}
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

  const iconButton=`sidebar-icon
    h-9
    w-9 inline-flex
    items-center
    justify-center
    text-black bg-white
    rounded-full
    hover:opacity-80
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2`;

  return(
    <button
      type={props.type}
      aria-label={props.ariaLabel}
      className={props.classes === 'icon' ? iconButton : primaryButton}
      onClick={props.clickHandler}
    >
    {props.buttonContent}
  </button>
  );
}

export {ButtonComponent};