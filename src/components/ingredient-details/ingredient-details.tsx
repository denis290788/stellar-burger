import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectorIngredients } from '../../services/slices/ingredients';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO:DONE взять переменную из стора */
  const { selectorIngredientsData } = selectorIngredients;
  const ingredients = useSelector(selectorIngredientsData);
  const { id } = useParams<{ id: string }>();
  const ingredientData = ingredients.find((i) => i._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
