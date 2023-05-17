import {BsFiletypeTxt, BsDownload} from 'react-icons/bs';
import {AiOutlineFileAdd, AiOutlineFunction} from 'react-icons/ai';
import {MdPreview} from 'react-icons/md';
import {TbJson, TbTemplate} from 'react-icons/tb';
import {RiText} from 'react-icons/ri';
import {SiOpenai} from 'react-icons/si';
import { BiImageAdd, BiImages} from 'react-icons/bi';
import {ReactComponent as OpenAiLogo}  from  '../../../assets/OpenAI_Logo.svg';
import {ReactComponent as DeeplLogo}  from  './assets/Deepl_Logo.svg';
import {VscJson} from 'react-icons/vsc';
import {ImInsertTemplate} from 'react-icons/im';
import { RxText } from 'react-icons/rx';

interface NodeItemData {
  type: string
  label: string;
  icon: JSX.Element
}
export const NodeData: NodeItemData[] = [
    {
    type: 'textFileInput',
    label:'Text File Input',
    icon:<BsFiletypeTxt />},
    {
      type: 'textInput',
      label:'Text Input',
      icon:<RiText/>},
    {
      type: 'json',
      label:'JSON',
      icon:<VscJson />},
    {
      type: 'userFunction',
      label:'User Function',
      icon:<AiOutlineFunction />},
    {
      type: 'template',
      label:'Template',
      icon:<ImInsertTemplate />},
    {
      type: 'preview',
      label:'Preview',
      icon:<MdPreview />
    },
    {
      type: 'openAi',
      label:'OpenAI',
      icon:<SiOpenai />
    },
    {
      type: 'deepl',
      label:'DeepL',
      icon:<DeeplLogo />
    },
    {
      type: 'imageAi',
      label:'Image AI',
      icon:<BiImages />
    },
    {
      type: 'dalleGeneration',
      label:'Dall.e Generation',
      icon:<BiImageAdd />
    },
    {
      type: 'download',
      label:'Download',
      icon:<BsDownload />
    },
  ]
