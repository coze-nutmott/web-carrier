import { getKeys } from 'shared/util/common';

import { variants } from '../../../tailwind/textVariant';

export type ITextVariant = keyof typeof variants;
export const textVariants = getKeys(variants);
