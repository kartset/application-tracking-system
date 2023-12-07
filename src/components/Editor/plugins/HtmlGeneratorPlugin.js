import {$generateHtmlFromNodes} from '@lexical/html';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const HtmlGeneratorPlugin = ({onChange, formFields}) => {
    const [editor] = useLexicalComposerContext(); 
    editor.registerUpdateListener(() =>
      editor.update(() => {
        const editorState = editor.getEditorState();
        const json = editorState.toJSON();
        onChange(json, JSON.stringify($generateHtmlFromNodes(editor, null)))
        if(formFields && formFields.setValues) {
            formFields.setValues({textHTML:JSON.stringify($generateHtmlFromNodes(editor, null))})
        }
      })
    );
  
    return null;
};


export default HtmlGeneratorPlugin