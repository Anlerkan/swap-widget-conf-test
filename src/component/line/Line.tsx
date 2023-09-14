import "./_line.scss";

interface LineProps {
  margin: string;
}

function Line({margin}: LineProps) {
  return (
    <span
      className={"line"}
      style={{
        margin
      }}
    />
  );
}

export default Line;
