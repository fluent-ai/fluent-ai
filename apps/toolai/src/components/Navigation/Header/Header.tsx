import { PersonIcon } from '@radix-ui/react-icons';

const Header = (): JSX.Element => {
  return(
    <div className='h-10 w-60 mt-2.5 ml-2.5 bg-white absolute border-2 border-inherit rounded-md z-10 text-black flex justify-between items-center'>
      <p>Tool AI</p>
      <div className='sidebar-icon'>
        <PersonIcon />
      </div>
    </div>
  )
}

export default Header;