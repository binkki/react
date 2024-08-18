import { NavLink } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="main-wrapper">
      <NavLink to="uncontrolled-form">Uncontrolled Form Page</NavLink>
      <NavLink to="react-hook-form">React Hook Form Page</NavLink>
    </div>
  );
};

export default MainPage;
