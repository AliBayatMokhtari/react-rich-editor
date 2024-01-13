import * as React from 'react';
import './styles.css';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType_experimental } from '@lexical/selection';
import { $isRangeSelection, $getSelection, type TextFormatType } from 'lexical';
import { $createHeadingNode } from '@lexical/rich-text';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { INSERT_BANNER_COMMAND } from '../glyf-editor/plugins/banner/BannerPlugin';
import * as Toolbar from '@radix-ui/react-toolbar';
import {
  StrikethroughIcon,
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  PlusCircledIcon
} from '@radix-ui/react-icons';
import { OrderedListIcon, UnorderedListIcon } from './icons';
import { BannerColorPickerPlugin } from '../glyf-editor/plugins/banner/BannerColorPickerPlugin';
import TextAlignToolbarPlugin from '../glyf-editor/plugins/text-align-plugin/TextAlignPlugin';
import {
  type Dir,
  RTL_DIRECTION_NODE_COMMAND,
  LTR_DIRECTION_NODE_COMMAND
} from '../glyf-editor/plugins/text-direction-plugin/TextDirectionPlugin';
import { type EditorMode } from '../glyf-editor/Editor';

interface ToolbarButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
}

export function ToolbarButton(props: ToolbarButtonProps): JSX.Element {
  return (
    <Toolbar.Button className="toolbarButton" onClick={props.onClick}>
      {props.children}
    </Toolbar.Button>
  );
}

function TextFormatToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const getIcon = (format: TextFormatType): JSX.Element | null => {
    switch (format) {
      case 'bold':
        return <FontBoldIcon />;
      case 'italic':
        return <FontItalicIcon />;
      case 'strikethrough':
        return <StrikethroughIcon />;
      case 'underline':
        return <UnderlineIcon />;
      default:
        return null;
    }
  };
  const onClick = (format: TextFormatType): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText(format);
      }
    });
  };
  const supportedTextFormats: TextFormatType[] = ['bold', 'italic', 'underline', 'strikethrough'];
  return (
    <>
      {supportedTextFormats.map((format) => (
        <ToolbarButton
          key={format}
          onClick={() => {
            onClick(format);
          }}
        >
          {getIcon(format)}
        </ToolbarButton>
      ))}
    </>
  );
}

type HeadingTag = 'h1' | 'h2' | 'h3';
function HeadingToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const headingTags: HeadingTag[] = ['h1', 'h2', 'h3'];
  const onClick = (tag: HeadingTag): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType_experimental(selection, () => $createHeadingNode(tag));
      }
    });
  };
  return (
    <>
      {headingTags.map((tag) => (
        <ToolbarButton
          onClick={() => {
            onClick(tag);
          }}
          key={tag}
        >
          {tag.toUpperCase()}
        </ToolbarButton>
      ))}
    </>
  );
}

function ListToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onClick = (tag: 'ol' | 'ul'): void => {
    if (tag === 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };
  return (
    <>
      <ToolbarButton
        onClick={() => {
          onClick('ol');
        }}
      >
        <OrderedListIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          onClick('ul');
        }}
      >
        <UnorderedListIcon />
      </ToolbarButton>
    </>
  );
}

function BannerToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onClick = (e: React.MouseEvent): void => {
    editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
  };
  return (
    <ToolbarButton onClick={onClick}>
      <PlusCircledIcon />
      Banner
    </ToolbarButton>
  );
}

function LtrIcon(): JSX.Element {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="15px"
      width="15px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 5V15H9V11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3H17V5H15V15H13V5H11ZM9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9V5ZM17 17V14.5L21 18L17 21.5V19H5V17H17Z"></path>
    </svg>
  );
}

function RtlIcon(): JSX.Element {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="15px"
      width="15px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 5V15H9V11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3H17V5H15V15H13V5H11ZM9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9V5ZM7 17H19V19H7V21.5L3 18L7 14.5V17Z"></path>
    </svg>
  );
}

function TextDirectionToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const onClick = (dir: Dir): void => {
    editor.update(() => {
      editor.dispatchCommand(
        dir === 'rtl' ? RTL_DIRECTION_NODE_COMMAND : LTR_DIRECTION_NODE_COMMAND,
        dir
      );
    });
  };

  return (
    <>
      <ToolbarButton
        onClick={() => {
          onClick('ltr');
        }}
      >
        <LtrIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          onClick('rtl');
        }}
      >
        <RtlIcon />
      </ToolbarButton>
    </>
  );
}

export function ToolbarPlugin({ mode }: { mode: EditorMode }): JSX.Element {
  return (
    <Toolbar.Root className="toolbarRoot">
      <TextFormatToolbarPlugin />
      <TextAlignToolbarPlugin />
      <TextDirectionToolbarPlugin />
      {mode === 'advanced' && (
        <>
          <HeadingToolbarPlugin />
          <ListToolbarPlugin />
          <BannerToolbarPlugin />
        </>
      )}
      <BannerColorPickerPlugin />
    </Toolbar.Root>
  );
}
