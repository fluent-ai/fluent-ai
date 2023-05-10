import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from './AlertComponent.module.css';

interface AlertProps {
  buttonText: string,
  title?:string,
  description?: string,
  classes?: string
}
const AlertComponent = (props: AlertProps) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button className={`${props.classes}`}>{props.buttonText}</button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
      <AlertDialog.Content className={styles.AlertDialogContent}>
        <AlertDialog.Title className={styles.AlertDialogTitle}>{props.title}</AlertDialog.Title>
        <AlertDialog.Description className={styles.AlertDialogDescription}>
          {props.description}
        </AlertDialog.Description>
        <div className='flex gap-x-2 justify-center'>
          <AlertDialog.Cancel asChild>
            <button className={`${styles.Button} ${styles.cancel}`}>Cancel</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button className={`${styles.Button} ${styles.red}`}>Yes, delete flow</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export {AlertComponent};