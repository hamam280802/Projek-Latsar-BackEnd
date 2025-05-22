import { FORGOT_PASSWORD } from '@/src/graphql/actions/forgot-password.action';
import styles from '@/src/utils/style';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
    email: z.string().email({ message: 'Email tidak valid' }),
});

type ForgotPasswordSchema = z.infer<typeof formSchema>;

const ForgotPassword = ({setActiveState}:{setActiveState: (e: string) => void;}) => {
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      const response = await forgotPassword({
        variables: data,
      });
      toast.success('Silahkan aktivasi akun anda melalui email!');
      reset();
      setActiveState('Login');
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='py-2 px-4 space-y-5'>
        <h1 className={`${styles.title}`}>
          Ayo kelola akun mu!!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className='text-[16px] font-Poppins'>Masukkan emailmu</label>
            <input {...register("email")} type="email" placeholder="Email" className={`${styles.input}`}/>
            {
                errors.email && (
                    <span className='tetxt-red-500 block mt-1'>
                        {`${errors.email.message}`}
                    </span>
                )
            }
            <br /><br />
            <input type="submit" value="Kirim" disabled={isSubmitting || loading} className={`${styles.button} my-2 text-white`}/>
            <br />
            <h5 className='text-center pt-4 font-Poppins text-[14px]'>
                Atau kembali ke <span className='text-[#2190ff] cursor-pointer' onClick={() => setActiveState('Login')}>Login</span>
            </h5>
        </form>
    </div>
  )
}

export default ForgotPassword