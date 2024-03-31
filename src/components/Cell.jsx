import mineIcon from "../assets/mine.png";
import flagIcon from "../assets/flag.png";
export default function Cell({ cell, handleSelectCell }) {
  return (
    <div>
      <button
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: cell.hasMine ? "red" : "white",
        }}
        onClick={handleSelectCell}
        onContextMenu={handleSelectCell}
      >
        {cell.isOpen ? (
          !cell.hasMine ? (
            cell.minesAroundMe
          ) : (
            <img
              src={mineIcon}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          )
        ) : null}

        {cell.hasFlag ? (
          <img
            src={flagIcon}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : null}
      </button>
    </div>
  );
}
