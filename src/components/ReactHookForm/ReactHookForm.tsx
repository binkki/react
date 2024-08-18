import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormFields } from '../../types';
import { RootState } from '../../store/index.tsx';
import { addReactHookFormResult } from '../../store/slices/appSlice.tsx';
import { convertImage } from '../../utils/utils.tsx';

const ReactHookForm = () => {
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.app.countries);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const convertedImage = convertImage(data.image[0]);
    const result = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      password_copy: data.password_copy,
      country: data.country,
      gender: data.gender,
      terms: data.terms,
      image: convertedImage,
    };
    dispatch(addReactHookFormResult(result));
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
