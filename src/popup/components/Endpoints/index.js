import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import rootStore from '../../stores';
import './endpoints.pcss';

const Endpoints = observer(() => {
    const { endpointsStore, uiStore } = useContext(rootStore);

    const handleEndpointSelect = id => async (e) => {
        e.preventDefault();
        await endpointsStore.setSelectedEndpoint(id);
        uiStore.closeEndpointsSearch();
    };

    const handleCloseEndpoints = () => {
        uiStore.closeEndpointsSearch();
        endpointsStore.setSearchValue('');
    };

    const renderEndpoints = endpoints => endpoints.map((endpoint) => {
        const { cityName, id, selected } = endpoint;
        const endpointClassNames = classnames({
            'endpoints__item--selected': selected,
        });
        return (
            <div
                key={id}
                className={`endpoints__item ${endpointClassNames}`}
                onClick={handleEndpointSelect(id)}
            >
                <div className="endpoints__item-ico" />
                <div className="endpoints__city">
                    {cityName}
                </div>
            </div>
        );
    });

    const handleSearchInput = (e) => {
        const { value } = e.target;
        endpointsStore.setSearchValue(value);
    };

    const endpoints = endpointsStore.filteredEndpoints;
    const endpointsCrossClassNames = classnames({
        'endpoints__cross--active': endpointsStore.searchValue.length > 0,
    });
    return (
        <div className="endpoints">
            <div className="endpoints__header">
                <button
                    type="button"
                    className="button endpoints__back"
                    onClick={handleCloseEndpoints}
                />
                <div className="endpoints__search">
                    <input
                        className="endpoints__search-in"
                        type="text"
                        value={endpointsStore.searchValue}
                        onChange={handleSearchInput}
                    />
                    <button
                        onClick={() => {
                            endpointsStore.setSearchValue('');
                        }}
                        type="button"
                        className={`button endpoints__cross ${endpointsCrossClassNames}`}
                    />
                </div>
            </div>
            <div className="endpoints__list">
                {renderEndpoints(endpoints)}
            </div>
        </div>
    );
});

export default Endpoints;
