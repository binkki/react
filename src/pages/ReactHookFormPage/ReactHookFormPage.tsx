import { NavLink } from 'react-router-dom';
import ReactHookForm from '../../components/ReactHookForm/ReactHookForm';

const ReactHookFormPage = () => {
  return (
    <div>
      <ReactHookForm />
      <NavLink to="/" className="link">
        Go to Main Page
      </NavLink>
    </div>
  );
};

export default ReactHookFormPage;
