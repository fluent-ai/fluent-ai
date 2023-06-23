# state

Check out the template code in the slices

## Usage

**Subscribing to some state**

```
import { useSelector,  } from 'react-redux';
import { selectAllFlowRunner, selectFlowRunnerEntities, store } from '@tool-ai/state';

const loadingStatus = useSelector((state: any) => state.flowRunner.loadingStatus);
console.log('🌈', loadingStatus);
```

**Dispatching a request to mutate the state**

```
<button onClick={() => dispatch(flowRunnerActions.setLoadingStatus('error'))}>set loading to 'error'</button>
```

## Note

Try to subsribe to as little state as possible, as your component will rerender every time a subsribed state changes.

IE Never

```
const myState = useSelector((state: any) => state.);
```
