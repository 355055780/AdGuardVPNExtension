import { createContext } from 'react';
import { configure } from 'mobx';

import SettingsStore from './settingsStore';
import UiStore from './uiStore';
import AuthStore from './authStore';
import EndpointsStore from './endpointsStore';
import TooltipStore from './tooltipStore';
import VpnInfoStore from './vpnInfoStore';

// Do not allow property change outside of store actions
configure({ enforceActions: 'observed' });

class RootStore {
    constructor() {
        this.settingsStore = new SettingsStore(this);
        this.uiStore = new UiStore(this);
        this.authStore = new AuthStore(this);
        this.endpointsStore = new EndpointsStore(this);
        this.tooltipStore = new TooltipStore(this);
        this.vpnInfoStore = new VpnInfoStore(this);
    }
}

export default createContext(new RootStore());
