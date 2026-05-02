
function AvgCards({title,avg_value}) {
  return (
    <div>
      <h3>{title}</h3>
      <p className="amount">{avg_value.toLocaleString()}</p>
    </div>
  );
}

export default AvgCards
