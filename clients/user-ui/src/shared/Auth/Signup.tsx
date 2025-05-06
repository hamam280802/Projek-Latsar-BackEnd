import styles from '@/src/utils/style'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {FcGoogle} from "react-icons/fc";
import { useState } from 'react';

const formSchema = z.object({
    name: z.string().min(3, {message: 'Tuliskan nama minimal 3 karakter'}),
    email: z.string().email({ message: 'Email tidak valid' }),
    password: z.string().min(8, { message: 'Password minimal 8 karakter' }),
    passwordConfirm: z.string().min(8, {message: 'Passwor minimal 8 karakter'}),
    phone: z.number().min(12, {message: 'Nomor Telepon minimal 12 angka'}),
  })
  
  type SignUpSchema = z.infer<typeof formSchema>;

const Signup = ({setActiveState}:{setActiveState: (e: string) => void;}) => {

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SignUpSchema>({
        resolver: zodResolver(formSchema),
      });

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    
      const onSubmit = (data: SignUpSchema) => {
        console.log(data);
        reset();
      }

  return (
    <div className='py-2 px-4 space-y-5'>
      <h1 className={`${styles.title}`}>
        Silahkan Daftar!!
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full relative mb-3'>
            <label className={`${styles.label}`}>
            Masukkan namamu
            </label>
            <input {...register("name")} type="text" placeholder='Marc Spector' className={`${styles.input}`} />
            {
            errors.name && (
                <span className='text-red-500 block mt-1'>
                {`${errors.name.message}`}
                </span>
            )
            }
        </div>
        <div className='w-full relative mb-3'>
            <label className={`${styles.label}`}>
            Masukkan emailmu
            </label>
            <input {...register("email")} type="email" placeholder='muaraenim@gmail.com' className={`${styles.input}`} />
            {
            errors.email && (
                <span className='text-red-500 block mt-1'>
                {`${errors.email.message}`}
                </span>
            )
            }
        </div>
        <div>
            <label className={`${styles.label}`}>
            Masukkan nomor teleponmu
            </label>
            <input {...register("phone")} type="number" placeholder='+62537.....' className={`${styles.input}`} />
            {
            errors.phone && (
                <span className='text-red-500 block mt-1'>
                {`${errors.phone.message}`}
                </span>
            )
            }
        </div>
        <div className='w-full mt-5 relative mb-1'>
          <label htmlFor="password" className={`${styles.label}`}>
            Masukkan Passwordmu
          </label>
          <input {...register("password")} type={!show ? 'password' : 'text'} placeholder='qwerty12345' className={`${styles.input}`} />
          {
            errors.password && (
              <span className='text-red-500'>
                {`${errors.password.message}`}
              </span>
            )
          }
          {!show ? (
            <AiOutlineEyeInvisible
             className='absolute bottom-3 right-2 z-1 cursor-pointer'
             size={20}
             onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
             className='absolute bottom-3 right-2 z-1 cursor-pointer'
             size={20}
             onClick={() => setShow(false)}
            />
          )}
        </div>
        <div className='w-full mt-5 relative mb-1'>
          <label htmlFor="password" className={`${styles.label}`}>
            Konfirmasi Passwordmu
          </label>
          <input {...register("passwordConfirm")} type={!show2 ? 'password' : 'text'} placeholder='qwerty12345' className={`${styles.input}`} />
          {
            errors.passwordConfirm && (
              <span className='text-red-500 block mt-1'>
                {`${errors.passwordConfirm.message}`}
              </span>
            )
          }
          {!show2 ? (
            <AiOutlineEyeInvisible
             className='absolute bottom-3 right-2 z-1 cursor-pointer'
             size={20}
             onClick={() => setShow2(true)}
            />
          ) : (
            <AiOutlineEye
             className='absolute bottom-3 right-2 z-1 cursor-pointer'
             size={20}
             onClick={() => setShow2(false)}
            />
          )}
        </div>
        <div className='w-full mt-5'>
          <input type="submit" value="Daftar" disabled={isSubmitting} className={`${styles.button} my-2`} />
        </div>
        <h5 className='text-center pt-2 font-Poppins text-[14px]'>
          Sudah punya akun?
          <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setActiveState('Login')}>Masuk</span>
        </h5>
        <br />
      </form>
    </div>
  )
}

export default Signup