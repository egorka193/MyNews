/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BaseInput } from '@/shared/ui/input/base-input';
import Button from '@/shared/ui/button/button';
import { useUserControllerUpdateMutation, useUserControllerGetMeQuery } from '@/shared/api/generated';
import styles from './profileForm.module.scss';
import { EyeOffIcon } from '@/shared/ui/icons/eye-off-icon';
import { EyeIcon } from '@/shared/ui/icons/eye-icon';

type ProfileFormData = {
  username?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export function ProfileForm() {
  const { data: user, isLoading: userLoading } = useUserControllerGetMeQuery();
  const [updateUser, { isLoading: updateLoading }] = useUserControllerUpdateMutation();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isMainPasswordVisible, setIsMainPasswordVisible] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
    resetField,
  } = useForm<ProfileFormData>({
    defaultValues: {
      username: user?.username || '',
    },
  });

  const handlePasswordChangeClick = () => {
    setIsChangingPassword(true);
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    resetField('currentPassword');
    resetField('newPassword');
    resetField('confirmPassword');
    setIsCurrentPasswordVisible(false);
    setIsNewPasswordVisible(false);
    setIsConfirmPasswordVisible(false);
  };
  
  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
      });
    }
  }, [user, reset]);

  const onSubmitLogin = async (data: ProfileFormData) => {
    try {
      if (data.username && data.username !== user?.username) {
        await updateUser({
          userUpdateRequestDto: { username: data.username },
        }).unwrap();
        
        reset({
          username: data.username,
        });
        
        alert('Логин успешно обновлен!');
      }
      
    } catch (error: any) {
      console.error('Ошибка обновления:', error);
      if (error?.data?.message?.includes('username')) {
        setError('username', { message: 'Пользователь с таким именем уже существует' });
      } else {
        setError('root', { message: error?.data?.message || 'Ошибка обновления' });
      }
    }
  };

  const onSubmitPassword = async (data: ProfileFormData) => {
    try {
      if (!data.currentPassword) {
        setError('currentPassword', { message: 'Введите текущий пароль' });
        return;
      }
      if (!data.newPassword) {
        setError('newPassword', { message: 'Введите новый пароль' });
        return;
      }
      if (data.newPassword !== data.confirmPassword) {
        setError('confirmPassword', { message: 'Пароли не совпадают' });
        return;
      }
      if (data.newPassword.length < 8) {
        setError('newPassword', { message: 'Пароль должен состоять минимум из 8 символов' });
        return;
      }
      
      await updateUser({
        userUpdateRequestDto: {
          passwordData: {
            password: data.currentPassword,
            newPassword: data.newPassword,
          },
        },
      }).unwrap();
      
      reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      setIsChangingPassword(false);
      alert('Пароль успешно изменен!');
      
    } catch (error: any) {
      console.error('Ошибка обновления:', error);
      if (error?.data?.message?.includes('password') || error?.data?.message?.includes('неверный')) {
        setError('currentPassword', { message: 'Неверный текущий пароль' });
      } else {
        setError('root', { message: error?.data?.message || 'Ошибка обновления пароля' });
      }
    }
  };

  const newPassword = watch('newPassword');

  if (userLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (isChangingPassword) {
    return (
      <div className={styles.container}>
        <div className={styles.backButtonContainer}>
          <Button
            type="button"
            variant="ghost"
            size="small"
            onClick={handleCancelPasswordChange}
            className={styles.backButton}
            text="←"
          />
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit(onSubmitPassword)}>
          <div className={styles.section}>
            <h1 className={styles.title}>Смена пароля</h1>
            
            <div className={styles.fields}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Текущий пароль</label>
                <div className={styles.passwordInputWrapper}>
                  <BaseInput
                    type={isCurrentPasswordVisible ? 'text' : 'password'}
                    {...register('currentPassword')}
                    errorMessage={errors.currentPassword?.message}
                    placeholder="Введите текущий пароль"
                    size="small"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)}
                    className={styles.eyeButton}
                  >
                    {isCurrentPasswordVisible ? (
                      <EyeOffIcon width={16} height={16} />
                    ) : (
                      <EyeIcon width={16} height={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Новый пароль</label>
                <div className={styles.passwordInputWrapper}>
                  <BaseInput
                    type={isNewPasswordVisible ? 'text' : 'password'}
                    {...register('newPassword', {
                      minLength: {
                        value: 8,
                        message: 'Пароль должен состоять минимум из 8 символов'
                      }
                    })}
                    errorMessage={errors.newPassword?.message}
                    placeholder="Введите новый пароль"
                    size="small"
                    contentRight={
                      <button
                        type="button"
                        onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                        className={styles.eyeButton}
                      >
                        {isNewPasswordVisible ? (
                          <EyeOffIcon width={16} height={16} />
                        ) : (
                          <EyeIcon width={16} height={16} />
                        )}
                      </button>
                    }
                  />
                </div>
                <div className={styles.passwordHint}>
                  Пароль должен состоять минимум из 8 символов
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Подтвердите новый пароль</label>
                <div className={styles.passwordInputWrapper}>
                <BaseInput
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    validate: value => value === newPassword || 'Пароли не совпадают'
                  })}
                  errorMessage={errors.confirmPassword?.message}
                  placeholder="Введите новый пароль еще раз"
                  size="small"
                  contentRight={
                    <button
                      type="button"
                      onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                      className={styles.eyeButton}
                    >
                      {isConfirmPasswordVisible ? (
                        <EyeOffIcon width={16} height={16} />
                      ) : (
                        <EyeIcon width={16} height={16} />
                      )}
                    </button>
                  }
                />
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Button
                type="submit"
                variant="primary"
                size="small"
                isLoading={updateLoading}
                className={styles.saveButton}
                text="Сохранить"
              />
            </div>
          </div>

          {errors.root && (
            <div className={styles.error}>{errors.root.message}</div>
          )}
        </form>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitLogin)}>
      <div className={styles.section}>
        <div className={styles.header}>
          <h1 className={styles.title}>Личные данные</h1>
        </div>
        
        <h2 className={styles.sectionTitle}>Логин</h2>
        <div className={styles.fields}>
          <BaseInput
            {...register("username")}
            errorMessage={errors.username?.message}
            placeholder="Введите новое имя пользователя"
            size="small"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="small"
          isLoading={updateLoading}
          className={styles.saveButton}
          text="Сохранить"
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Пароль</h2>
        <div className={styles.passwordSection}>
          <div className={styles.passwordInfo}>
            <BaseInput
              type={isMainPasswordVisible ? 'text' : 'password'}
              value="••••••••"
              size="small"
              readOnly
            />
          </div>
          <Button
            type="button"
            size="small"
            onClick={handlePasswordChangeClick}
            className={styles.changeButton}
            text="Изменить"
          />
        </div>
      </div>

      {errors.root && (
        <div className={styles.error}>{errors.root.message}</div>
      )}
    </form>
  );
}