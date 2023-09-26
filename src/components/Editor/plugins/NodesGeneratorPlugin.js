import { useEffect } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const NodesGeneratorPlugin = ({ initialJSON, isFirstRender, setIsFirstRender }) => {
    const [editor] = useLexicalComposerContext();
    
    useEffect(() => {
        if (!initialJSON) return;
        setIsFirstRender(false);
        editor.update(() => {
            const editorState = editor.parseEditorState(initialJSON);
            editor.setEditorState(editorState);
        });
    }, []);

    return (
        <OnChangePlugin
            onChange={(editorState) => {}}
        />
    );
};

export default NodesGeneratorPlugin