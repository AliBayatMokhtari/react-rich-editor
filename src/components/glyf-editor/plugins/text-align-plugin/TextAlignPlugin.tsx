import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon
} from '@radix-ui/react-icons';
import { FORMAT_ELEMENT_COMMAND } from 'lexical';
import * as React from 'react';
import { ToolbarButton } from 'src/components/glyf-toolbar/Toolbar';

const Align = {
  left: 'left',
  right: 'right',
  center: 'center',
  justify: 'justify'
} as const;

export default function TextAlignToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const onClick = React.useCallback(
    (align: keyof typeof Align) => {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, Align[align]);
    },
    [editor]
  );

  return (
    <>
      <ToolbarButton
        onClick={() => {
          onClick(Align.left);
        }}
      >
        <TextAlignLeftIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          onClick(Align.right);
        }}
      >
        <TextAlignRightIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          onClick(Align.center);
        }}
      >
        <TextAlignCenterIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          onClick(Align.justify);
        }}
      >
        <TextAlignJustifyIcon />
      </ToolbarButton>
    </>
  );
}
