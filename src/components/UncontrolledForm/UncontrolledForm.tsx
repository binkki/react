import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCopyRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/');
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
          <option value="nocountry">No country</option>
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
