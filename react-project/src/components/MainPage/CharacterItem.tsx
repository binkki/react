import { useLocation, useNavigate } from 'react-router-dom';
import { Character } from '../../types';
import { getCharacterIdFromUrl, getCharacterImageUrl, getPageIdFromPath } from '../../utils/utils';
import { useEffect, useState } from 'react';

type CharacterProps = {
  character: Character;
};

const CharacterItem = (props: CharacterProps) => {
  const { character } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [url, setUrl] = useState('');

  useEffect(() => {
    const characterUrl = getCharacterImageUrl(character.url);
    setUrl(characterUrl);
  }, []);

  const openDetails = () => {
    const currentPage = Number(getPageIdFromPath(location.pathname));
    const currentCharacter = getCharacterIdFromUrl(character.url);
    navigate(`/${currentPage}/${currentCharacter}`);
  };

  return (
    <div className="character-item clickable flex" onClick={openDetails}>
      <img src={url} className="character-image" />
      <span>{character.name}</span>
    </div>
  );
};

export default CharacterItem;
