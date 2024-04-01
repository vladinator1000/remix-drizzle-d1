import { email, minLength, object, type Output, parse, string } from 'valibot' // 1.54 kB

const SignupSchema = object({
  name: string(),
  email: string([email()]),
  password: string([minLength(8)]),
})

export type SignupData = Output<typeof SignupSchema>

export function parseSignupData(data: Record<string, unknown>) {
  return parse(SignupSchema, data)
}
