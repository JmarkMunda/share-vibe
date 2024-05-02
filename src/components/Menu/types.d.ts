type MenuItemsType = {
  label: string;
  onClick: () => void;
};

interface IMenu {
  items: MenuItemsType[];
}
