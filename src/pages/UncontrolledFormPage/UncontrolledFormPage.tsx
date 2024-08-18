import { NavLink } from 'react-router-dom';
import UncontrolledForm from '../../components/UncontrolledForm/UncontrolledForm';

const UncontrolledFormPage = () => {
  return (
    <div>
      <NavLink to="/">Main Page</NavLink>
      <UncontrolledForm />
    </div>
  );
};

export default UncontrolledFormPage;
