import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../lib/AccordionComponent/AccordionComponent';
import React, { ReactNode }from 'react';
export interface InnerDialogStructureProps {
  title: string,
  description?: string | ReactNode,
  children: ReactNode,
}

function InnerDialogStructure(props: InnerDialogStructureProps) {

  const childrenArray = React.Children.toArray(props.children);
  const childrenTitles = childrenArray.map((child, index) => {
    if(React.isValidElement(child)){
      return child.props.title;
    } else {
      return child;
    }
  });


  return (
    <div className="relative h-[80vh]">
      <style>
        {`.scroll-container::-webkit-scrollbar { display: none; }`}
      </style>
      <h3 className="text-center text-xl">{props.title}</h3>
      <div className="scroll-container h-[80%] w-full overflow-y-scroll">
        <div className="w-full my-2.5 h-[1px] bg-gray-light"></div>
        <Accordion type="single" collapsible className="w-full" defaultValue='child-0'>
        {childrenArray.map((child, index) => {
          return (
          <AccordionItem  value={`child-${index}`}>
            <AccordionTrigger>{childrenTitles[index]}</AccordionTrigger>
            <AccordionContent>
              {child}
            </AccordionContent>
          </AccordionItem>
          )
        })}
        </Accordion>
      </div>
    </div>
  );
}

export {InnerDialogStructure};
