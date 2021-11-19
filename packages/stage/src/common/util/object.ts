import merge from 'lodash/merge';

export function cleanMerge<TObject>(
  object: TObject,
  source: Partial<TObject>,
): TObject {
  return merge(object, source);
}
