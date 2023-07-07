import * as Avatar from '@radix-ui/react-avatar';
import { IAvatarProps } from '../../types';

const AvatarComponent = (props: IAvatarProps) => (
  <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-30 h-30 rounded-full">
    <Avatar.Image className="w-full h-full object-cover rounded-full" src={props.url} />
    <Avatar.Fallback className="min-w-30 min-h-30 flex items-center justify-center bg-transparent border border-gray-500 rounded-full text-black text-15 font-medium">
      {props.initials}
    </Avatar.Fallback>
  </Avatar.Root>
);

export { AvatarComponent };
