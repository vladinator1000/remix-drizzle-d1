import { ActionFunctionArgs, json, redirect } from '@remix-run/cloudflare'
import { users } from '../db/schema'
import { parseSignupData } from '../features/user/validateUser'
import { useActionData } from '@remix-run/react'

export default function Signup() {
  const actionData = useActionData<typeof action>()

  return (
    <form
      method="post"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        maxWidth: 300,
      }}
    >
      <h1>Signup</h1>
      <input name="name" placeholder="name" />
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <input type="submit" value="Sign up" />

      {actionData?.error && (
        <p style={{ color: 'red' }}>
          {JSON.stringify(actionData.error, null, 2)}
        </p>
      )}
    </form>
  )
}

export async function action(arg: ActionFunctionArgs) {
  const formData = await arg.request.formData()
  const entries = Object.fromEntries(formData)

  try {
    const data = parseSignupData(entries)
    await arg.context.db.insert(users).values(data)

    return redirect('/')
  } catch (error) {
    return json({ error: error.issues })
  }
}
