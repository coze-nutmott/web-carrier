import { Text } from 'common/component/shared';
import { IUser } from 'event/type';

interface IProps {
  user: IUser;
}

export default function User({ user }: IProps) {
  return (
    <div className="p-50">
      <Text variant="s42_bold_black">user id: {user.id}</Text>
      <Text variant="s16_medium_blue">user name: {user.name}</Text>
      <Text variant="s16_medium_blue">user createdAt: {user.createdAt}</Text>
    </div>
  );
}
