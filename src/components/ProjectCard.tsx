import { Card, CardContent, Stack, Typography } from "@mui/material";
import { DataItem } from "../types";
import { Link } from "react-router-dom";
import { createTitle } from "../utils/helpers";

export default function ProjectCard(props: { project: DataItem }) {  
  return (
    <Card
      className="hover"
      sx={{ width: 250, boxShadow: 2, padding: "0 20px" }}
    >
      <Link to={`/proyecto/${props.project._id}/${props.project.title}`} className="no-style">
        <CardContent sx={{ color: "#c3c3c3c", position: 'relative' }} >
            <Typography gutterBottom variant="h5" marginRight={0.5}>
              {createTitle(props.project.title.toUpperCase(), "ETAPA").title}
            </Typography>
            {
              createTitle(props.project.title.toUpperCase(), "ETAPA").subtitle &&
              <Typography variant="body2" color="text.secondary" sx={{
                position: "absolute",
                top: "5px",
                right: "0px",
              }}>
                <strong>ETAPA</strong>{createTitle(props.project.title.toUpperCase(), "ETAPA").subtitle}
              </Typography>
            }          
        </CardContent>
        <Stack sx={{ padding: "4px 20px" }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Activos</strong> {props.project.activos.length}
          </Typography>
        </Stack>
      </Link>
    </Card>
  );
}
