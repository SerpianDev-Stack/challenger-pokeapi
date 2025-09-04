import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { Link } from "react-router-dom";

const PokeList = styled.main<{ $bg: string }>`
  background: ${({ $bg }) => $bg};
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h2`
  color: blueviolet;
  margin: 30px;
`;

const Name = styled.p`
  color: white;
  font-size: 18px;
  text-align: center;
  text-transform: capitalize;

  &:hover {
    color: blueviolet;
    font-size: 19px;
  }
`;

const Lista = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: none;
  outline: none;
  margin-bottom: 20px;
  font-size: 16px;
`;

type PokemonResumo = {
  name: string;
  url: string;
};

type PokemonTypeSlot = {
  type: { name: string };
};

type PokemonDetalhes = {
  nome: string;
  tipo: string[];
  imagem: string;
};

interface ListProps {
  showExtra: boolean;
}

const List = ({ showExtra }: ListProps) => {
  const [pokemons, setPokemons] = useState<PokemonDetalhes[]>([]);
  const [extraPokemons, setExtraPokemons] = useState<PokemonDetalhes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState(""); // novo filtro por tipo

  const { theme } = useContext(ThemeContext);

  function shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  async function fetchRandomPokemons(
    qtd: number,
    type: string = ""
  ): Promise<PokemonDetalhes[]> {
    let allPokemon: PokemonResumo[];

    if (type) {

      const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const typeData = await typeRes.json();
      allPokemon = typeData.pokemon.map((p: any) => p.pokemon);
    } else {

      const countRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
      const totalPokemon = (await countRes.json()).count;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${totalPokemon}`
      );
      const data = await response.json();
      allPokemon = data.results;
    }

    const random = shuffle(allPokemon).slice(0, qtd);

    return Promise.all(
      random.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const infor = await res.json();
        return {
          nome:
            infor.name.charAt(0).toUpperCase() + infor.name.slice(1),
          tipo: infor.types.map((t: PokemonTypeSlot) => t.type.name),
          imagem:
            infor.sprites.other?.["official-artwork"]?.front_default ||
            infor.sprites.front_default,
        };
      })
    );
  }


  useEffect(() => {
    async function loadPokemons() {
      setLoading(true);
      try {
        const firstBatch = await fetchRandomPokemons(10, typeFilter);
        const secondBatch = await fetchRandomPokemons(10, typeFilter); // extras
        setPokemons(firstBatch);
        setExtraPokemons(secondBatch);
      } catch {
        setError("Erro ao carregar os Pokémons 😢");
      } finally {
        setLoading(false);
      }
    }
    loadPokemons();
  }, [typeFilter]);

  return (
    <PokeList $bg={theme.background}>
      <Title>Sua Lista de Pokemons</Title>

      <Select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
        <option value="rock">Rock</option>
        <option value="ground">Ground</option>
        <option value="bug">Bug</option>
        <option value="poison">Poison</option>
        <option value="dragon">Dragon</option>
        <option value="fairy">Fairy</option>
        <option value="flying">Flying</option>
        <option value="ice">Ice</option>
        <option value="ghost">Ghost</option>
        <option value="fighting">Fighting</option>
        <option value="dark">Dark</option>
        <option value="steel">Steel</option>
        <option value="normal">Normal</option>
      </Select>

      {loading && <p>Carregando Pokémons...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Lista>
        {[...pokemons, ...(showExtra ? extraPokemons : [])].map((p) => (
          <li
            key={p.nome}
            style={{ marginBottom: "20px", listStyle: "none" }}
          >
            <Link
              to={`/pokemon/${p.nome.toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={p.imagem} alt={p.nome} width={120} />
              <Name>{p.nome}</Name>
              <p
                style={{
                  color: "gray",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {p.tipo.join(", ")}
              </p>
            </Link>
          </li>
        ))}
      </Lista>
    </PokeList>
  );
};

export { List };
