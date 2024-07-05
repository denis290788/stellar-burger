import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { selectorConstructor } from 'src/services/slices/burgerConstructor';
import { useSelector } from 'src/services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { selectorConstructorBun, selectorConstructorIngredients } =
    selectorConstructor;
  const constructorBun = useSelector(selectorConstructorBun);
  const constructorIngredients = useSelector(selectorConstructorIngredients);
  /** TODO:DONE? взять переменную из стора */
  const burgerConstructor = {
    bun: {
      _id: constructorBun ? constructorBun._id : ''
    },
    ingredients: constructorIngredients
  };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
