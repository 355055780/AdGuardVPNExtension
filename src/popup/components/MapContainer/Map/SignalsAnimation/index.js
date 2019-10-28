import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import nanoid from 'nanoid';
import rootStore from '../../../../stores';
import './signals-animation.pcss';
import COLORS from '../colors';

const SignalsAnimation = observer(() => {
    const { settingsStore } = useContext(rootStore);

    const mapSignalStatus = classnames({
        'signals-animation--active': settingsStore.proxyIsEnabling,
    });

    const animationCirclesNumber = 4;

    return (
        <g className={`signals-animation ${mapSignalStatus}`}>
            {
                [...Array(animationCirclesNumber)].map((e, i) => (
                    <circle
                        key={nanoid()}
                        className={`signals-animation__circle-${i}`}
                        cx={0}
                        cy={0}
                        r={0}
                        fill={COLORS.ENABLED_MARKER_02}
                    />
                ))
            }
        </g>
    );
});

export default SignalsAnimation;
