import { useState } from "react";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowRunnerSelectors } from "@tool-ai/state";
import { useSelector } from "react-redux";

interface Items {
  code:string;
  name:string;
}

function DeeplDialog({id}:{id:string}) {
  const outputs = useSelector(flowRunnerSelectors.selectOutput(id));
  let response = outputs?.nodeOutputs?.payload as string;
  response = '' + response

  const [formalityDisabled, setFormalityDisabled] = useState(true);
  const langWithFormality = ['DE', 'FR', 'IT', 'ES', 'NL', 'PL', 'PT-PT', 'PT-BR', 'RU'];
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

  const formalities: Items[] = [
    {code: 'default', name: 'default'},
    {code: 'more', name: 'formal'},
    {code: 'less', name: 'informal'},
    {code: 'prefer_more', name: 'more formal'},
    {code: 'prefer_less', name: 'more informal'}

  ]

    function handleFormalityChange(e: React.ChangeEvent<HTMLSelectElement>) {
      if(langWithFormality.includes(e.target.value)) {
        setFormalityDisabled(false);
      } else {
        setFormalityDisabled(true);
      }
    }

  return (
    <div>
      <InnerDialogStructure
        title="Deepl Translate"
        description="Deepl Translate dialog">
        <div className="flex flex-col gap-2">
        <label htmlFor="language-select" className="block">Select language</label>
        <select id="language-select" title="language" onChange={handleFormalityChange} className="border-2 border-solid border-gray-light rounded-md p-2.5">
          {deeplLanguages.length > 0 && deeplLanguages.map((lang) =>  <option value={lang.code}>{lang.name}</option>)}
        </select>

        <label htmlFor="formality-select" className={`block`}>Select formality</label>
        <select id="formality-select" title="formality" disabled={formalityDisabled} className="border-2 border-solid border-gray-light rounded-md p-2.5 disabled:text-gray-light">
          {formalities.length > 0 && formalities.map((formality) => <option value={formality.code}>{formality.name}</option>)}
        </select>

        {formalityDisabled && <small className="mt-2 text-sm text-gray-light">Formality is not available for this language</small>}
        <div>{
          // replace the linebreaks in the string with <br/> tags
          response.split('\n').map((item, i) => <p key={i}>{item}</p>)
          }

      </div>
        </div>
      </InnerDialogStructure>
    </div>
  );
}

export {DeeplDialog};
