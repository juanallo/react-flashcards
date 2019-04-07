import React, {Fragment} from 'react';
import logo from '../static/images/logo.svg'
import styled from 'styled-components';

const Header = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled.img`
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 20px;
    padding: 5px;
    margin: 10px;
`;

const Title = styled.h1`
	margin: 0;
	font-size: 1.6rem;
	font-weight: 300;
	color: #5352ed;
`;

const Ul = styled.ul`
	margin: 0;
	padding: 10px 0;
	list-style: none;
`;

const Button = styled.button`
    border: 0;
    background: #0000;
    width: 100%;
    text-align: left;
    padding: 10px 20px;
    margin-bottom: 5px;
    font-size: 16px;
`;


const Navigation = (props) => {
	return (
		<Fragment>
			<Header>
				<Logo src={logo} alt="Flash-Cards"/>
				<Title>Flash Cards</Title>
			</Header>
			<Ul>
				{props.items.map(item => (
					<li key={item.id}>
						<Button onClick={e => props.onSelection(e, item.id)}>{item.label}</Button>
					</li>
				))}
			</Ul>
		</Fragment>
	);
};

Navigation.defaultProps = {
	items: []
};

export default Navigation;