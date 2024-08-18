import { NavLink } from 'react-router-dom';
import { FormResultType } from '../../types/index.tsx';
import { useEffect, useState } from 'react';

type FormPreviewProps = {
  formData: FormResultType;
  formType: string;
};

const FormPreview = (props: FormPreviewProps) => {
  const { formData, formType } = props;
  const [formLink, setFormLink] = useState('');

  useEffect(() => {
    setFormLink(formType === 'uncontrolled' ? '/uncontrolled-form' : '/react-hook-form');
  }, []);

  return formData ? (
    <div className="form-preview">
      <div>{formType} form</div>
      <div>Name: {formData.name}</div>
      <div>Age: {formData.age}</div>
      <div>Email: {formData.email}</div>
      <div>Password: {formData.password}</div>
      <div>Confirm Password: {formData.password_copy}</div>
      <div>Gender: {formData.gender}</div>
      <div>Country: {formData.country}</div>
      <div>Terms and Conditions: {formData.terms ? 'accepted' : 'declined'}</div>
      <div>{formData.image && <img src={formData.image} alt="image" className="form-image" />}</div>
      <NavLink to={formLink} className="link">
        Fill another form
      </NavLink>
    </div>
  ) : (
    <div className="form-preview">
      <div>No data found for {formType} form</div>
      <NavLink to={formLink} className="link">
        Fill form
      </NavLink>
    </div>
  );
};

export default FormPreview;
