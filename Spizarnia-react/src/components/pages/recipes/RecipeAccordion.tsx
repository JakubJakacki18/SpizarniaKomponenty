import React from "react";
import {Recipe} from "../../../../../Spizarnia-backend/src/models/Recipe.ts"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function RecipeAccordion(recipe : Recipe) 
{
    return (
    <>
     <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{recipe.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            Składniki:<br/>
            {recipe.ingredients?.map((ingredient) => {
                return (<p>Nazwa: {ingredient.productModel?.name} Ilość: {ingredient.quantity}</p>)
            })}
        </AccordionDetails>
      </Accordion>
    </>);
}

export default RecipeAccordion;