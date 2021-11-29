import Flex from 'common/component/Flex';
import FormItem from 'common/component/Form/FormItem';
import FormSelect from 'common/component/Form/FormSelect';
import Input from 'common/component/Input';
import RadioGroup from 'common/component/RadioGroup';
import Textarea from 'common/component/Textarea';
import { IQnaCategory, IQuestion } from 'common/type';
import { useForm } from 'react-hook-form';
import TestItem from 'shared/uiTest/component/TestItem';

const createCategory = (n: number): IQnaCategory => ({
  id: n,
  name: `카테고리${n}`,
  priority: n,
  type: `카테고리${n}`,
  active: true,
  createdAt: '2020-01-01T00:00:00',
  updatedAt: '2020-01-01T00:00:00',
});

const CATEGORIES: IQnaCategory[] = [
  createCategory(1),
  createCategory(2),
  createCategory(3),
  createCategory(4),
];

export default function TestForm() {
  const { register, handleSubmit } = useForm<IQuestion>({});

  const submitQna = (data: {
    title: string;
    body: string;
    categoryId?: string;
  }) => {
    if (data.title.trim().length === 0 || data.body.trim().length === 0) {
      alert('제목과 내용을 입력해주세요.');
    }
    if (data.categoryId === '카테고리 선택') {
      alert('문의 카테고리를 선택하세요.');
    }
    alert(JSON.stringify(data));
  };

  return (
    <TestItem title="Form">
      <form onSubmit={handleSubmit(submitQna)}>
        <FormSelect
          ref={register}
          name="categoryId"
          className="border-b-1 border-solid border-divideLine py16 desktop:py-13 px-0"
        >
          <option value={undefined} selected disabled>
            카테고리 선택
          </option>
          {CATEGORIES.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </FormSelect>

        <FormItem title="제목" required>
          <Input
            type="text"
            name="title"
            maxLength={100}
            autoComplete="off"
            ref={register}
            placeholder="제목"
            className="w-full outline-none text-20 mb-0 py-16 px-0 border-b-1 border-solid border-divideLine font-medium"
          />
        </FormItem>

        <FormItem title="본문" required>
          <Textarea
            name="body"
            rows={10}
            maxLength={5000}
            placeholder="본문"
            ref={register}
            className="w-full mt-14 text-15 border-none"
            style={{ minHeight: 400 }}
          />
        </FormItem>

        <FormItem title="댓글 허용">
          <Flex>
            <RadioGroup
              name="episodeCommentStatus"
              value="allow"
              ref={register}
              defaultChecked={true}
            >
              Y
            </RadioGroup>
            <RadioGroup
              name="episodeCommentStatus"
              value="disallow"
              ref={register}
            >
              N
            </RadioGroup>
          </Flex>
        </FormItem>
      </form>
    </TestItem>
  );
}
