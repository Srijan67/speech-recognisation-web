import { Button, Form, Input } from "antd";
import { Card } from "antd";
import { useState, useEffect } from "react";

const UserForm = (props) => {
  const [form] = Form.useForm();
  const [formValue, setFormValue] = useState({
    name: "",
    age: "",
    medicine: "",
    disease: "",
  });

  useEffect(() => {
    setFormValue({
      name: props.entities.PERSON,
      age: props.entities.DATE,
      medicine: props.entities.CHEMICAL,
      disease: props.entities.DISEASE,
    });
  }, [props.entities]);

  console.log(props.entities);
  console.log("form value:", formValue);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}>
      <Card
        style={{
          width: 600,
        }}>
        <Form
          name="userForm"
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item label="name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="age" name="age">
            <Input />
          </Form.Item>
          <Form.Item label="disease" name="disease">
            <Input />
          </Form.Item>
          <Form.Item label="medicines" name="medicine">
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default UserForm;
