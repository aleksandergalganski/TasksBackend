// import { NextFunction, Request, Response } from 'express';
// import { check, validationResult } from 'express-validator';

// export const taskValidationRules = () => [
//   check('name', 'Please add a name').notEmpty(),
//   check('type', 'Please add a type').notEmpty()
// ];

// export const userValidationRules = () => [
//   check('email', 'Email is invalid').isEmail(),
//   check('password', 'Password must be at least 8 characters').isLength({
//     min: 8
//   })
// ];

// export const categoryValidationRules = () => [
//   check('name', 'Please add a name').notEmpty()
// ];

// const validate = (req: Request, res: Response, next: NextFunction) => {
//   const errors = validationResult(req);

//   if (errors.isEmpty()) {
//     return next();
//   }

//   const errorMessages = errors
//     .array()
//     .map(err => err.msg)
//     .join(', ');
//   return res.status(400).json({ message: errorMessages });
// };

// export default validate;
