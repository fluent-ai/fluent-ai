import { render } from '@testing-library/react';

import {SettingsDialog} from './SettingsDialog';

describe('SettingsDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingsDialog />);
    expect(baseElement).toBeTruthy();
  });
});
