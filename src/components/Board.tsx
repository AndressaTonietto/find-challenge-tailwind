import { sourceData } from '../utils/dataSource';
import Character from './Character';

const Board = () => {
  return (
    <div>
      {sourceData[0].character_grid.map((characterRow, axisY) => (
        <div className="flex" key={axisY}>
          {characterRow.map((character, axisX) => {
            return (
              <Character
                key={`${axisX},${axisY}`}
                isHighlighted={false}
                isValidTranslation={false}
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
