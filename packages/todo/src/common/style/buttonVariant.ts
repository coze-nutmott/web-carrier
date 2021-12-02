import { getKeys } from 'shared/util/common';

import { variants } from '../../../tailwind/buttonVariant';

export type IButtonVariant = keyof typeof variants;
export const buttonVariants = getKeys(variants);
