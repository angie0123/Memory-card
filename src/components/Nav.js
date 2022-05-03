const Nav = ({ round, currentScore, bestScore }) => {
  return (
    <div className="nav">
      <div className="logo">Pokemon Memory Game</div>
      <div className="stats">
        <div>Round: {round}</div>
        <div>Score: {currentScore}</div>
        <div>Best: {bestScore}</div>
      </div>
    </div>
  );
};

export default Nav;
