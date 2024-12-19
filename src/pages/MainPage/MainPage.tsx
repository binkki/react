import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import FormPreview from '../../components/Form/FormPreview';
import './MainPage.css';

const MainPage = () => {
  const uncontrolledFormResults = useSelector(
    (state: RootState) => state.app.uncontrolledFormResults
  );
  const reacthookformResults = useSelector((state: RootState) => state.app.reacthookformResults);

  return (
    <div className="main-wrapper">
      <FormPreview
        formData={uncontrolledFormResults[uncontrolledFormResults.length - 1]}
        formType="uncontrolled"
      />
      <FormPreview
        formData={reacthookformResults[reacthookformResults.length - 1]}
        formType="react hook"
      />
    </div>
  );
};

export default MainPage;
