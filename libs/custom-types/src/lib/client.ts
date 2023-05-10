export interface Client {
  id: string;
  email: string;
  name: string;
  initials: string;
  flows: [
    {
      id: string;
      stringifiedFlowData: string;
      owner: boolean;
    }
  ];
}
