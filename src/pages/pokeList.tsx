import { List } from "../components/pokelist";



const PokeList = ({ showExtra }: { showExtra: boolean }) => {
    
    return <List showExtra={showExtra} />
}

export { PokeList };