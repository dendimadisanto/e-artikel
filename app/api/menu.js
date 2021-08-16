const Menu = [
  {
    title: 'Artikel',
    icon: 'dashboard',
    name: 'Artikel',
    href: '/artikel'
  },
  {
    title: 'Data Master',
    group: 'Data Master',
    component: 'Data Master',
    icon: 'widgets',
    items: [
      {name: 'kategori', title: 'Kategori', href: '/master/kategori'},
    ]
  },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
