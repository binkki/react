import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index.tsx';
import { addUncontrolledResult } from '../../store/slices/appSlice.tsx';
import { convertImage } from '../../utils/utils.tsx';
import { FormErrors } from '../../types/index.tsx';
import { getYupErrors, schema } from '../../utils/validation.tsx';
import { ValidationError } from 'yup';

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCopyRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countries = useSelector((state: RootState) => state.app.countries);
  const [errors, setErrors] = useState<FormErrors>({});

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const result = {
      name: nameRef?.current?.value ?? '',
      age: Number(ageRef?.current?.value),
      email: emailRef?.current?.value ?? '',
      password: passwordRef?.current?.value ?? '',
      password_copy: passwordCopyRef?.current?.value ?? '',
      terms: termsRef?.current?.checked ?? false,
      country: countryRef?.current?.value ?? '',
      gender: genderRef?.current?.value ?? '',
      image: imageRef.current?.files,
    };

    try {
      await schema.validate(result, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = getYupErrors(error);
        setErrors(errors);
        return;
      }
    }

    let convertedImage;
    if (imageRef.current?.files?.[0]) {
      convertedImage = await convertImage(imageRef.current?.files?.[0]);
    }

    dispatch(
      addUncontrolledResult({
        ...result,
        image: convertedImage,
      })
    );
    navigate('/');
  };

  return (
    <>
      <div>Uncontrolled Form</div>
      <form id="form-container" onSubmit={(e: FormEvent) => submit(e)}>
        <input id="name" type="text" placeholder="Name" ref={nameRef} />
        {errors.name && <span className="error">{errors.name}</span>}
        <input id="age" type="number" placeholder="Age" ref={ageRef} />
        {errors.age && <span className="error">{errors.age}</span>}
        <input id="email" type="text" placeholder="Email" ref={emailRef} />
        {errors.email && <span className="error">{errors.email}</span>}
        <input id="password" type="password" placeholder="Password" ref={passwordRef} />
        {errors.password && <span className="error">{errors.password}</span>}
        <input
          id="password_copy"
          type="password"
          placeholder="Confirm password"
          ref={passwordCopyRef}
        />
        {errors.password_copy && <span className="error">{errors.password_copy}</span>}
        <select id="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select id="country" ref={countryRef}>
          {countries.map((optionCountry: string, _) => (
            <option key={_} value={optionCountry}>
              {optionCountry}
            </option>
          ))}
        </select>
        <input id="image" type="file" ref={imageRef} />
        {errors.image && <span className="error">{errors.image}</span>}
        <div>
          <span>Accept terms and conditions</span>
          <input id="terms" type="checkbox" ref={termsRef} />
        </div>
        {errors.terms && <span className="error">{errors.terms}</span>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledForm;
