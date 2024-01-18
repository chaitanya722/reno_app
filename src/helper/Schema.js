import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  Email: yup.string().required('Email is required'),
  Password: yup
    .string().required('Password is required')
   
});

export const OTPValidationSchema = yup.object().shape({
  Otp: yup.string().required('OTP is required'),
});

export const signUpValidationSchema = yup.object().shape({
  Name: yup.string().required('Name is required'),

  PhoneNumber: yup
    .string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
  Email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),

  Password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(9, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),

});

export const ChangePasswordValidationSchema = yup.object().shape({
  // oldPassword: yup
  //   .string()
  //   .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
  //   .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
  //   .matches(/\d/, 'Password must have a number')
  //   .matches(
  //     /[!@#$%^&*()\-_"=+{}; :,<.>]/,
  //     'Password must have a special character',
  //   )
  //   .min(9, ({min}) => `Password must be at least ${min} characters`)
  //   .required('Old Password is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(9, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

export const UpdatePasswordValidationSchema = yup.object().shape({
  otp: yup.string().min(6).max(6).required('OTP is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(9, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

export const ForgotPasswordValidationSchema = yup.object().shape({
  Email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
});

export const ResetPasswordValidationSchema = yup.object().shape({
  Otp: yup.string().min(6).max(6).required('OTP is required'),
  Password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(9, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref('Password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

export const ContactUsValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  firstName: yup.string().required('First name is required'),
  message: yup.string().required('Message is required'),
});

export const updateProfileSchema = yup.object().shape({
  FirstName: yup.string().required(' First name is required'),
  LastName: yup.string().required(' Last name is required'),
  Email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  PhoneNumber: yup
    .string()
    // .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
    .required('Phone number is required'),
  // Password: yup
  //   .string()
  //   .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
  //   .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
  //   .matches(/\d/, 'Password must have a number')
  //   .matches(
  //     /[!@#$%^&*()\-_"=+{}; :,<.>]/,
  //     'Password must have a special character',
  //   )
  //   .min(9, ({min}) => `Password must be at least ${min} characters`)
  //   .required('Password is required'),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref('password')], 'Passwords do not match')
  //   .required('Confirm password is required'),
});
