type LineProps = {
  width: number;
  height: number;
};

export const Line = ({ width, height }: LineProps) => {
  return (
    <div className={`bg-gray-200 w-[${width}px] h-3 max-h-${height}`}>
      &nbsp;
    </div>
  );
};
