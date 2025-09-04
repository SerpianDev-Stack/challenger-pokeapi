import { type ReactNode } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";


type ButtonProps = {
    children: ReactNode,
    onClick?: () => void;
}

const BTN = styled.button<{ $text: string }>`
border: none;
color: ${({ $text }) => $text};
font-size:30px;
background:none;
cursor:pointer;
padding:15px 30px;
border-radius:5px;
font-family: "Bebas Neue", sans-serif;

&:hover{
color:blueviolet;
}
`

const Button = (props: ButtonProps) => {

    const { theme } = useContext(ThemeContext);
    return <BTN $text={theme.color} {...props}>{props.children}</BTN>;
}

export { Button }