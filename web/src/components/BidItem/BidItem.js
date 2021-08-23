const BidItem = ({ bid }) => {
  return (
    <div className="flex text-sm">
      <span className="font-bold truncate w-24 inline-block">{bid.bidder}</span>
      <span className="mr-1">placed a bid of</span>
      <span className="font-bold">{`${bid.amount} ETH`}</span>
    </div>
  )
}

export default BidItem
