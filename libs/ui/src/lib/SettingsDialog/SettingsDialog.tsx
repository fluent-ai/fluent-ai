import { DialogComponent } from '../DialogComponent/DialogComponent';
import { GearIcon } from '@radix-ui/react-icons';
import Switch from '../SwitchComponent/SwitchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { generalActions, generalSelectors } from '@tool-ai/state';
import styles from '../../styles.module.css';
import { supabase } from '@tool-ai/supabase';
import { useEffect, useState } from 'react';
/* eslint-disable-next-line */
export interface SettingsDialogProps {}

function SettingsDialog(props: SettingsDialogProps) {
  const dispatch = useDispatch();
  const remoteRunnerState = useSelector(generalSelectors.getRemoteRunner);
  const openAiUseOwnKey = useSelector(generalSelectors.getOpenAiUseOwnKey);
  const openAiKey = useSelector(generalSelectors.getOpenAiKey);
  const [showKey, setShowKey] = useState(false);

  const [settings, setSettings] = useState({
    openAiUseOwnKey: false,
    openAiKey: '',
    remoteRunnerEnabled: false,
    remoteRunnerIp: 'localhost',
    remoteRunnerPort: 8080,
  });

  useEffect(() => {
    supabase.getSettings().then((settings) => {
      if (settings) {
        setSettings(settings);
        dispatch(
          generalActions.setOpenAiUseOwnKey(settings.openAiUseOwnKey || false)
        );
        dispatch(generalActions.setOpenAiKey(settings.openAiKey || ''));
        dispatch(
          generalActions.setRemoteRunnerEnabled(
            settings.remoteRunnerEnabled || false
          )
        );
        dispatch(
          generalActions.setRemoteRunnerIp(
            settings.remoteRunnerIp || 'localhost'
          )
        );
        dispatch(
          generalActions.setRemoteRunnerPort(settings.remoteRunnerPort || 8080)
        );
        console.log(`🍽️ settings updated to `, settings);
      } else {
        console.log(`🍽️ settings not found`);
      }
    });
  }, [dispatch]);

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
          <b>OpenAI</b>
        </p>
        <p></p>
        <Switch
          size={'medium'}
          label={'Use your own API key?'}
          checked={openAiUseOwnKey}
          onCheckedChange={(value) => {
            dispatch(generalActions.setOpenAiUseOwnKey(value));
            supabase.saveSettings({
              ...settings,
              openAiUseOwnKey: value,
            });
          }}
        />
        <p>
          Generate a API key in your OpenAI account{' '}
          <u>
            <a href="https://platform.openai.com/account/api-keys">here</a>
          </u>
          . Your key is stored in an encrypted Supabase column. However, if our
          Supabase Instance is compromised, your key could be decrypted. Set
          limits on your OpenAI account to prevent exposure and remove unused
          keys periodically.
        </p>
        <p>Key</p>
        <input
          className={styles.TextInput}
          placeholder={openAiKey}
          type={showKey ? 'text' : 'password'}
          onMouseEnter={() => setShowKey(true)}
          onMouseLeave={() => setShowKey(false)}
          onFocus={() => setShowKey(true)}
          onBlur={() => setShowKey(false)}
          value={openAiKey}
          onChange={(event) => {
            dispatch(generalActions.setOpenAiKey(event.target.value));
            supabase.saveSettings({
              ...settings,
              openAiKey: event.target.value,
            });
          }}
        />
        <p>
          <b>Remote Code Runner</b>
        </p>

        <Switch
          size={'medium'}
          label={`Enable`}
          checked={remoteRunnerState.enabled}
          onCheckedChange={(value) => {
            dispatch(generalActions.setRemoteRunnerEnabled(value));
            supabase.saveSettings({
              ...settings,
              remoteRunnerEnabled: value,
            });
          }}
        />
        <p>IP Address</p>
        <input
          className={styles.TextInput}
          placeholder={remoteRunnerState.ip}
          type="text"
          value={remoteRunnerState.ip}
          onChange={(event) => {
            dispatch(generalActions.setRemoteRunnerIp(event.target.value));
            supabase.saveSettings({
              ...settings,
              remoteRunnerIp: event.target.value,
            });
          }}
        />
        <p>Port</p>
        <input
          className={styles.TextInput}
          placeholder={`${remoteRunnerState.port}`}
          type="number"
          value={remoteRunnerState.port}
          onChange={(event) => {
            dispatch(
              generalActions.setRemoteRunnerPort(Number(event.target.value))
            );
            supabase.saveSettings({
              ...settings,
              remoteRunnerPort: Number(event.target.value),
            });
          }}
        />
        <p>Status</p>
        <p>{remoteRunnerState.status}</p>
      </div>
    </DialogComponent>
  );
}

export { SettingsDialog };
