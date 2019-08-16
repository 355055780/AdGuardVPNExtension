import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import popupActions from '../../../actions/popupActions';
import rootStore from '../../../stores';


const SignInForm = observer(() => {
    const { authStore } = useContext(rootStore);

    const submitHandler = async (e) => {
        e.preventDefault();
        await authStore.authenticate();
    };

    const inputChangeHandler = (e) => {
        const { target: { name, value } } = e;
        authStore.onCredentialsChange(name, value);
    };

    const handleRegisterClick = () => {
        authStore.showRegistration('register');
    };

    return (
        <form
            className="form"
            onSubmit={submitHandler}
        >
            {authStore.error
            && (
                <div className="form__item-error">
                    {authStore.errorDescription}
                </div>
            )}
            <div className="form__item">
                <label className="form__label" htmlFor="username">
                    Email:
                </label>
                <input
                    id="username"
                    className="form__input"
                    type="text"
                    name="username"
                    placeholder="example@mail.com"
                    value={authStore.credentials.username}
                    onChange={inputChangeHandler}
                />
            </div>
            <div className="form__item">
                <div className="form__item-header">
                    <label className="form__label" htmlFor="password">
                        Password:
                    </label>
                    <button
                        type="button"
                        className="form__inline-btn button button--inline button--inline-green"
                        onClick={popupActions.openRecovery}
                    >
                        Lost the password?
                    </button>
                </div>
                <input
                    id="password"
                    className="form__input"
                    type="password"
                    name="password"
                    onChange={inputChangeHandler}
                    value={authStore.credentials.password}
                />
            </div>
            {authStore.need2fa && (
                <div className="form__item">
                    <label className="form__label" htmlFor="twoFA">
                        Enter 2fa code
                    </label>
                    <input
                        id="twoFA"
                        className="form__input"
                        type="text"
                        name="twoFA"
                        value={authStore.credentials.twoFA}
                        onChange={inputChangeHandler}
                    />
                </div>
            )}
            <div className="form__btns">
                <button
                    className="form__btn button button--m button--hundred button--green"
                    type="submit"
                >
                    Login
                </button>
                <button
                    className="form__btn form__btn--reg button button--inline button--inline-green"
                    type="button"
                    onClick={handleRegisterClick}
                >
                    Register
                </button>
            </div>
        </form>
    );
});

export default SignInForm;
