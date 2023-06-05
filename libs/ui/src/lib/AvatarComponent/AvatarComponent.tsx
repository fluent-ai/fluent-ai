import * as Avatar from '@radix-ui/react-avatar';
import styles from './AvatarComponent.module.css';
import { IAvatarProps } from '../../types';

const AvatarComponent = (props: IAvatarProps) => (
  <Avatar.Root className={styles.AvatarRoot}>
    <Avatar.Image className={styles.AvatarImage} src={props.url} />
    <Avatar.Fallback className={styles.AvatarFallback}>
      {props.initials}
    </Avatar.Fallback>
  </Avatar.Root>
);

export { AvatarComponent };
