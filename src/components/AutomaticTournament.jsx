import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import {
  Bracket,
  Seed,
  SeedItem,
  SeedTeam,
} from "react-brackets";
import '../styles/AutomaticTournamentStyle.css';

const genMatches = (players) => {
  let nTeams = players.length / 2;  // 32 players divided into 16 teams
  let matchArray = [];
  
  const initialTeams = Array.from({ length: nTeams }, (_, i) => ({
    id: i,
    teams: [
      { id: i * 2, name: players[i * 2].name + " (" + players[i * 2].rank + " " + players[i * 2].rankTier + ")"},
      { id: i * 2 + 1, name: players[i * 2 + 1].name + " (" + players[i * 2 + 1].rank + " " + players[i * 2 + 1].rankTier + ")"},
    ],
  }));

  matchArray.push({ title: `Round 1`, seeds: initialTeams });
  
  // Generate the empty rounds
  while (nTeams > 1) {
    nTeams = (nTeams + 1) >> 1;
    const matches = Array.from({ length: nTeams }, (_, i) => ({
      id: i,
      date: new Date().toDateString(),
      teams: [
        { id: null, name: null },
        { id: null, name: null },
      ],
    }));
    const roundTitle = matchArray.length + 1;
    matchArray.push({ title: `Round ${roundTitle}`, seeds: matches });
  }
  
  return matchArray;
};


const AutomaticTournament = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const location = useLocation();
  const players = location.state?.players || []; 

  
  const [history, setHistory] = useState([]);

  

  const initialRounds = genMatches(players);
  const [rounds, setRounds] = useState(initialRounds);

  const handleSwipeChange = (index) => {
    setTabIndex(index);
  };

  const handleMatchClick = (roundIndex, seedIndex) => {
    if (roundIndex === rounds.length - 1) return;  // Don't handle click for the final match

    const nextRoundIndex = roundIndex + 1;
    const nextSeedIndex = Math.floor(seedIndex / 2);

    setHistory(prevHistory => [...prevHistory, rounds]);

    const newRounds = [...rounds];
    newRounds[nextRoundIndex].seeds[nextSeedIndex].teams = [...rounds[roundIndex].seeds[seedIndex].teams]; // Transfer both team members

    setRounds(newRounds);
  };

  const isMatchClickable = (roundIndex, seedIndex) => {
    if (roundIndex === 0) return true; // First round matches are always clickable

    const prevRoundIndex = roundIndex - 1;
    const prevSeedIndex = seedIndex * 2;
    const previousMatch = rounds[prevRoundIndex].seeds[prevSeedIndex];
    const isPrevMatchDecided = previousMatch.teams[0].name && previousMatch.teams[1].name;

    return isPrevMatchDecided;
  };

  const CustomSeed = ({ seed, roundIndex, seedIndex }) => {
    const homeTeam = seed.teams[0];
    const awayTeam = seed.teams[1];

    return (
      <Seed 
        style={{ fontSize: 12, opacity: isMatchClickable(roundIndex, seedIndex) ? 1 : 0.5 }}
        onClick={() => {
          if (isMatchClickable(roundIndex, seedIndex)) {
            handleMatchClick(roundIndex, seedIndex);
          }
        }}
      >
        <SeedItem>
          <div>
            <SeedTeam>
              <div></div>
            </SeedTeam>
            <SeedTeam>
              <div>{homeTeam.name ? homeTeam.name : "???"}</div>
            </SeedTeam>
            <SeedTeam>
              <div>{awayTeam.name ? awayTeam.name : "???"}</div>
            </SeedTeam>
          </div>
        </SeedItem>
      </Seed>
    );
  };
  return (
    <div className="tournament-container">
        <h1 className="tournament-title">Tournament View</h1>
        <div className="scrollable-container">
            <Bracket
              rounds={rounds}
              renderSeedComponent={CustomSeed}
              swipeableProps={{
                enableMouseEvents: true,
                animateHeight: true,
                index: tabIndex,
                onChangeIndex: handleSwipeChange
              }}
            />
        </div>
    </div>
  );
};

export default AutomaticTournament;
