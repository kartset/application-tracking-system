import {$generateHtmlFromNodes} from '@lexical/html';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";


const HtmlGeneratorPlugin = ({setHTML}) => {
    const [editor] = useLexicalComposerContext();  
    editor.registerUpdateListener(() =>
      editor.update(() => {
        console.log({aa:JSON.stringify($generateHtmlFromNodes(editor, null))})
        setHTML(JSON.stringify($generateHtmlFromNodes(editor, null)))
      })
    );
  
    return null;
};


export default HtmlGeneratorPlugin