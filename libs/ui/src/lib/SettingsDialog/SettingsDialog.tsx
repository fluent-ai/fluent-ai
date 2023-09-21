import { DialogComponent } from '../DialogComponent/DialogComponent';
import { GearIcon } from '@radix-ui/react-icons';
import Switch from '../SwitchComponent/SwitchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { generalActions, generalSelectors } from '@tool-ai/state';
import styles from '../../styles.module.css';
/* eslint-disable-next-line */
export interface SettingsDialogProps {}

function SettingsDialog(props: SettingsDialogProps) {
  const dispatch = useDispatch();
  const remoteRunnerState = useSelector(generalSelectors.getRemoteRunner);

  return (
    <DialogComponent
      trigger={
        <div className="flex gap-x-3">
          <div className="sidebar-icon w-[30px] h-[30px]">
            <GearIcon />
          </div>
          <p className="w-100" aria-label="settings" placeholder="Search nodes">
            Settings
          </p>
        </div>
      }
      title="Settings"
    >
      <div>
        <p>
          <b>Remote Code Runner</b>
        </p>
        <p>Enabled</p>
        <Switch
          size={'medium'}
          label={''}
          checked={remoteRunnerState.enabled}
          onCheckedChange={(value) => {
            dispatch(generalActions.setRemoteRunnerEnabled(value));
          }}
        />
        <p>IP Address</p>
        <input
          className={styles.TextInput}
          placeholder={remoteRunnerState.ip}
          type="text"
          value={remoteRunnerState.ip}
          onChange={(event) =>
            dispatch(generalActions.setRemoteRunnerIp(event.target.value))
          }
        />
        <p>Port</p>
        <input
          className={styles.TextInput}
          placeholder={`${remoteRunnerState.port}`}
          type="number"
          value={remoteRunnerState.port}
          onChange={(event) =>
            dispatch(
              generalActions.setRemoteRunnerPort(Number(event.target.value))
            )
          }
        />
        <p>Status</p>
        <p>{remoteRunnerState.status}</p>
      </div>
    </DialogComponent>
  );
}

export { SettingsDialog };
