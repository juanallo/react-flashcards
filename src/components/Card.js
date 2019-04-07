import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import CodeBlock from "./CodeBlock";

const CurrentCard = styled.div`
    height: 100%;
    box-sizing: border-box;
    background: #dedede;
    position: relative;
    display: flex;
    flex-direction: column;
`;
const Content = styled.div`
	display: block;
    overflow: auto;
    width: 100%;
    flex-grow: 1;
    padding: 30px;
    box-sizing: border-box;
    
    code {
	    border-radius: 2px;
	    color: #f00;
	    padding: 0 5px;
	    background: #fff;
	    box-sizing: border-box;
	    font-size: 13px;
    }
`;

const Footer = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
`;

const Button = styled.button`
	height: 40px;
    border: none;
    font-size: 14px;
`;

export default ({children, onFlip, title}) => (
	<CurrentCard>
		<Content>
			<ReactMarkdown
				linkTarget="_blank"
				renderers={{
					code: CodeBlock,
				}}
				source={`## ${title}\n ${children}`}/>
		</Content>
		<Footer>
			<Button onClick={onFlip}>Flip it!</Button>
		</Footer>
	</CurrentCard>
);