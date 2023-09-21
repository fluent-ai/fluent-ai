import {BsFiletypeTxt, BsDownload, BsTextareaT, BsBraces, BsLayoutTextWindowReverse, BsEye, BsFiletypeJson, BsTranslate} from 'react-icons/bs';
import {GiChoice} from 'react-icons/gi';
import {IoImageOutline, IoImagesOutline} from 'react-icons/io5';
import {SiOpenai} from 'react-icons/si';
import {PiPlugs} from 'react-icons/pi'

interface NodeItemData {
  type: string
  label: string;
  group: string
  icon: JSX.Element
}

export const groups = [
  {
    id: 'group-inputs',
    label: 'inputs',
    color: "#78dce8"
  },
  {
    id: 'group-process',
    label: 'process',
    color: "#fc9867"
  },
  {
    id: 'group-extras',
    label: 'extras',
    color: "#d3dce6"
  },
  {
    id: 'group-outputs',
    label: 'outputs',
    color: "#a9dc76"
  },
  {
    id: 'group-openai',
    label: 'open AI',
    color: "#ffd866"
  },
]
export const NodeData: NodeItemData[] = [
    {
    type: 'textFileInput',
    label:'Text File Input',
    group: 'group-inputs',
    icon:<BsFiletypeTxt />},
    {
      type: 'textInput',
      label:'Text Input',
      group: 'group-inputs',
      icon:<BsTextareaT/>},
    {
      type: 'json',
      label:'JSON',
      group: 'group-process',
      icon:<BsFiletypeJson />},
    {
      type: 'userFunction',
      label:'User Function',
      group: 'group-process',
      icon:<BsBraces />},
    {
      type: 'template',
      label:'Template',
      group: 'group-process',
      icon:<BsLayoutTextWindowReverse />},
    {
      type: 'condition',
      label:'Condition',
      group: 'group-process',
      icon:<GiChoice />},
    {
      type: 'remoterunner',
      label:'Remote Runner',
      group: 'group-process',
      icon:<PiPlugs />},
    {
      type: 'openAi',
      label:'OpenAI',
      group: 'group-openai',
      icon:<SiOpenai />
    },
    {
      type: 'preview',
      label:'Preview',
      group: 'group-outputs',
      icon:<BsEye />
    },
  ]
