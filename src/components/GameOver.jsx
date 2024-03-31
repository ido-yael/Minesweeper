export default function GameOver ({onRestart,isGameWon}){
return (
    <div id="game-over">
        {isGameWon && <h2>You Won</h2>}

       {!isGameWon && <div><h2>Game Over!</h2>{<h3>You steeped on a mine</h3>}</div>}
        <p>
            <button onClick={onRestart}>Rematch!</button>
        </p>
    </div>
);


}