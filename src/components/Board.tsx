import { useEffect, useState } from 'react';
import { iCoordinate } from '../models/ICoordinate';
import Character from './Character';

type BoardProps = {
  checkedAnswer: ({ axisX, axisY }: iCoordinate) => boolean;
  characters: string[][];
  wordLocations: string[];
  setSelectedValidTranslations: React.Dispatch<React.SetStateAction<string[]>>;
};

const Board = ({
  checkedAnswer,
  characters,
  wordLocations,
  setSelectedValidTranslations,
}: BoardProps) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [firstSelectedCoordinates, setFirstSelectedCoordinates] = useState<
    [] | number[]
  >([]);
  const [lastSelectedCoordinates, setLastSelectedCoordinates] = useState<
    [] | number[]
  >([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<string>('');

  const handleEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.type === 'mousedown') {
      setMouseDown(true);
    } else {
      setMouseDown(false);
    }
  };

  const setAxisCoordinate = (startIndex: number, endIndex: number) => {
    let tempSelectedCoordinates = [];

    const minIndex = Math.min(startIndex, endIndex);
    const maxIndex = Math.max(startIndex, endIndex);

    for (let i = minIndex; i <= maxIndex; i++) {
      tempSelectedCoordinates.push(i);
    }

    return tempSelectedCoordinates;
  };

  useEffect(() => {
    const leftToRight =
      firstSelectedCoordinates[0] < lastSelectedCoordinates[0];
    const rightToLeft =
      firstSelectedCoordinates[0] > lastSelectedCoordinates[0];
    const topToBottom =
      firstSelectedCoordinates[1] < lastSelectedCoordinates[1];
    const bottomToTop =
      firstSelectedCoordinates[1] > lastSelectedCoordinates[1];

    const mergeCoordinates = (
      x1: number,
      x2: number,
      y1: number,
      y2: number
    ) => {
      let tempSelectedCoordinates = ``;
      const x = setAxisCoordinate(x1, x2);
      const y = setAxisCoordinate(y1, y2);

      if (x.length === 1)
        y.forEach(y => {
          tempSelectedCoordinates += `${x[0]}${y}`;
        });
      else if (y.length === 1)
        x.forEach(x => {
          tempSelectedCoordinates += `${x}${y[0]}`;
        });
      else if (rightToLeft && topToBottom)
        x.reverse().forEach((x, index) => {
          tempSelectedCoordinates += `${x}${y[index]}`;
        });
      else if (rightToLeft && bottomToTop) {
        let yReversed = y.reverse();
        x.reverse().forEach((x, index) => {
          tempSelectedCoordinates += `${x}${yReversed[index]}`;
        });
      } else if (leftToRight && bottomToTop) {
        let yReversed = y.reverse();
        x.forEach((x, index) => {
          tempSelectedCoordinates += `${x}${yReversed[index]}`;
        });
      } else
        x.forEach((x, index) => {
          tempSelectedCoordinates += `${x}${y[index]}`;
        });

      return tempSelectedCoordinates;
    };

    if (
      firstSelectedCoordinates.length > 0 &&
      lastSelectedCoordinates.length > 0
    ) {
      setSelectedCoordinates(
        mergeCoordinates(
          firstSelectedCoordinates[0],
          lastSelectedCoordinates[0],
          firstSelectedCoordinates[1],
          lastSelectedCoordinates[1]
        )
      );
    } else {
      setSelectedCoordinates('');
    }
  }, [firstSelectedCoordinates, lastSelectedCoordinates]);

  const removeDuplicateTranslations = (list: string[]) => {
    return Array.from(new Set(list));
  };

  const removeSelection = () => {
    setFirstSelectedCoordinates([]);
    setLastSelectedCoordinates([]);
  };

  useEffect(() => {
    if (
      wordLocations.find(item => item.replace(/,/g, '') === selectedCoordinates)
    ) {
      setSelectedValidTranslations((prevState: string[] | []) =>
        removeDuplicateTranslations([...prevState, selectedCoordinates])
      );

      removeSelection();
    }
  }, [selectedCoordinates, setSelectedValidTranslations, wordLocations]);

  return (
    <div
      onMouseDown={e => handleEvent(e)}
      onMouseUp={e => handleEvent(e)}
      onMouseLeave={() => removeSelection()}
    >
      {characters.map((characterRow, axisY) => (
        <div className="flex" key={axisY}>
          {characterRow.map((character, axisX) => {
            return (
              <Character
                key={`${axisX},${axisY}`}
                axisX={axisX}
                axisY={axisY}
                mouseDown={mouseDown}
                setFirstSelectedCoordinates={setFirstSelectedCoordinates}
                setLastSelectedCoordinates={setLastSelectedCoordinates}
                isHighlighted={
                  !!selectedCoordinates &&
                  selectedCoordinates
                    .match(/.{1,2}/g)
                    ?.includes(`${axisX}${axisY}`)
                }
                isValidTranslation={checkedAnswer({ axisX, axisY })}
              >
                {character}
              </Character>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
