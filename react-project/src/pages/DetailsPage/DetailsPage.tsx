import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Character } from '../../types';
import { getCharacterById } from '../../services/ApiService';
import {
  getCharacterIdFromPath,
  getCharacterImageUrl,
  getPageIdFromPath,
  isValidNumber,
} from '../../utils/utils';
import './DetailsPage.css';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setDetailLoading, setDetailsCharacter } from '../../store/slices/appSlice';
import { DEFAULT_CHARACTER_DETAILS } from '../../utils/constants';

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.app.isDetailsLoading);
  const character = useSelector((state: RootState) => state.app.detailsCharacter);

  useEffect(() => {
    dispatch(setDetailLoading(true));
    if (!isValidNumber(getCharacterIdFromPath(location.pathname))) return navigate('/not-found');
    if (!isValidNumber(getPageIdFromPath(location.pathname))) return navigate('/not-found');
    const characterId = Number(getCharacterIdFromPath(location.pathname));
    getCharacterById(characterId).then((value: Character) => {
      if (value.detail) {
        dispatch(setDetailLoading(false));
        navigate('/not-found');
      }
      dispatch(setDetailsCharacter(value));
      dispatch(setDetailLoading(false));
    });
  }, [location]);

  const close = () => {
    dispatch(setDetailsCharacter(DEFAULT_CHARACTER_DETAILS));
    const currentPage = Number(getPageIdFromPath(location.pathname));
    navigate(`/${currentPage}`);
  };

  return loading ? (
    <div className="details-wrapper flex">
      <Loader />
    </div>
  ) : (
    <div className="details-wrapper flex" data-testid="character-details">
      {character && (
        <>
          <button className="details-button" data-testid="details-close" onClick={close} />
          <span>{character?.name}</span>
          <img src={getCharacterImageUrl(character.url)} className="details-image" />
          <span>Gender: {character?.gender}</span>
          <span>Birth year: {character?.birth_year}</span>
          <span>Height: {character?.height}</span>
          <span>Mass: {character?.mass}</span>
          <span>Eye color: {character?.eye_color}</span>
          <span>Hair color: {character?.hair_color}</span>
          <span>Skin color: {character?.skin_color}</span>
        </>
      )}
    </div>
  );
};

export default DetailsPage;
