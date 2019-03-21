import React from 'react';
import styled from 'styled-components';

export default styled.div`
	background: #fff;
    box-shadow:
    /* The top layer shadow */
    0 1px 1px rgba(0,0,0,0.15),
    /* The second layer */
    0 10px 0 -5px #eee,
    /* The second layer shadow */
    0 10px 1px -4px rgba(0,0,0,0.15),
     /* The third layer */
    0 20px 0 -10px #eee,
    /* The third layer shadow */
    0 20px 1px -9px rgba(0,0,0,0.15);
    /* Padding for demo purposes */
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;