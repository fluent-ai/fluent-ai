import { ReactNode } from "react";
import React from 'react';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
/* eslint-disable-next-line */
export interface InnerDialogStructureProps {
  title: string,
  description: string | ReactNode,
  children: ReactNode,
}



function InnerDialogStructure(props: InnerDialogStructureProps) {
  return (
    <div className="relative h-[80vh]">
      <h3 className="text-center text-xl">{props.title}</h3>
      <div className="w-full my-2.5 h-[1px] bg-gray-light"></div>
      <div className="h-[80%] w-full overflow-y-scroll">
      <Accordion.Root
        className="bg-white w-full rounded-md shadow-[0_2px_10px] shadow-black/5"
        type="single"
        //defaultValue="item-1"
        collapsible
      >
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Description</Accordion.Trigger>
          <Accordion.Content className="relative h-[30%] min-h-[200px] overflow-y-scroll">
            <div className="overflow-y-scroll h-[50%]">
              {props.description}
          </div></Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

      <div className="w-full my-2.5 h-[1px] bg-gray-light"></div>
      {props.children}
      </div>
    </div>
  );
}

export {InnerDialogStructure};
