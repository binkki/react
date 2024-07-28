import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as utils from '../../utils/utils';
import Loader from '../../components/Loader/Loader';
import { useGetCharacterQuery } from '../../store/api/characterApi';
import './DetailsPage.css';

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const characterId = Number(utils.getCharacterIdFromPath(location.pathname));
  const { data, error, isLoading } = useGetCharacterQuery({ id: characterId });

  useEffect(() => {
    if (!utils.isValidNumber(utils.getCharacterIdFromPath(location.pathname)))
      return navigate('/not-found');
    if (!utils.isValidNumber(utils.getPageIdFromPath(location.pathname)))
      return navigate('/not-found');
    if (error) {
      return navigate('/not-found');
    }
  }, [error]);

  const close = () => {
    const currentPage = Number(utils.getPageIdFromPath(location.pathname));
    navigate(`/${currentPage}`);
  };

  return isLoading ? (
    <div className="details-wrapper flex">
      <Loader />
    </div>
  ) : (
    <div className="details-wrapper flex" data-testid="character-details">
      {data && (
        <>
          <button className="details-button" data-testid="details-close" onClick={close} />
          <span>{data?.name}</span>
          <img src={utils.getCharacterImageUrl(data.url)} className="details-image" />
          <span>Gender: {data?.gender}</span>
          <span>Birth year: {data?.birth_year}</span>
          <span>Height: {data?.height}</span>
          <span>Mass: {data?.mass}</span>
          <span>Eye color: {data?.eye_color}</span>
          <span>Hair color: {data?.hair_color}</span>
          <span>Skin color: {data?.skin_color}</span>
        </>
      )}
    </div>
  );
};

export default DetailsPage;
