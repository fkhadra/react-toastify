import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/styles';

export default ({ children, className, style }) => <div className={className} style={style}><SyntaxHighlighter language='javascript' style={monokai}>{children}</SyntaxHighlighter></div>;  
