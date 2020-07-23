import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="infobox">
      <CardContent>
        <Typography color="textSecondary" className="infobox__title">
          {title}
        </Typography>
        <h2 className="infobox__cases">{cases}</h2>
        <Typography color="textSecondary" className="infobox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
