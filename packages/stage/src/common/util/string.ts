function replaceLastChars(value: string, start: number, replace = '*'): string {
  const pattern = new RegExp(`(^.{${start}})?.`, 'gi');
  return value.replace(pattern, `$1${replace}`);
}

/**
 * 문자열의 모든 공백을 제거합니다
 */
export function removeWhitespace(value: string): string {
  return value.replace(/\s+/g, '');
}

/**
 * 이메일을 마스킹합니다.
 *
 * localPart는 전체 문자열의 40%를 남깁니다.
 * domain은 전체 문자열의 첫 글자만 남깁니다
 */
export function maskingEmail(email?: string): string {
  if (!email) return '';
  const [localPart, domain] = email.split('@');
  const localPartRemainingCharCount = Math.round(localPart.length * 0.4);

  const maskedLocalPart = replaceLastChars(
    localPart,
    localPartRemainingCharCount,
  );
  const maskedDomain = replaceLastChars(domain, 1);

  return `${maskedLocalPart}@${maskedDomain}`;
}
