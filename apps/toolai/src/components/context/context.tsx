import { createContext } from 'react';

interface MyContextType {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isDialogOpen: boolean,
  setActiveDialog: React.Dispatch<React.SetStateAction<string>>,
}

const Context = createContext<MyContextType>({
  setIsDialogOpen: () => false,
  isDialogOpen: false,
  setActiveDialog: () => null,
})

export default Context;