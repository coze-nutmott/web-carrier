function stageUrl(path: string): string {
  return new URL(path, window.location.origin).toString();
}

function kakaopageUrl(path: string) {
  return new URL(path, process.env.KAKAOPAGE_HOST).toString();
}
export const accountInfoPath = (): string =>
  kakaopageUrl(`/account/info?returnUrl=${stageUrl('/')}`);
