import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  type MenuItem = Required<MenuProps>['items'][number];

  const nav = useNavigate();

  const items: MenuItem[] = [
    {
      key: '1',
      icon: <MailOutlined />,
      label: 'Trang chủ',
    },
    {
      key: '2',
      icon: <AppstoreOutlined />,
      label: 'Quản lý sản phẩm',
      children: [
        { key: 'list', label: 'Danh sách sản phẩm' },
        { key: 'add', label: 'Thêm mới sản phẩm' },
      ],
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: 'Quản lý danh mục',
      children: [
        { key: 'listDanhMuc', label: 'Danh sách danh mục' },
        { key: 'addDanhMuc', label: 'Thêm mới danh mục' },
      ],
    },
    {
      key: '4',
      icon: <AppstoreOutlined />,
      label: 'Thống kê',
      children: [
        { key: 'revenue', label: 'Doanh thu' },
        { key: 'orderStatistics', label: 'Thống kê đơn hàng' },
      ],
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
        case "add":
            nav("/admin/add");
            break;
        case "list":
            nav("/admin/list");
            break;
        case "addDanhMuc":
            nav("/admin/addDanhMuc");
            break;
        case "listDanhMuc":
            nav("/admin/listDanhMuc");
            break;
        case "revenue":
            nav("/admin/revenue");
            break;
        case "orderStatistics":
            nav("/admin/order-statistics");
            break;
        default:
            nav("/admin");
            break;
    }
  };

  return (
    <div className="w-1/5 h-screen bg-gray-100 shadow-lg">
        <Menu
            onClick={onClick}
            style={{ width: '100%' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            className="text-gray-700"
        />
    </div>
  );
};

export default AdminSidebar;