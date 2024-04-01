type FormValuesType = {
  confirmPassword: string;
} & IUserSchema;

interface ITextField {
  name: string;
  control?: Control<FieldValues>;
  placeholder?: string;
}
