import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index.tsx';
import { addUncontrolledResult } from '../../store/slices/appSlice.tsx';
import { convertImage } from '../../utils/utils.tsx';

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

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (imageRef?.current?.files) {
      const convertedImage = await convertImage(imageRef?.current?.files[0]);
      const result = {
        name: nameRef?.current?.value ?? '',
        age: ageRef?.current?.value ?? 0,
        email: emailRef?.current?.value ?? '',
        password: passwordRef?.current?.value ?? '',
        password_copy: passwordCopyRef?.current?.value ?? '',
        country: countryRef?.current?.value ?? '',
        gender: genderRef?.current?.value ?? '',
        terms: termsRef?.current?.checked ?? false,
        image: convertedImage,
      };
      dispatch(addUncontrolledResult(result));
      navigate('/');
    }
  };

  return (
    <>
      <div>Uncontrolled Form</div>
      <form id="form-container" onSubmit={(e: FormEvent) => submit(e)}>
        <input id="name" type="text" placeholder="Name" ref={nameRef} />
        <input id="age" type="number" placeholder="Age" ref={ageRef} />
        <input id="email" type="text" placeholder="Email" ref={emailRef} />
        <input id="password" type="password" placeholder="Password" ref={passwordRef} />
        <input
          id="password_copy"
          type="password"
          placeholder="Confirm password"
          ref={passwordCopyRef}
        />
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
        <div>
          <span>Accept terms and conditions</span>
          <input id="terms" type="checkbox" ref={termsRef} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledForm;
