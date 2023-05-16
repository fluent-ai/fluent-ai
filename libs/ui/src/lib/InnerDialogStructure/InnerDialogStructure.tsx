import { ReactNode } from "react";
/* eslint-disable-next-line */
export interface InnerDialogStructureProps {
  title: string,
  description: string | ReactNode,
  children: ReactNode,
}

function InnerDialogStructure(props: InnerDialogStructureProps) {
  return (
    <div>
      <h3 className="text-center text-xl">{props.title}</h3>
      <div className="w-full my-2.5 h-[1px] bg-gray-light"></div>
      <p>{props.description}</p>
      <div className="w-full my-2.5 h-[1px] bg-gray-light"></div>
      {props.children}
    </div>
  );
}

export {InnerDialogStructure};
