import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";

type PokemonTypeSlot = {
    type: { name: string };
};

type PokemonMoveSlot = {
    move: { name: string };
};

const Container = styled.div<{ $bg: string }>`
display:flex;
width: 100%;
height:auto;
align-items: center;
flex-direction:column;
gap:15px;
background: ${({ $bg }) => $bg};
`
const Title = styled.h1`
color:blueviolet;
font-size:45px;
`
const Subtitle = styled.h2`
color:blueviolet;
font-size:30px;
`
const List = styled.ul<{ $text: string }>`
color: ${({ $text }) => $text};
font-size:23px;
`
const Description = styled.p<{ $text: string }>`
font-size:23px;
color: ${({ $text }) => $text};
`

const PokemonDetalhesPage = () => {
    const { nome } = useParams<{ nome: string }>();
    const [pokemon, setPokemon] = useState<any>(null);
    const [descricao, setDescricao] = useState<string>("");
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        async function fetchDetails() {
            try {

                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
                const data = await res.json();

                setPokemon({
                    nome: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                    tipos: data.types.map((t: PokemonTypeSlot) => t.type.name),
                    imagem: data.sprites.other?.["official-artwork"]?.front_default,
                    golpes: data.moves.slice(0, 5).map((m: PokemonMoveSlot) => m.move.name)
                });


                const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nome}`);
                const speciesData = await speciesRes.json();

                const flavor = speciesData.flavor_text_entries.find(
                    (entry: any) => entry.language.name === "en"
                );
                setDescricao(flavor ? flavor.flavor_text.replace(/\n|\f/g, " ") : "Descrição não disponível.");
            } catch (err) {
                console.error(err);
            }
        }

        fetchDetails();
    }, [nome]);

    if (!pokemon) return <p>Carregando...</p>;

    return (
        <Container $bg={`${theme.navBackground}`} >
            <Title>{pokemon.nome}</Title>
            <img src={pokemon.imagem} alt={pokemon.nome} width={200} />

            <Subtitle>Tipos</Subtitle>
            <List $text={theme.color}>
                {pokemon.tipos.map((t: string) => (
                    <li key={t}>{t}</li>
                ))}
            </List>

            <Subtitle>Descrição</Subtitle>
            <Description $text={theme.color}>{descricao}</Description>

            <Subtitle>Golpes</Subtitle>
            <List $text={theme.color}>
                {pokemon.golpes.map((g: string) => (
                    <li key={g}>{g}</li>
                ))}
            </List>
        </Container>
    );
};

export { PokemonDetalhesPage };
