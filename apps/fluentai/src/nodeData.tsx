import {BsFiletypeTxt, BsDownload, BsTextareaT, BsBraces, BsLayoutTextWindowReverse, BsEye, BsImage, BsImages, BsFiletypeJson, BsTranslate, BsChatRightText} from 'react-icons/bs';
import {PiPlugs} from 'react-icons/pi';
import {GiChoice} from 'react-icons/gi';
import {IoImageOutline, IoImagesOutline} from 'react-icons/io5';
import {SiOpenai} from 'react-icons/si';

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
  {
    id: 'group-deepl',
    label: 'Deepl',
    color: "#ab9df2"
  }
]
export const NodeData: NodeItemData[] = [
    {
      type: 'commentNode',
      label:'Add Comment',
      group: 'group-extras',
      icon:<BsChatRightText />},
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
      type: 'openAi',
      label:'OpenAI',
      group: 'group-openai',
      icon:<SiOpenai />
    },
    {
      type: 'dalleVariation',
      label:'Dall.e Variations',
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
      type: 'deepl',
      label:'DeepL',
      group: 'group-deepl',
      icon:<BsTranslate />
    },
    {
      type: 'preview',
      label:'Preview',
      group: 'group-outputs',
      icon:<BsEye />
    },
    {
      type: 'download',
      label:'Download',
      group: 'group-outputs',
      icon:<BsDownload />
    },
  ]
