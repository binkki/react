import { NavLink } from 'react-router-dom';
import ReactHookForm from '../../components/ReactHookForm/ReactHookForm';

const ReactHookFormPage = () => {
  return (
    <div>
      <NavLink to="/">Main Page</NavLink>
      <ReactHookForm />
    </div>
  );
};

export default ReactHookFormPage;
