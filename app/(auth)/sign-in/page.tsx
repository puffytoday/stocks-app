'use client'
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import { Button } from '@/components/ui/button'
import { signInWithEmail } from '@/lib/actions/auth.actions'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const SignIn = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signInWithEmail(data)
      if (response?.success) {
        console.log(response)
        router.push('/')
      }
    } catch (e) {
      console.log('Sign in failed', e)
      toast.error('Sign in failed', { description: e instanceof Error ? e.message : 'Failed to sign in' })
    }
  }

  return (
    <>
      <h1 className="form-title">Log In Your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        <InputField
          label="Email"
          name="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          validation={{
            required: 'Email is required',
            pattern: { value: /^\w+@\w+\.\w+$/, message: 'Invalid email' },
          }}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be atleast 8 characters long',
            },
          }}
        />
        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? 'Signing In' : 'Sign In'}
        </Button>
        <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
      </form>
    </>
  )
}

export default SignIn
