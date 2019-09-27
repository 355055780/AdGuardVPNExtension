import React, { useContext, useEffect } from 'react';
import {
    ComposableMap,
    ZoomableGlobe,
    Geographies,
    Geography,
} from 'react-simple-maps';
import { observer } from 'mobx-react';
import renderCityMarkers from './renderCityMarkers';
import Tooltip from '../Tooltip';
import jsonMap from './110m.json';
import rootStore from '../../../stores';
import './map.pcss';

const Map = observer((props) => {
    const { vpnStore, tooltipStore } = useContext(rootStore);

    useEffect(() => {
        (() => {
            vpnStore.getEndpoints();
        })();
    }, []);

    const onMarkerClick = (e) => {
        tooltipStore.openTooltip(e);
    };

    const onGlobeMoveStart = () => {
        tooltipStore.closeTooltip();
    };

    const onGlobeMoveEnd = (coordinates) => {
        tooltipStore.setMapCoordinates(coordinates);
    };

    const { globalProxyEnabled } = props;
    const mapStyles = {
        width: '500px',
        position: 'absolute',
        margin: '0 auto',
        display: 'block',
        height: 'auto',
        backgroundColor: globalProxyEnabled ? '#C5F0FF' : '#E5E5E5',
    };

    const geographyStyleDef = {
        fill: globalProxyEnabled ? '#F0FFF3' : '#F9F9F9',
        stroke: '#BABABA',
        strokeWidth: 0.5,
        outline: 'none',
    };

    const { endpoints, selectedEndpoint } = vpnStore;

    const determineCenter = (vpnStore, tooltipStore) => {
        const { selectedEndpoint } = vpnStore;
        if (tooltipStore.isTooltipOpen) {
            const { coordinates: [x, y] } = tooltipStore.tooltipContent;
            return [x, y + 3];
        }
        if (!tooltipStore.hasDefaultMapCoordinates) {
            return tooltipStore.mapCoordinates;
        }
        return (selectedEndpoint && selectedEndpoint.coordinates) || [0, 0];
    };

    const center = determineCenter(vpnStore, tooltipStore);
    return (
        <div className="map">
            <ComposableMap
                width={400}
                height={400}
                projection="orthographic"
                projectionConfig={{ scale: 200 }}
                style={mapStyles}
            >
                <ZoomableGlobe
                    center={center}
                    onMoveStart={onGlobeMoveStart}
                    onMoveEnd={onGlobeMoveEnd}
                >
                    <circle
                        cx={200}
                        cy={200}
                        r={200}
                        fill="transparent"
                        stroke="#CFD8DC"
                    />
                    <Geographies
                        disableOptimization
                        geography={jsonMap}
                    >
                        {(geos, projection) => geos.map((geo, i) => (
                            <Geography
                                key={`geography-${i}`}
                                geography={geo}
                                projection={projection}
                                style={{
                                    default: geographyStyleDef,
                                    hover: geographyStyleDef,
                                    pressed: geographyStyleDef,
                                }}
                            />
                        ))
                                    }
                    </Geographies>
                    {renderCityMarkers(
                        endpoints,
                        selectedEndpoint,
                        globalProxyEnabled,
                        onMarkerClick
                    )
                            }
                </ZoomableGlobe>
            </ComposableMap>
            <Tooltip />
        </div>
    );
});

export default Map;
