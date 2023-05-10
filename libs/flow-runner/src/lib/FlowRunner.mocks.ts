export const nodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Text input',
      input: `{
        "name" : "Mr Wiggles",
        "color" : "pink",
        "number" : 3,
        "balloons" : true
      }
      `,
    },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    type: 'json',
    data: {
      label: 'JSON',
    },
    position: { x: 300, y: 50 },
  },
  {
    id: '3',
    type: 'template',
    data: {
      label: 'Template',
      template: `Hello {{msg.payload.name}}!
      Here! have {{msg.payload.number}} {{msg.payload.color}} balloons.`,
    },
    position: { x: 300, y: 50 },
  },
  {
    id: '4',
    type: 'textToUpperCase',
    data: { label: 'To Uppercase' },
    position: { x: 300, y: 50 },
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Output' },
    position: { x: 650, y: 25 },
  },
  {
    id: '6',
    type: 'userFunction',
    data: {
      label: 'Function',
      userFunction: 'msg.payload.number = msg.payload.number * 2; return msg',
    },
    position: { x: 650, y: 25 },
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Output' },
    position: { x: 650, y: 25 },
  },
];

export const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
  },
  {
    id: 'e2-6',
    source: '2',
    target: '6',
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
  },
];
