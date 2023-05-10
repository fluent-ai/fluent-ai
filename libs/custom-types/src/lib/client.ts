export interface Client {
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
  profileImg?: string;
}
