import React, { useState } from 'react';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/presentation/hooks/useAuth';
import styles from './Login.module.css';

const Login = (): React.JSX.Element => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isLoginSuccessful = login({ email, password });

    if (!isLoginSuccessful) {
      setErrorMessage('Credenciales invalidas. Usa demo@budget.com / 123456');
      return;
    }

    setErrorMessage('');
    navigate('/', { replace: true });
  };

  const handleUseDemoCredentials = () => {
    setEmail('demo@budget.com');
    setPassword('123456');
    setErrorMessage('');
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* Header con branding */}
        <header className={styles.header}>
          <h1 className={styles.brandTitle}>Tranzak</h1>
          <p className={styles.subtitle}>Gestiona tus finanzas en Venezuela</p>
        </header>

        {/* Formulario principal */}
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor='email' className={styles.label}>
                Correo electronico
              </label>
              <div className={styles.inputWrapper}>
                <EnvelopeIcon className={styles.leadingIcon} />
                <input
                  id='email'
                  type='email'
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete='email'
                  placeholder='tu@correo.com'
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor='password' className={styles.label}>
                Contrasena
              </label>
              <div className={styles.inputWrapper}>
                <LockClosedIcon className={styles.leadingIcon} />
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete='current-password'
                  placeholder='Ingresa tu contrasena'
                  className={`${styles.input} ${styles.passwordInput}`}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={styles.toggleButton}
                  aria-label={
                    showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'
                  }
                >
                  {showPassword ? (
                    <EyeSlashIcon className='h-5 w-5' />
                  ) : (
                    <EyeIcon className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p role='alert' className={styles.alert}>
                {errorMessage}
              </p>
            )}

            <button type='submit' className={styles.submitButton}>
              Iniciar sesion
            </button>

            <Link to='/forgot-password' className={styles.forgotLink}>
              ¿Olvidaste tu contraseña?
            </Link>
          </form>

          {/* Separador */}
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>O inicia sesión con</span>
            <span className={styles.dividerLine} />
          </div>

          {/* Alternativas de inicio de sesion */}
          <div className={styles.socialButtons}>
            <button
              type='button'
              className={styles.socialButton}
              onClick={handleUseDemoCredentials}
            >
              <svg className='h-5 w-5' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fill='currentColor'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='currentColor'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='currentColor'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='currentColor'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              <span>Google</span>
            </button>

            <button type='button' className={styles.socialButton}>
              <svg className='h-5 w-5' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fill='currentColor'
                  d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z'
                />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Demo credentials */}
          <div className={styles.demoHint} onClick={handleUseDemoCredentials}>
            <p className={styles.demoText}>
              Modo demo:{' '}
              <span className={styles.demoCredentials}>
                demo@budget.com / 123456
              </span>
            </p>
          </div>
        </div>

        {/* Footer con registro */}
        <footer className={styles.footer}>
          <p className={styles.registerText}>
            No tienes una cuenta?{' '}
            <Link to='/register' className={styles.registerLink}>
              Registrate gratis
            </Link>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Login;
