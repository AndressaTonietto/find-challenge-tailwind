export type CharacterProps = {
  children: string;
  isHighlighted: boolean;
  isValidTranslation: boolean;
};

const Character: React.FC<CharacterProps> = ({
  children,
  isHighlighted,
  isValidTranslation,
}) => {
  return (
    <div
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
