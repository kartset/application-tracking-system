import EditorTheme from "./themes/EditorTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighLightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import './Editor.css'
import { $createLineBreakNode, $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import { $createListNode } from '@lexical/list'
import HtmlGeneratorPlugin from "./plugins/HtmlGeneratorPlugin";

function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
}

function prepopulatedRichText() {
    const root = $getRoot();
    if (root.getFirstChild() === null) {
        const paragraph = $createParagraphNode();
        paragraph.append(
            $createTextNode("Overview\n").toggleFormat('bold'),
            $createLineBreakNode(),
            $createLineBreakNode(),
            $createTextNode("Description\n").toggleFormat('bold'),
            $createLineBreakNode(),
            $createLineBreakNode(),
            $createTextNode("Requirements\n").toggleFormat('bold'),
            $createListNode('number', 1),
            $createTextNode("Roles & Responsibilities\n").toggleFormat('bold'),
            $createListNode('number', 1),
            $createTextNode("Perks\n").toggleFormat('bold'),
            $createListNode('number', 1),
        );
        root.append(paragraph);
    }
}
  
  

const editorConfig = {
    theme: EditorTheme,
    onError: (error:any) => {
        throw error;
    },
    namespace: "editor-tokenVariable",
    editable:true,
    // Any custom nodes go here
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode
    ]
};

const Editor:React.FC<any> = (({setHTML}) => {
    return (
        <LexicalComposer initialConfig={{...editorConfig, editorState: prepopulatedRichText}}>
            <div className="editor-container">
                <ToolbarPlugin />
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input" />}
                        placeholder= {<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HtmlGeneratorPlugin setHTML={setHTML} />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <CodeHighlightPlugin />
                    <OnChangePlugin onChange={editorState => console.log({editorState})} />
                    <ListPlugin />
                    <LinkPlugin />
                    <AutoLinkPlugin />
                    <ListMaxIndentLevelPlugin maxDepth={7} />
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                </div>
            </div>
        </LexicalComposer>
    )
})


export default Editor