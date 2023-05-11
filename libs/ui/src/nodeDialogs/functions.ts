import { Node } from "reactflow";
function updateNode(
  nodes: Node<{ label: string; }, string | undefined>[],
  activeNodeId: string,
  eventValue:string,
  property: string){
  return nodes.map(node => {
    if(node.id === activeNodeId){
      return {
      ...node,
        props: { [property]: eventValue }
      }
    }
    return node;
  })
}

export function handleChange(
  nodes:Node<{ label: string; }, string | undefined>[],
  setNodes: any,
  activeNodeId:string,
  eventValue: string,
  property: string){
  setNodes(updateNode(nodes, activeNodeId,eventValue, property))
  console.log(nodes)
}