import styled from "styled-components";
import { Button } from "../button";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { Link } from "react-router-dom";

const Navegation = styled.nav<{ $bg: string; $text: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 14%;
  background: ${({ $bg }) => $bg};
  color: ${({ $text }) => $text};
  padding-left: 90px;
  padding-right: 90px;
`;

const Logo = styled.h1<{ $text: string }>`
  color: ${({ $text }) => $text};
  font-size: 40px;
`;

const NavBar = ({ togglePokemons, showExtra }: { togglePokemons: () => void, showExtra: boolean }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);


    return (
        <Navegation
            $bg={`${theme.navBackground}`}
            $text={theme.color}
        >
            <div>
                <Logo $text={theme.color}>Pokemon List</Logo>
            </div>
            <div>
                <Link to="/">
                    <Button>Home</Button>
                </Link>
                <Button onClick={toggleTheme}>Mudar Tema</Button>
                <Button onClick={togglePokemons}>
                    {showExtra ? "Mostrar menos" : "Mostrar mais"}
                </Button>

            </div>
        </Navegation>
    );
};

export { NavBar };
