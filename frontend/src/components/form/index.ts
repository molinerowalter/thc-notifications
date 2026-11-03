import { FormContainer } from './Form';
import { FormTitle } from './FormTitle';
import { FormFields } from './FormFields';

export const Form = Object.assign(FormContainer, {
    Title: FormTitle,
    Fields: FormFields,
});

export default Form;