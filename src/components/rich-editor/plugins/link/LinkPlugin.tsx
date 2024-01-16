import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Link1Icon } from '@radix-ui/react-icons';
import {
	$getSelection,
	$isRangeSelection,
	SELECTION_CHANGE_COMMAND
} from 'lexical';
import * as React from 'react';
import { ToolbarButton } from 'src/components/rich-toolbar/Toolbar';
import { URL_REGEX } from '../../Editor';

const LinkToolbarPlugin = (): JSX.Element => {
	const [editor] = useLexicalComposerContext();
	const [link, setLink] = React.useState('');

	React.useEffect(() => {
		editor.update(() => {
			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				() => {
					const selection = $getSelection();
					if ($isRangeSelection(selection)) {
						const txtUnderSelection = selection.getTextContent();

						const isLink = URL_REGEX.test(txtUnderSelection);

						setLink(isLink ? txtUnderSelection : '');
					}
					return false;
				},
				1
			);
		});
	}, [editor]);

	return (
		<ToolbarButton
			style={{
				backgroundColor:
					link.length > 0 ? 'rgba(0, 0, 0, 0.3)' : 'inherit'
			}}
			onClick={() => {}}
		>
			<Link1Icon />
		</ToolbarButton>
	);
};

export default LinkToolbarPlugin;
