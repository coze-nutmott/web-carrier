/**
 * 주요 포인트
 * 타입 이름은 항상 I 로 시작합니다
 */
export interface ITodo {
  id: number;
  desc: string;
  status: IStatus;
  priority: IPriority;
  createdAt: string;
}

export type IPriority = 'low' | 'middle' | 'high';
export type IStatus = 'done' | 'doing' | 'waiting';
