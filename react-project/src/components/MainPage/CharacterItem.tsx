import { useLocation, useNavigate } from 'react-router-dom';
import { Character } from '../../types';
import { getCharacterIdFromUrl, getCharacterImageUrl, getPageIdFromPath } from '../../utils/utils';

type CharacterProps = {
  character: Character;
};

const CharacterItem = (props: CharacterProps) => {
  const { character } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const openDetails = () => {
    const currentPage = Number(getPageIdFromPath(location.pathname));
    const currentCharacter = getCharacterIdFromUrl(character.url);
    navigate(`/${currentPage}/${currentCharacter}`);
  };

  return (
    <div className="character-item clickable flex" onClick={openDetails}>
      <img src={getCharacterImageUrl(character.url)} className="character-image" />
      <span>{character.name}</span>
    </div>
  );
};

export default CharacterItem;
