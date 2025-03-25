import { CircularProgress } from "@mui/material";

const ContentLoader = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <CircularProgress color="primary" />
    </div>
  );
};

export { ContentLoader };
