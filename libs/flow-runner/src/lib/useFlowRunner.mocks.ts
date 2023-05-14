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
      template: `Hello {{msg.payload.name}}!
        Here! have {{msg.payload.number}} {{msg.payload.color}} balloons.`,
    },
  },
  {
    id: '6',
    nodeInputs: {
      userFunction: 'msg.payload.number = msg.payload.number * 2; return msg',
    },
  },
  {
    id: '7',
    nodeInputs: {
      input: `Please do a thing`,
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
    type: 'template',
    data: {
      label: 'Template',
    },
    position: { x: 300, y: 50 },
  },
  {
    id: '4',
    type: 'preview',
    data: { label: 'Preview' },
    position: { x: 300, y: 50 },
  },
  {
    id: '6',
    type: 'userFunction',
    data: {
      label: 'Function',
    },
    position: { x: 650, y: 25 },
  },
  {
    id: '7',
    type: 'textInput',
    data: { label: 'Input' },
    position: { x: 650, y: 25 },
  },
  {
    id: '8',
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
    id: 'e2-6',
    source: '2',
    target: '6',
  },
  {
    id: 'e7-8',
    source: '7',
    target: '8',
  },
];
