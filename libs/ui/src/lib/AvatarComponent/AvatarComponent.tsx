import * as Avatar from '@radix-ui/react-avatar';
import styles from './AvatarComponent.module.css';

interface AvatarProps {
  initials: string;
  name?: string
  url?: string;
  alt?: string
}
const AvatarComponent = (props: AvatarProps) => (
  <Avatar.Root className={styles.AvatarRoot}>
    <Avatar.Image
    className={styles.AvatarImage}
    src={props.url}
    alt={props.alt} />
    <Avatar.Fallback className={styles.AvatarFallback}>{props.initials}</Avatar.Fallback>
  </Avatar.Root>
);

export {AvatarComponent};
