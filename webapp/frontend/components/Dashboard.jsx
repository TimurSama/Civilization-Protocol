import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [tokenomics, setTokenomics] = useState({
        vod_eco_supply: 0,
        vod_supply: 0,
        water_assets: 0,
        dao_coefficient: 1,
        pool_liquidity: 0
    });
    const [proposals, setProposals] = useState([]);
    const [waterData, setWaterData] = useState({
        sources: [],
        total_volume: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tokenomicsRes, proposalsRes] = await Promise.all([
                    axios.get('http://localhost:8000/tokenomics/status'),
                    axios.get('http://localhost:8000/dao/proposals')
                ]);
                setTokenomics(tokenomicsRes.data);
                setProposals(proposalsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard">
            <h1>VOD.eco Dashboard</h1>
            
            <section className="tokenomics">
                <h2>Tokenomics Status</h2>
                <div className="stats">
                    <div className="stat">
                        <h3>VODeco Supply</h3>
                        <p>{tokenomics.vod_eco_supply}</p>
                    </div>
                    <div className="stat">
                        <h3>VOD Supply</h3>
                        <p>{tokenomics.vod_supply}</p>
                    </div>
                    <div className="stat">
                        <h3>Water Assets (m³)</h3>
                        <p>{tokenomics.water_assets}</p>
                    </div>
                </div>
            </section>

            <section className="dao">
                <h2>DAO Proposals</h2>
                <div className="proposals">
                    {proposals.map(proposal => (
                        <div key={proposal.id} className="proposal">
                            <h3>{proposal.title}</h3>
                            <p>{proposal.description}</p>
                            <div className="votes">
                                <span>For: {proposal.votes_for}</span>
                                <span>Against: {proposal.votes_against}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="water">
                <h2>Water Sources</h2>
                <div className="sources">
                    {waterData.sources.map(source => (
                        <div key={source.id} className="source">
                            <h3>{source.name}</h3>
                            <p>Region: {source.region}</p>
                            <p>Volume: {source.volume_m3} m³</p>
                            <p>Quality: {source.quality_score}/100</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard; 