import Flex from 'common/component/Flex';
import HorizontalScroll from 'common/component/HorizontalScroll';

interface IMenu<T> {
  name: string;
  value: T;
}

interface IProps<T> {
  menus: IMenu<T>[];
  currentMenu: IMenu<T>;
  setCurrentMenu: (menu: IMenu<T>) => void;
}

export default function ButtonTab<T>({
  menus,
  currentMenu,
  setCurrentMenu,
}: IProps<T>) {
  return (
    <Flex className="order-1 desktop:order-none w-full desktop:w-auto mt-12 desktop:mt-0 ml-0 desktop:ml-16">
      <HorizontalScroll>
        {menus.map(menu => {
          const isActive = menu.value === currentMenu.value;
          return (
            <button
              key={menu.name}
              onClick={() => setCurrentMenu(menu)}
              className={cn(
                'py-4 px-12 rounded-16 text-14',
                isActive
                  ? 'bg-black text-white font-bold'
                  : 'bg-transparent text-grayFont font-medium',
              )}
            >
              {menu.name}
            </button>
          );
        })}
      </HorizontalScroll>
    </Flex>
  );
}
