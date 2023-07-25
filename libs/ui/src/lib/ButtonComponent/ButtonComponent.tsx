import { IButtonProps } from "../../types";

function ButtonComponent (props: IButtonProps) {

  const primaryButton=`transition
  eas-in-out
  duration-150
  bg-gray-100
  text-primary
  hover:bg-gray-200
  hover:text-primary
  rounded-md w-full
  py-2.5 mt-[2vw] mb-[1vw]
  h-[20px] 
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