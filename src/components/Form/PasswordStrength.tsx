import { useEffect, useState } from 'react';
import { PassStrengthEnum } from '../../types';
import { getPasswordStrength } from '../../utils/utils';

type PasswordProps = {
  password: string;
};

const PasswordStrength = (props: PasswordProps) => {
  const { password } = props;
  const [strength, setStrength] = useState<PassStrengthEnum>(PassStrengthEnum.NONE);

  useEffect(() => {
    const currentStrength = getPasswordStrength(password);
    if (currentStrength === 4) {
      setStrength(PassStrengthEnum.STRONG);
    } else if (currentStrength > 1) {
      setStrength(PassStrengthEnum.MID);
    } else if (currentStrength === 1) {
      setStrength(PassStrengthEnum.LOW);
    } else {
      setStrength(PassStrengthEnum.NONE);
    }
  }, [password]);

  return <button className={strength} />;
};

export default PasswordStrength;
