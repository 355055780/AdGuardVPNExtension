import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import './header.pcss';
import rootStore from '../../stores';

const Header = observer(({ authenticated }) => {
    const { uiStore } = useContext(rootStore);
    uiStore.openOptionsModal(true);

    return (
        <div className="header">
            <div className="header__title">
                <div className="header__logo" />
                <div className="header__text">
                    <span className="header__text-mark">AdGuard</span>
                        VPN
                </div>
            </div>
            {authenticated && (
                <button
                    className="button header__setting"
                    role="button"
                    tabIndex="0"
                    onClick={uiStore.openOptionsModal(true)}
                />
            )}
        </div>
    );
});

Header.defaultProps = {
    authenticated: false,
};

export default Header;
