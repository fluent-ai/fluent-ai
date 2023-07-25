import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { useDispatch, useSelector } from "react-redux";
import { flowActions, flowSelectors , flowRunnerSelectors } from "@tool-ai/state";


interface Items {
  code:string;
  name:string;
}


const langWithFormality = ['DE', 'FR', 'IT', 'ES', 'NL', 'PL', 'PT-PT', 'PT-BR', 'RU'];

const formalities: Items[] = [
  {code: 'default', name: 'default'},
  {code: 'more', name: 'formal'},
  {code: 'less', name: 'informal'},
  {code: 'prefer_more', name: 'more formal'},
  {code: 'prefer_less', name: 'more informal'}
]
  const deeplLanguages: Items[] = [
    { code: 'BG', name: 'Bulgarian' },
    { code: 'CS', name: 'Czech' },
    { code: 'DA', name: 'Danish' },
    { code: 'DE', name: 'German' },
    { code: 'EL', name: 'Greek' },
    { code: 'EN-GB', name: 'English (UK)' },
    { code: 'EN-US', name: 'English (US)' },
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Spanish' },
    { code: 'ET', name: 'Estonian' },
    { code: 'FI', name: 'Finnish' },
    { code: 'FR', name: 'French' },
    { code: 'HU', name: 'Hungarian' },
    { code: 'IT', name: 'Italian' },
    { code: 'JA', name: 'Japanese' },
    { code: 'LT', name: 'Lithuanian' },
    { code: 'LV', name: 'Latvian' },
    { code: 'NL', name: 'Dutch' },
    { code: 'PL', name: 'Polish' },
    { code: 'PT-PT', name: 'Portuguese (Portugal)' },
    { code: 'PT-BR', name: 'Portuguese (Brazil)' },
    { code: 'PT', name: 'Portuguese' },
    { code: 'RO', name: 'Romanian' },
    { code: 'RU', name: 'Russian' },
    { code: 'SK', name: 'Slovak' },
    { code: 'SL', name: 'Slovenian' },
    { code: 'SV', name: 'Swedish' },
    { code: 'ZH', name: 'Chinese' }
  ];

function DeeplDialog({nodeId}:{nodeId:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(nodeId));
  const outputs = useSelector(flowRunnerSelectors.selectOutput(nodeId));
  let response = outputs?.msg?.payload as string;
  response = '' + response



  const formalityAvailable = langWithFormality.includes(inputs?.language as string);

  const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('🌈',e.target.value);
    dispatch(
      flowActions.setInput(
        {
          id:nodeId,
          nodeInputs: {
            ...inputs,
            language: e.target.value
          }
        })
    )
  }

  const onFormalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('🌈',e.target.value);
    dispatch(
      flowActions.setInput(
        {
          id:nodeId,
          nodeInputs: {
            ...inputs,
            formality: e.target.value
          }
        })
    )
  }

  return (
    <div>
      <InnerDialogStructure
        title="Deepl Translate"
        description="Deepl Translate dialog">
        <div className="flex flex-col gap-2">

        <label htmlFor="language-select" className="block">Select language</label>
        <select id="language-select" title="language" onChange={onLanguageChange} className="border-2 border-solid border-gray-light rounded-md p-2.5">
          {deeplLanguages.length > 0 && deeplLanguages.map((lang) =>  <option value={lang.code}>{lang.name}</option>)}
        </select>

        <label htmlFor="formality-select" className={`block`}>Select formality</label>
        <select id="formality-select" title="formality" onChange={onFormalityChange} disabled={!formalityAvailable} className="border-2 border-solid border-gray-light rounded-md p-2.5 disabled:text-gray-light">
          {formalities.length > 0 && formalities.map((formality) => <option value={formality.code}>{formality.name}</option>)}
        </select>


        {
        !formalityAvailable && <small className="mt-2 text-sm text-gray-light">
          Formality is not available for {deeplLanguages.find((lang) => lang.code === inputs?.language)?.name}
          </small>
        }
        <pre className="mt-2 p-2 border-2 border-solid border-gray-light rounded-md text-sm text-gray-light">{response}</pre>

        </div>
      </InnerDialogStructure>
    </div>
  );
}

export {DeeplDialog};
