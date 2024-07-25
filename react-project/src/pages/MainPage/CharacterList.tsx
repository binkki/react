import { Character } from '../../types';
import { EMPTY_DATA } from '../../utils/constants';
import CharacterItem from './CharacterItem';

type CharacterListProps = {
  characters: Character[];
};

const CharacterList = (props: CharacterListProps) => {
  const { characters } = props;

  return (
    <div className="characters-flex flex">
      {characters && characters.map((x: Character) => <CharacterItem key={x.name} character={x} />)}
      {!characters || (!characters?.length && <span>{EMPTY_DATA}</span>)}
    </div>
  );
};

export default CharacterList;
