import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormFields } from '../../types';
import './ReactHookForm.css';

const ReactHookForm = () => {
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async () => {
    reset();
    navigate('/');
  };

  return (
    <form id="form-container" onSubmit={handleSubmit(onSubmit)}>
      <input id="rhf-name" type="text" placeholder="Name" {...register('name')} />
      <input id="rhf-age" type="text" placeholder="Age" {...register('age')} />
      <input id="rhf-email" type="text" placeholder="Email" {...register('email')} />
      <input id="rhf-password" type="text" placeholder="Password" {...register('password')} />
      <input
        id="rhf-password_copy"
        type="text"
        placeholder="Confirm password"
        {...register('password_copy')}
      />
      <select id="rhf-gender" {...register('gender')}>
        <option value="" selected disabled hidden>
          Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select id="rhf-country" {...register('country')}>
        <option value="" selected disabled hidden>
          Country
        </option>
        <option value="nocountry">No country</option>
      </select>
      <input id="rhf-image" type="file" {...register('image')} />
      <div>
        <span>Accept terms and conditions</span>
        <input id="rhf-terms" type="checkbox" {...register('terms')} />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default ReactHookForm;
