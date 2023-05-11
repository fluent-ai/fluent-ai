import { AvatarComponent, User } from '@tool-ai/ui';

interface UserProps {
  user: User;
}

const Header = (currentUser: UserProps): JSX.Element => {
  if (Object.keys(currentUser).length === 0) {
    return <div></div>;
  } else {
    return (
      <div className="h-10 w-60 mt-2.5 ml-2.5 bg-white absolute border-2 border-inherit rounded-md z-10 text-black flex justify-between items-center">
        <p>Tool AI</p>
        <div className="sidebar-icon">
          <AvatarComponent
            initials={currentUser.user.initials}
            url={currentUser.user.profileImg}
          />
        </div>
      </div>
    );
  }
};

export default Header;
