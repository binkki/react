import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormFields } from '../../types';
import { RootState } from '../../store/index.tsx';

const ReactHookForm = () => {
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.app.countries);

  const onSubmit: SubmitHandler<FormFields> = async () => {
    reset();
    navigate('/');
  };

  return (
    <>
      <div>React Hook Form</div>
      <form id="form-container" onSubmit={handleSubmit(onSubmit)}>
        <input id="rhf-name" type="text" placeholder="Name" {...register('name')} />
        <input id="rhf-age" type="number" placeholder="Age" {...register('age')} />
        <input id="rhf-email" type="password" placeholder="Email" {...register('email')} />
        <input id="rhf-password" type="password" placeholder="Password" {...register('password')} />
        <input
          id="rhf-password_copy"
          type="text"
          placeholder="Confirm password"
          {...register('password_copy')}
        />
        <select id="rhf-gender" {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select id="rhf-country" {...register('country')}>
          {countries.map((optionCountry: string, _) => (
            <option key={_} value={optionCountry}>
              {optionCountry}
            </option>
          ))}
        </select>
        <input id="rhf-image" type="file" {...register('image')} />
        <div>
          <span>Accept terms and conditions</span>
          <input id="rhf-terms" type="checkbox" {...register('terms')} />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default ReactHookForm;
