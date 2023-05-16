import { InnerDialogStructure } from '../../lib/InnerDialogStructure/InnerDialogStructure';
import { NodeDialogProps } from '../../types';
import { handleChange } from '../functions';
/* eslint-disable-next-line */
export interface UserFunctionDialogProps {}

function UserFunctionDialog(props: NodeDialogProps) {
  const node = props.nodes.find((nodes) => nodes.id === props.activeNodeId);

  return (
    <InnerDialogStructure
      title="User Function"
      description="user function description"
    >
      <textarea
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="Write your function here..."
        rows={10}
        cols={100}
        value={node?.props ? node.props.userFunction : ''}
        onKeyDown={(e) => e.stopPropagation()}
        onChange={(event) =>
          handleChange(
            props.nodes,
            props.setNodes,
            props.activeNodeId,
            event.target.value,
            'userFunction'
          )
        }
      />
    </InnerDialogStructure>
  );
}

export { UserFunctionDialog };
