import { Character } from '../../types';

type CharacterProps = {
  character: Character;
};

const CharacterItem = (props: CharacterProps) => {
  const { character } = props;

  return (
    <>
      <div className="character-item">
        <span>Name: {character.name}</span>
        <span>Gender: {character.gender}</span>
        <span>Birth year: {character.birth_year}</span>
        <span>Height: {character.height}</span>
        <span>Mass: {character.mass}</span>
        <span>Eye color: {character.eye_color}</span>
      </div>
    </>
  );
};

export default CharacterItem;
