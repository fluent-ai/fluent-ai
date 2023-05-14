export const inputs = [
  {
    id: '1',
    nodeInputs: {
      input: `{
          "name" : "Mr Wiggles",
          "color" : "pink",
          "number" : 3,
          "balloons" : true
        }
        `,
    },
  },
  {
    id: '3',
    nodeInputs: {
      userFunction: 'msg.payload.number = msg.payload.number * 2; return msg',
    },
  },
  {
    id: '4',
    nodeInputs: {
      template: `Hello {{msg.payload.name}}!
        Here! have {{msg.payload.number}} {{msg.payload.color}} balloons.`,
    },
  },
  {
    id: '5',
    nodeInputs: {
      input: `Please respond with exactly 'Hello'`,
    },
  },
];

export const nodes = [
  {
    id: '1',
    type: 'textInput',
    data: {
      label: 'Text input',
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
    type: 'userFunction',
    data: {
      label: 'Function',
    },
    position: { x: 650, y: 25 },
  },
  {
    id: '4',
    type: 'template',
    data: {
      label: 'Template',
    },
    position: { x: 300, y: 50 },
  },
  {
    id: '5',
    type: 'textInput',
    data: { label: 'Input' },
    position: { x: 650, y: 25 },
  },
  {
    id: '6',
    type: 'openAi',
    data: {
      label: 'OpenAI Chat Completion',
    },
    position: { x: 300, y: 50 },
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
    id: 'e5-6',
    source: '5',
    target: '6',
  },
];
