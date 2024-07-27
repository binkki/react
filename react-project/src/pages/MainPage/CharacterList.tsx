import { useSelector } from 'react-redux';
import CharacterItem from './CharacterItem';
import { Character } from '../../types';
import { EMPTY_DATA } from '../../utils/constants';
import { RootState } from '../../store';

const CharacterList = () => {
  const characters = useSelector((state: RootState) => state.app.characters.results);

  return (
    <div className="characters-flex flex">
      {characters && characters.map((x: Character) => <CharacterItem key={x.name} character={x} />)}
      {!characters || (!characters?.length && <span>{EMPTY_DATA}</span>)}
    </div>
  );
};

export default CharacterList;
