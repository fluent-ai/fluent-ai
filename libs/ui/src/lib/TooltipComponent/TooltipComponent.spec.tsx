import { render } from '@testing-library/react';

import {TooltipComponent} from './TooltipComponent';

describe('Tooltip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TooltipComponent text='' />);
    expect(baseElement).toBeTruthy();
  });
});
