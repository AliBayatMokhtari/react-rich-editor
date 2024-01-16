import * as React from 'react';
import './App.css';
import { RichTextEditor } from 'src/components';

function App(): JSX.Element {
	return (
		<div className="App">
			<h1 className="editorHeading">Glyf Editor</h1>
			<div className="editorWrapper">
				<RichTextEditor
					onChange={(editorState, htmlContent) => {
						// console.log(htmlContent);
					}}
				/>
			</div>
		</div>
	);
}

export default App;
