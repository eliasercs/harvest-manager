const BoxCard = ({icon, title, amount, type}) => {
  return (
    <div className="box-card">
      <div className="box-card-img">
        <i className={"bi "+icon}></i>
      </div>
      <div className="box-card-content">
        <h3 className="text-align-left">{title}</h3>
        <p>{amount} bandejas {type}</p>
      </div>
    </div>
  );
};

export default BoxCard;
