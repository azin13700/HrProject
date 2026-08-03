import { Modal, Form, Input, Select } from "antd";

function UserPage({ open, onCancel }) {
  return (
    <Modal
      title="ایجاد کاربر جدید"
      open={open}
      onCancel={onCancel}
      onOk={() => {}}
      okText="ثبت"
      cancelText="انصراف"
      width={700}
    >
      <Form layout="vertical">
        <Form.Item label="نام و نام خانوادگی">
          <Input />
        </Form.Item>

        <Form.Item label="نام کاربری">
          <Input />
        </Form.Item>

        <Form.Item label="ایمیل">
          <Input />
        </Form.Item>

        <Form.Item label="واحد">
          <Select />
        </Form.Item>

        <Form.Item label="نقش">
          <Select />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default UserPage;