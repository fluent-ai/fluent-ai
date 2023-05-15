import { useEffect } from "react";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { NodeDialogProps } from "../../types";
import { handleChange } from "../functions";
import * as deepl from 'deepl-node';
/* eslint-disable-next-line */
export interface DeeplDialogProps {}

function DeeplDialog(props: NodeDialogProps) {
  const translator = new deepl.Translator("b5bdd36a-0c1b-0418-58fb-9b043d819dea:fx");

  async function getLanguages () {
    return await translator.getSourceLanguages()
  }

  let sourcedLanguages: readonly deepl.Language[]= [];

  useEffect(() => {
      getLanguages().then(languages => sourcedLanguages = languages);
    }, []);

  return (
    <div>
      <InnerDialogStructure
        title="Deepl Translate"
        description="Deepl Translate dialog">
        <select title="language">
          {sourcedLanguages.length > 0 && sourcedLanguages.map((lang) => <option value={lang.code}>{lang.name}</option>)}
        </select>
      </InnerDialogStructure>
    </div>
  );
}

export {DeeplDialog};
