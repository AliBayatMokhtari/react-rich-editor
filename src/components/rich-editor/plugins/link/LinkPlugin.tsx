import { Link1Icon } from '@radix-ui/react-icons';
import * as React from 'react';
import { ToolbarButton } from 'src/components/rich-toolbar/Toolbar';

const LinkToolbarPlugin = (): JSX.Element => {
	return (
		<ToolbarButton
			onClick={() => {
				console.log('Ali BM');
			}}
		>
			<Link1Icon />
		</ToolbarButton>
	);
};

export default LinkToolbarPlugin;
