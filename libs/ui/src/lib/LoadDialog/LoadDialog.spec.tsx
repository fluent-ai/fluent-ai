import { render } from '@testing-library/react';

import {SettingsDialog} from './LoadDialog';

describe('SettingsDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingsDialog />);
    expect(baseElement).toBeTruthy();
  });
});
