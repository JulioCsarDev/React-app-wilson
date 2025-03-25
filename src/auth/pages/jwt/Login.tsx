import { type MouseEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { KeenIcon } from '@/components';
import { useAuthContext } from '@/auth';
import { useLayout } from '@/providers';
import Swal from 'sweetalert2';
import '../../../../public/css/style.login.css';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Username is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  remember: Yup.boolean()
});

const initialValues = {
  username: '',
  password: '',
  remember: false
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);
  const { currentLayout } = useLayout();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        if (!login) {
          throw new Error('JWTProvider is required for this form.');
        }
        await login(values.username, values.password);
        if (values.remember) {
          localStorage.setItem('username', values.username);
        } else {
          localStorage.removeItem('username');
        }
        navigate(from, { replace: true });
      } catch {
        Swal.fire({
          title: 'Ops...',
          text: 'Usuario o Contraseña Incorrectos, Verifique e intente nuevamente.',
          icon: 'error',
          customClass: {
            popup: 'max-w-md p-4 bg-white rounded-lg shadow-xl',
            title: 'text-xl font-bold text-gray-800',
            confirmButton: 'btn btn-primary text-sm'
          },
          didOpen: () => {
            document.body.classList.remove('swal2-shown', 'swal2-height-auto');
          }
        });
        setSubmitting(false);
      }
      setLoading(false);
    }
  });

  const togglePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="log">
      <form
        className="form login"
        id="myform"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <h1 className="log_text1">Inicia sesión</h1>
        <a className="log_text2">Ingresa tu usuario y contraseña</a>

        <div>
          <label htmlFor="email">Usuario</label>
          <label className="input form-control">
            <input
              placeholder="Usuario"
              autoComplete="off"
              id="email"
              {...formik.getFieldProps('username')}
              className={clsx({
                'is-invalid': formik.touched.username && formik.errors.username
              })}
            />
          </label>
          {formik.touched.username && formik.errors.username && (
            <span role="alert" className="text-danger text-sm mt-1">
              {formik.errors.username}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <label className="input form-control">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              autoComplete="off"
              id="password"
              {...formik.getFieldProps('password')}
              className={clsx({
                'is-invalid': formik.touched.password && formik.errors.password
              })}
            />
            <button className="btn btn-icon" onClick={togglePassword}>
              <KeenIcon icon="eye" className={clsx('!text-white hover:!text-gray-400', { hidden: showPassword })} />
              <KeenIcon
                icon="eye-slash"
                className={clsx('!text-white hover:!text-gray-400', { hidden: !showPassword })}
              />
            </button>
          </label>
          {formik.touched.password && formik.errors.password && (
            <span role="alert" className="text-danger text-sm mt-1">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="boton rounded"
          disabled={loading || formik.isSubmitting}
        >
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export { Login };
