import { ButtonProps } from "../../types";
/* eslint-disable-next-line */
export interface IconButtonComponentProps {}

function IconButtonComponent(props: ButtonProps) {

  const iconButton=`sidebar-icon
    h-9
    w-9 inline-flex
    items-center
    justify-center
    text-black bg-white
    rounded-md
    focus:outline-none
    `;

  return(
    <button
      type={props.type}
      aria-label={props.ariaLabel}
      className={`${iconButton} ${props.classes}`}
      onClick={props.clickHandler}
      style={props.style}
    >
    {props.buttonContent}
  </button>
  );
}

export {IconButtonComponent};
