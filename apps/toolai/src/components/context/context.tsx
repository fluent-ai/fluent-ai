import { createContext } from 'react';

interface MyContextType {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isDialogOpen: boolean,
}

const Context = createContext<MyContextType>({
  setIsDialogOpen: () => false,
  isDialogOpen: false,
})

export default Context;