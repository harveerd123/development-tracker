import React, { useState, useEffect } from 'react';

const Home = () => {
    const [developments, setDevelopments] = useState([]);

    useEffect(() => {
        populateDevelopmentData();
    }, []);


    async function populateDevelopmentData() {
        const response = await fetch('/api/developments');
        let data = await response.json();
        data = data.filter(dev => dev.status === 'In Progress');
        setDevelopments(data);
    }

    const bugs = developments ? developments.filter(dev => dev.developmentType === 'Bugs') : [];
    const optimisations = developments ? developments.filter(dev => dev.developmentType === 'Optimisation') : [];
    const features = developments ? developments.filter(dev => dev.developmentType === 'New Features') : [];

    return (
        <div className='home-body'>
            <h4>Summary</h4>

            <h6>Bugs</h6>
            {bugs.length > 0 ? (
                <ul>
                    {bugs.map((dev, index) => (
                        <li key={index}>
                            {dev.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No developments match the selected filters or loading...</p>
            )}
            <br/>
            <h6>Optimisations</h6>
            {optimisations.length > 0 ? (
                <ul>
                    {optimisations.map((dev, index) => (
                        <li key={index}>
                            {dev.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No developments match the selected filters or loading...</p>
            )}
            <br />
            <h6>New Features</h6>
            {features.length > 0 ? (
                <ul>
                    {features.map((dev, index) => (
                        <li key={index}>
                            {dev.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No developments match the selected filters or loading...</p>
            )}
            <br />

            <h6>Developments In Progress: {developments.length > 0 ? developments.length : 'No developments in progress or loading...'}</h6>


            {/* Check if developments are loaded */}
            {/*{developments ? (*/}
            {/*    <ul>*/}
            {/*        {developments.map((dev, index) => (*/}
            {/*            <li key={index}>*/}
            {/*                 Assuming each development has a name and description */}
            {/*                <strong>{dev.name}</strong>: {dev.description}*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*) : (*/}
            {/*    <p>Loading developments...</p>*/}
            {/*)}*/}
        </div>
    );
};

export default Home;
