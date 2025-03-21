import React from "react";
import { Recipe } from "../../../../../Spizarnia-backend/src/models/Recipe.ts";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function RecipeAccordion(recipe: Recipe & { isExecutable: boolean }) {
    if (recipe.finished === false) {
        return null;
    }

    const backgroundColor = recipe.isExecutable ? "#4caf50" : "#f44336";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        margin: "2px auto",
        width: "1000px",
      }}
    >
      <Accordion
        style={{
          backgroundColor,
          color: "#fff",
          borderRadius: "10px",
          border: "1px solid #388e3c",
          marginBottom: "2px auto",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            component="span"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            {recipe.name || "Brak nazwy przepisu"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            component="span"
            style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px",  fontFamily: "'Poppins', 'Arial Black', sans-serif"  }}
          >
            Składniki:
          </Typography>
          <div style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#e8f5e9",
            borderRadius: "10px",
          }}>
            {recipe.ingredients?.map((ingredient, index) => (
              <Typography
                key={index}
                component="p"
                style={{ fontSize: "14px", margin: "5px 0", color: "#2e7d32", fontFamily: "'Poppins', 'Arial Black', sans-serif" }}
              >
                {ingredient.productModel?.name || "Nieznany składnik"} - Ilość: {ingredient.quantity || "Brak danych"}
              </Typography>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default RecipeAccordion;
