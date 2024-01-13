import * as React from 'react';
import { ListItemNode, ListNode } from '@lexical/list';
import { type InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { type EditorState } from 'lexical';
import { ToolbarPlugin } from '../rich-toolbar/Toolbar';
import { BannerNode, BannerPlugin } from './plugins/banner/BannerPlugin';
import './styles.css';
import OnChangePlugin from './plugins/on-change/OnChangePlugin';
import {
  DirectionNode,
  TextDirectionPlugin
} from './plugins/text-direction-plugin/TextDirectionPlugin';

const theme: InitialConfigType['theme'] = {
  heading: {
    h1: 'glyf-editor-h1',
    h2: 'glyf-editor-h2',
    h3: 'glyf-editor-h3'
  },
  text: {
    bold: 'glyf-editor-bold',
    italic: 'glyf-editor-italic',
    underline: 'glyf-editor-underline',
    strikethrough: 'glyf-editor-strikethrough',
    underlineStrikethrough: 'glyf-editor-underlineStrikethrough'
  },
  banner: 'glyf-editor-banner'
};

function onError(error: Error): void {
  console.error(error);
}

export type EditorMode = 'simple' | 'advanced';

interface EditorProps {
  onChange: (editorState: EditorState, htmlContent: string) => void;
  style?: React.CSSProperties;
  mode?: EditorMode;
}

export default function Editor({ onChange, mode = 'simple', style }: EditorProps): JSX.Element {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode, BannerNode, DirectionNode]
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <OnChangePlugin onChange={onChange} />
      <ToolbarPlugin mode={mode} />
      <BannerPlugin />
      <TextDirectionPlugin />
      <ListPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="contentEditable"
            style={{ width: '100%', height: 100, ...style }}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
        placeholder={<div></div>}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
}
