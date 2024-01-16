import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';
import {
	ElementNode,
	createCommand,
	type EditorConfig,
	type LexicalNode,
	type NodeKey,
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_LOW,
	$createParagraphNode
} from 'lexical';

export type Dir = 'rtl' | 'ltr';

function addCls(element: HTMLElement, cls: string): HTMLElement {
	const newEl = element;
	newEl.classList.add(cls);
	return newEl;
}

function removeCls(element: HTMLElement, cls: string): HTMLElement {
	const newEl = element;
	newEl.classList.remove(cls);
	return newEl;
}

function removeAttr(element: HTMLElement, attr: string): HTMLElement {
	const newEl = element;
	newEl.removeAttribute(attr);
	return newEl;
}

export class DirectionNode extends ElementNode {
	private readonly __direction: Dir | undefined;

	constructor(dir?: Dir, key?: NodeKey) {
		super(key);
		this.__direction = dir ?? 'ltr';
	}

	static getType(): string {
		return 'direction';
	}

	static clone(node: DirectionNode): DirectionNode {
		return new DirectionNode(node.__direction, node.__key);
	}

	createDOM(_config: EditorConfig): HTMLElement {
		let element = document.createElement('p');

		element = (
			this.__direction === 'rtl'
				? removeAttr(removeCls(addCls(element, 'rtl'), 'ltr'), 'dir')
				: removeAttr(removeCls(addCls(element, 'ltr'), 'rtl'), 'dir')
		) as HTMLParagraphElement;

		element.dataset.direction = this.__direction;

		return element;
	}

	updateDOM(_prevNode: HTMLElement, _dom: HTMLElement): boolean {
		return _prevNode.dataset?.direction !== _dom.dataset?.direction;
	}

	collapseAtStart(): boolean {
		const paragraph = $createParagraphNode();
		const children = this.getChildren();
		children.forEach((child) => paragraph.append(child));
		this.replace(paragraph);
		return true;
	}
}

export function $createDirectionNode(dir?: Dir): DirectionNode {
	console.log({ dir });
	return new DirectionNode(dir);
}

export function $isDirectionNode(node: LexicalNode): boolean {
	return node instanceof DirectionNode;
}

export const RTL_DIRECTION_NODE_COMMAND = createCommand('rtlDirection');
export const LTR_DIRECTION_NODE_COMMAND = createCommand('ltrDirection');

export function TextDirectionPlugin(): null {
	const [editor] = useLexicalComposerContext();

	if (!editor.hasNodes([DirectionNode])) {
		throw new Error(
			'DirectionPlugin: TextDirectionNode not registered on editor'
		);
	}

	editor.registerCommand(
		RTL_DIRECTION_NODE_COMMAND,
		() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				$setBlocksType(selection, () => $createDirectionNode('rtl'));
			}
			return true;
		},
		COMMAND_PRIORITY_LOW
	);

	editor.registerCommand(
		LTR_DIRECTION_NODE_COMMAND,
		() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				$setBlocksType(selection, () => $createDirectionNode('ltr'));
			}
			return true;
		},
		COMMAND_PRIORITY_LOW
	);

	return null;
}
