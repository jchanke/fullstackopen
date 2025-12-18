import { Favorite } from "@mui/icons-material";
import { Rating } from "@mui/material";

import { styled } from "@mui/material/styles";

type BarProps = {
  rating: number | undefined;
  showText: boolean;
};

const StyledRating = styled(Rating)({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
});

const HEALTHBAR_TEXTS = [
  "in great shape",
  "low risk of getting sick",
  "high risk of getting sick",
  "has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  return (
    <div className="health-bar">
      {rating !== undefined && (
        <StyledRating
          readOnly
          value={4 - rating}
          max={4}
          icon={<Favorite fontSize="inherit" />}
        />
      )}
      {showText ? <p>{rating ? HEALTHBAR_TEXTS[rating] : "unknown"}</p> : null}
    </div>
  );
};

export default HealthRatingBar;
