import { ElementColorStates } from '../constants';
import { PlayingElementModel } from '../models';

export function generateElementsData (fieldSize: number): PlayingElementModel[] {
  return Array.from(
      { length: Math.pow(fieldSize, 2) },
      (_: any, index: number): PlayingElementModel => ({ colorState: ElementColorStates.DEFAULT, id: `id${index + 1}`})
    );
}
