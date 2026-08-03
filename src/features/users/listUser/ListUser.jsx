import "./listUser.scss";
import {
    Table,
    Tag,
    Space,
    Avatar,
    Button,
    Row,
    Col,
    Input,
    Select,
  } from "antd";
  
  import {
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
  } from "@ant-design/icons";

  import { useState } from "react";
  import UserPage from "../userPage/userPage";
  
  function ListUser() {

    const [openModal, setOpenModal] = useState(false);
    const users = [
        {
          key: 1,
          fullName: "آذین مدرس",
          username: "azin",
          email: "azin@test.com",
          role: "کارشناس",
          status: true,
          unit: "فناوری اطلاعات",
          created: "1405/03/22",
        },
        {
          key: 2,
          fullName: "امیر محمدی",
          username: "amir",
          email: "amir@test.com",
          role: "رئیس اداره",
          status: true,
          unit: "مالی",
          created: "1405/03/22",
        },
      ];

      const columns = [
        {
          title: "",
          dataIndex: "fullName",
          render: (_, record) => (
            <Space>
              <Avatar>{record.fullName[0]}</Avatar>
              {record.fullName}
            </Space>
          ),
        },
        {
          title: "نام کاربری",
          dataIndex: "username",
        },
        {
          title: "ایمیل",
          dataIndex: "email",
        },
        {
          title: "واحد",
          dataIndex: "unit",
          render: (text) => <Tag>{text}</Tag>,
        },
        {
          title: "نقش",
          dataIndex: "role",
          render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
          title: "وضعیت",
          dataIndex: "status",
          render: (status) =>
            status ? (
              <Tag color="green">فعال</Tag>
            ) : (
              <Tag color="red">غیرفعال</Tag>
            ),
        },
        {
          title: "تاریخ ایجاد",
          dataIndex: "created",
        },
        {
          title: "ویرایش",
          render: () => (
            <Button type="text">
              <EditOutlined />
            </Button>
          ),
        },
      ];


            return(   
                <>
                <div className="dashboard-container">
                <div className="main-card">

                <div className="table-header">
      <div className="header-title">
        <h1><i className="pi pi-users"></i> لیست کاربران</h1>
        <p>مشاهده و مدیریت تمامی کاربران فعال و غیرفعال سیستم</p>
      </div>
      <div className="header-actions">
      <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    size="large"
                    onClick={() => setOpenModal(true)}
                >
                    کاربر جدید
                </Button>
      </div>
    </div>
  
            <Row gutter={16}>
            <Col span={8}>
                <Input
                placeholder="نام، نام کاربری، ایمیل..."
                prefix={<SearchOutlined />}
                />
            </Col>

            <Col span={6}>
                <Select
                style={{ width: "100%" }}
                placeholder="نقش"
                options={[
                    { value: "admin", label: "مدیر" },
                    { value: "user", label: "کارشناس" },
                ]}
                />
            </Col>

            <Col span={6}>
                <Select
                style={{ width: "100%" }}
                placeholder="وضعیت"
                options={[
                    { value: true, label: "فعال" },
                    { value: false, label: "غیرفعال" },
                ]}
                />
            </Col>

            <Col span={4}>
                <Button block>پاک کردن</Button>
            </Col>
            </Row>

            <Table
            columns={columns}
            dataSource={users}
            pagination={{
            pageSize: 10,
            }}
            />
            


            
            </div>
             
             
             </div>
             <UserPage
    open={openModal}
    onCancel={() => setOpenModal(false)}
/>
        
            </>
            
        );


    };
    

export default ListUser;