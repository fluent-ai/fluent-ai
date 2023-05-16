import { useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowRunnerSelectors } from "@tool-ai/state";

function JsonDialog({id}:{id:string}) {
  const inputs = useSelector(flowRunnerSelectors.selectOutput(id));

  return (
    <InnerDialogStructure
    title="JSON"
    description={
    <div>
      JavaScript Object Notation is a lightweight data-interchange format.
      <br/>It is easy for humans to read and write.
      <br/>It is easy for machines to parse and generate.
      <br/>
      <br/>Its a simple and quick to store structured data.
      <br/>For example 
      <pre className="text-sm p-2">
        <code>
          {
            JSON.stringify({name: "Sally", age: 31, city: "Berlin"},null,2).split('\n').map((item, i) => <p key={i}>{item}</p>)
          }
        </code>
      </pre>
      describes a person with name, age and city in a way that both people and machines can understand.
      <br/>
      <br/><b>Usage</b>
      <br/> If the JSON Node receives a string, it tries to parse it as JSON.
      <br/> If the JSON Node receives an object, it tries to stringify it as JSON.
    </div>
    }>

      <pre className="text-sm p-2">
        <code>
          {
            JSON.stringify(inputs?.nodeOutputs || {},null,2).split('\n').map((item, i) => <p key={i}>{item}</p>)
          }
        </code>
      </pre>
      
    </InnerDialogStructure>
  );
}

export {JsonDialog};

