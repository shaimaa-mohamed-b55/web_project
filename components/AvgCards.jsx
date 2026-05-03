
function AvgCards({title,avg_value}) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p className="amount">{avg_value??'N/A'}</p>
    </div>
  );
}

export default AvgCards
