
export interface ButtonProps {
  buttonContent?: string,
  type: "button" | "submit" | "reset" | undefined;
  ariaLabel: string;
  classes?: string;
  clickHandler?: () => void;
}
function ButtonComponent (props: ButtonProps) {

  return(
    <button
      type={props.type}
      aria-label={props.ariaLabel}
      className={`${props.classes} transition eas-in-out duration-150 bg-blue-0 text-white hover:bg-blue-10 rounded-md w-[98%] p-1 mt-[2vw] mb-[1vw] h-[3vw] uppercase text-center`}
      onClick={props.clickHandler}
    >
    {props.buttonContent}
  </button>
  );
}

export {ButtonComponent};