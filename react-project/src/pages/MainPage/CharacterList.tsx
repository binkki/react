import { useSelector } from 'react-redux';
import { Character } from '../../types';
import { EMPTY_DATA } from '../../utils/constants';
import { RootState } from '../../store';
import CharacterItem from './CharacterItem';

const CharacterList = () => {
  const characters = useSelector((state: RootState) => state.app.characters);

  return (
    <div className="characters-flex flex">
      {characters?.results &&
        characters.results.map((x: Character) => <CharacterItem key={x.name} character={x} />)}
      {!characters?.results || (!characters.results?.length && <span>{EMPTY_DATA}</span>)}
    </div>
  );
};

export default CharacterList;
