import { Node } from 'reactflow';
function updateNode(
  nodes: Node<{ label: string }, string | undefined>[],
  activeNodeId: string,
  eventValue: string,
  property: string
) {
  return nodes.map((node) => {
    if (node.id === activeNodeId) {
      return {
        ...node,
        props: { [property]: eventValue },
      };
    }
    return node;
  });
}

export async function handleChange(
  nodes: Node<{ label: string }, string | undefined>[],
  setNodes:
    | React.Dispatch<React.SetStateAction<Node<string | undefined>[]>>
    | any,
  activeNodeId: string,
  eventValue: string,
  property: string
) {
  await setNodes(updateNode(nodes, activeNodeId, eventValue, property));
}
