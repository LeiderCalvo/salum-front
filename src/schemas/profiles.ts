import z from "zod";

const dateValidation = z
  .string()
  .refine((date) => !isNaN(Date.parse(date)), {
    message: "Formato de fecha invalido.",
  })
  .transform((date) => new Date(date))
  .refine((date) => date <= new Date(), {
    message: "La fecha no puede ser en el futuro",
  });

const stringValidation = ({ min = 3, max = 50 } = {}) =>
  z.string()
    .min(min, `Mínimo ${min} caracteres.`)
    .max(max, `Máximo ${max} caracteres.`)
    .transform(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()) as unknown as z.ZodString;

const optional = (v: z.ZodString) => v.or(z.literal('')).transform(e => e === "" ? undefined : e)

export const ProfileSchema = z.object({
  first_name: stringValidation(),
  second_name: optional(stringValidation()),
  first_surname: stringValidation(),
  second_surname: optional(stringValidation()),
  gender: z.enum(["female", "male"]),
  phone: stringValidation({ min: 10, max: 10 }),
  email: optional(z.string().email()),
  avatar: z.string().url().nullable().optional(),
  academic_level: z.enum([
    "elementary_school",
    "elementary_school",
    "high_school",
    "technician",
    "technologist",
    "professional",
    "specialist",
    "master",
    "doctorate",
    "none",
  ]),
  marital_status: z.enum([
    "married",
    "single",
    "widow",
    "divorced",
    "accompanied",
  ]),
  nid_number: stringValidation({ min: 5 }),
  nid_type: z.enum(["cc", "ti"]),
  birthday_date: dateValidation,
  birthday_city: stringValidation(),
  birthday_department: stringValidation(),
  birthday_country: stringValidation(),
  occupation_type: z.enum(["working", "nothing", "studying"]),
  occupation_area: optional(stringValidation({ max: 150 })),
  occupation_description: optional(stringValidation({ max: 400 })),
  address_line: stringValidation({ max: 100 }),
  address_neighborhood: stringValidation(),
  address_city: stringValidation(),
  address_department: stringValidation(),
  address_country: stringValidation(),
  promise_date: dateValidation.nullable(),
  baptism_date: dateValidation.nullable(),
  baptism_minister: optional(stringValidation()),
  baptism_church: optional(stringValidation({ max: 100 })),
  baptism_city: optional(stringValidation()),
  baptism_department: optional(stringValidation()),
  baptism_country: optional(stringValidation()),
  status: z.enum(["active", "separated", "sympathizer", "friend"]),
});

export type Profile = z.infer<typeof ProfileSchema>;
