import StarIcon from '@mui/icons-material/Star';

const ProgressBar = (props) => {
  const { bgcolor, completed, number, star } = props;

  const reviewcontainer = {
    display: "grid",
    gridTemplateColumns: '19px 9fr 1fr',
    width: "100%",
    alignItems: "center",
    columnGap: '1px',
  }

  const containerStyles = {
    height: 5,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    margin: 7,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <>
    <div style={reviewcontainer}>
      <div style={{display: 'flex', alignItems: "center", justifyContent: 'space-between'}}>{star} <StarIcon sx={{ height: '9px', width: '9px'}}/></div>
      <div style={containerStyles}>
        <div style={fillerStyles} />
      </div>
      <span style={{position:'relative', left: '8px'}}>{number}</span>
    </div>
    </>
  );
};

export default ProgressBar;
