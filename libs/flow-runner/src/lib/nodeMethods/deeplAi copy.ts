import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
interface Message {
  payload?: string;
}
interface Props {
  midjourneyApiKey: string;
  url: string;
}
interface Data {
  jobId: string;
  messageId: string;
  content: string;
  imageURL: string;
}

export async function midjourney(msg: Message, props: Props): Promise<Message> {
  const apiKey = props.midjourneyApiKey;
  const data = JSON.stringify({
    prompt: msg.payload,
  });

  const config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: props.url + '/imagine',
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response: AxiosResponse<Data> = await axios.request(config);
    console.log(JSON.stringify(response.data));
  } catch (error: any) {
    console.log(error);
  }
}
const props=  {
  midjourneyApiKey: string;
  url: string;
}
const messsage = {
  payload :"a red knight riding a blue horse"
}



midjourney(message, props)
