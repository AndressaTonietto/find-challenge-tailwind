export type CharacterProps = {
  children: string;
  axisX: number;
  axisY: number;
  mouseDown: boolean;
  setFirstSelectedCoordinates: React.Dispatch<
    React.SetStateAction<[] | number[]>
  >;
  setLastSelectedCoordinates: React.Dispatch<
    React.SetStateAction<[] | number[]>
  >;
  isHighlighted?: boolean;
  isValidTranslation: boolean;
};

const Character: React.FC<CharacterProps> = ({
  children,
  mouseDown,
  axisX,
  axisY,
  setFirstSelectedCoordinates,
  setLastSelectedCoordinates,
  isHighlighted,
  isValidTranslation,
}) => {
  const handleEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.type === 'mousedown') {
      setFirstSelectedCoordinates([axisX, axisY]);
    } else {
      setFirstSelectedCoordinates([]);
      setLastSelectedCoordinates([]);
    }
  };

  return (
    <div
      onMouseDown={e => handleEvent(e)}
      onMouseUp={e => handleEvent(e)}
      onMouseEnter={() => {
        if (mouseDown) {
          setLastSelectedCoordinates([axisX, axisY]);
        }
      }}
      className={`text-center uppercase select-none border border-black w-50 h-50 text-2xl font-['Hahmlet'] ${
        isHighlighted || isValidTranslation
          ? 'bg-black text-white'
          : 'bg-white text-black'
      }`}
    >
      {children}
    </div>
  );
};

export default Character;
