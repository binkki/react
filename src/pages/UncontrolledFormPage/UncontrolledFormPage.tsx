import { NavLink } from 'react-router-dom';
import UncontrolledForm from '../../components/UncontrolledForm/UncontrolledForm';

const UncontrolledFormPage = () => {
  return (
    <div>
      <UncontrolledForm />
      <NavLink to="/" className="link">
        Go to Main Page
      </NavLink>
    </div>
  );
};

export default UncontrolledFormPage;
