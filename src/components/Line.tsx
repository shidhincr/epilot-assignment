type LineProps = {
  width: string;
  height: string;
};

export const Line = ({ width, height }: LineProps) => {
  return <div className={`bg-gray-200 w-[${width}] h-${height}`}>&nbsp;</div>;
};
