import { useEffect, useState } from 'react';
import { iCoordinate } from '../models/ICoordinate';
import { sourceData } from '../utils/dataSource';
import Board from './Board';

const Game = () => {
  const [round, setRound] = useState(0);
  const [selectedValidTranslations, setSelectedValidTranslations] = useState<
    string[]
  >([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [allWordsFound, setAllWordsFound] = useState(false);

  const numberOfWordsToBeFound = Object.keys(
    sourceData[round].word_locations
  ).length;

  useEffect(() => {
    if (foundWords.length === numberOfWordsToBeFound) setAllWordsFound(true);
    else setAllWordsFound(false);
  }, [foundWords, round, numberOfWordsToBeFound]);

  const checkedAnswer = ({ axisX, axisY }: iCoordinate) => {
    return !!selectedValidTranslations.find(item =>
      item?.match(/.{1,2}/g)?.includes(`${axisX}${axisY}`)
    );
  };

  return (
    <div className="text-center flex flex-col items-center min-h-screen bg-black text-white">
      <h1>Word source: {sourceData[round].word}</h1>
      <Board
        checkedAnswer={checkedAnswer}
        characters={sourceData[round].character_grid}
        wordLocations={Object.keys(sourceData[round].word_locations)}
        setSelectedValidTranslations={setSelectedValidTranslations}
      />
    </div>
  );
};

export default Game;
