import {BsFiletypeTxt, BsDownload, BsTextareaT, BsBraces, BsLayoutTextWindowReverse, BsEye, BsImage, BsImages, BsFiletypeJson} from 'react-icons/bs';

import {IoImageOutline, IoImagesOutline} from 'react-icons/io5';
import {SiOpenai} from 'react-icons/si';

import {ReactComponent as DeeplLogo}  from  './assets/Deepl_Logo.svg';
import {VscJson} from 'react-icons/vsc';

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
    color: "theme(colors.blue.0)"
  },
  {
    id: 'group-process',
    label: 'process',
    color: "theme(colors.red)"
  },
  {
    id: 'group-outputs',
    label: 'outputs',
    color: "theme(colors.green)"
  },
  {
    id: 'group-openai',
    label: 'open AI',
    color: "theme(colors.yellow)"
  },
  {
    id: 'group-deepl',
    label: 'Deepl',
    color: "theme(colors.purple)"
  }
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
      type: 'preview',
      label:'Preview',
      group: 'group-outputs',
      icon:<BsEye />
    },
    {
      type: 'openAi',
      label:'OpenAI',
      group: 'group-openai',
      icon:<SiOpenai />
    },
    {
      type: 'deepl',
      label:'DeepL',
      group: 'group-deepl',
      icon:<DeeplLogo />
    },
    {
      type: 'imageAi',
      label:'Image AI',
      group: 'group-openai',
      icon:<IoImagesOutline />
    },
    {
      type: 'dalleGeneration',
      label:'Dall.e Generation',
      group: 'group-openai',
      icon:<IoImageOutline />
    },
    {
      type: 'download',
      label:'Download',
      group: 'group-outputs',
      icon:<BsDownload />
    },
  ]
