import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/styles/hljs';

export default class CodeBlock extends React.PureComponent {
	static propTypes = {
		value: PropTypes.string.isRequired,
		language: PropTypes.string
	};

	static defaultProps = {
		language: null
	};

	render() {
		const { language, value } = this.props;

		return (
			<SyntaxHighlighter language={language} CodeTag="div" style={githubGist}>
				{value}
			</SyntaxHighlighter>
		);
	}
}