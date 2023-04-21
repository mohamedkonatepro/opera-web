import { set, toPath } from "lodash";
import { Schema, ValidationError } from "yup";

const validateForm = async (schema: Schema, values: any, context?: any) => {
  try {
    await schema.validate(values, { abortEarly: false, context });
    return undefined;
  } catch (e: any) {
    const validationError = e as ValidationError;
    const errors = validationError.inner.reduce((acc: any, item: any) => {
      const path = toPath(item.path);
      set(acc, path, item.message);

      return acc;
    }, {});
    return errors;
  }
};

export default validateForm;
