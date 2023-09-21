import { createContext } from 'react';

interface ContextType {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpen: boolean;
  setActiveDialog: React.Dispatch<React.SetStateAction<string>>;
  setActiveNodeId: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<ContextType>({
  setIsDialogOpen: () => false,
  isDialogOpen: false,
  setActiveDialog: () => '',
  setActiveNodeId: () => '',
});

export default Context;
