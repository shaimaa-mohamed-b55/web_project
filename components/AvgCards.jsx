import React from 'react'

// in this avg cards, we usually recieve soemthing to display it
// since we are talking about finding avg
// so we are supposed to recieve this value
// and since its dyanmic , we will use curlybrackets

function AvgCards({title,avg_value}) {
  return (
    <div>
      <h3>{title}</h3>
      {/* work on this amount classname, design something for it */}
      <p className="amount">{avg_value.toLocaleString()}</p>
    </div>
  )
}

export default AvgCards
