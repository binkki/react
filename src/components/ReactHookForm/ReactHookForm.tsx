import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormFields } from '../../types';
import { RootState } from '../../store/index.tsx';
import {
  addReactHookFormResult,
  setPassword,
  setPasswordCopy,
} from '../../store/slices/appSlice.tsx';
import { convertImage } from '../../utils/utils.tsx';
import { schema } from '../../utils/validation.tsx';
import PasswordStrength from '../Form/PasswordStrength.tsx';
import { ChangeEvent, useEffect } from 'react';

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: yupResolver<FormFields>(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.app.countries);
  const password = useSelector((state: RootState) => state.app.password);
  const password_copy = useSelector((state: RootState) => state.app.password_copy);

  useEffect(() => {
    dispatch(setPassword(''));
    dispatch(setPasswordCopy(''));
  }, []);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const convertedImage = await convertImage(data.image[0]);
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

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword((e.target as HTMLInputElement).value));
  };

  const changePasswordCopy = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPasswordCopy((e.target as HTMLInputElement).value));
  };

  return (
    <>
      <div>React Hook Form</div>
      <form id="form-container" onSubmit={handleSubmit(onSubmit)}>
        <input id="rhf-name" type="text" placeholder="Name" {...register('name')} />
        {errors.name && <span className="error">{errors.name.message}</span>}
        <input id="rhf-age" type="number" placeholder="Age" {...register('age')} />
        {errors.age && <span className="error">{errors.age.message}</span>}
        <input id="rhf-email" type="email" placeholder="Email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <input
          id="rhf-password"
          type="password"
          placeholder="Password"
          {...register('password')}
          onChange={(e) => changePassword(e)}
        />
        <PasswordStrength password={password} />
        {errors.password && <span className="error">{errors.password.message}</span>}
        <input
          id="rhf-password_copy"
          type="password"
          placeholder="Confirm password"
          {...register('password_copy')}
          onChange={(e) => changePasswordCopy(e)}
        />
        <PasswordStrength password={password_copy} />
        {errors.password_copy && <span className="error">{errors.password_copy.message}</span>}
        <select id="rhf-gender" {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="text" id="country" list="countryList" {...register('country')} />
        <datalist id="countryList">
          {countries.map((optionCountry: string, _) => (
            <option key={_} value={optionCountry}>
              {optionCountry}
            </option>
          ))}
        </datalist>
        {errors.country && <span className="error">{errors.country.message}</span>}
        <input id="rhf-image" type="file" {...register('image')} />
        {errors.image && <span className="error">{errors.image.message}</span>}
        <div>
          <span>Accept terms and conditions</span>
          <input id="rhf-terms" type="checkbox" {...register('terms')} />
        </div>
        {errors.terms && <span className="error">{errors.terms.message}</span>}
        <button>Submit</button>
      </form>
    </>
  );
};

export default ReactHookForm;
