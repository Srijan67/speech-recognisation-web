import classes from "./Header.module.css";
import { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
const { Option } = Select;

const UserForm = (props) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (props && props.entities) {
      form.setFieldsValue({
        name: props.entities.PERSON,
        age: props.entities.DATE,
        medicine: props.entities.CHEMICAL,
        disease: props.entities.DISEASE,
      });
    }
  }, [props]);

  const onFinish = (values) => {
    console.log("Success:", values);
    if (values) {
      form.setFieldsValue({
        ...values,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="userForm"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={classes.form}>
      <Form.Item name="name">
        <Input
          className={`${classes["form-field"]} ${classes.animation} ${classes.a3}`}
          placeholder="Name"
        />
      </Form.Item>

      <Form.Item name="age">
        <Input
          className={`${classes["form-field"]} ${classes.animation} ${classes.a3}`}
          placeholder="Age"
        />
      </Form.Item>
      <Form.Item name="disease">
        <Input
          className={`${classes["form-field"]} ${classes.animation} ${classes.a3}`}
          placeholder="Disease"
        />
      </Form.Item>
      <Form.Item name="medicine">
        <Input
          className={`${classes["form-field"]} ${classes.animation} ${classes.a3}`}
          placeholder="Medicine"
        />
      </Form.Item>
      <Form.Item>
        <Input
          className={`${classes["form-field"]} ${classes.animation} ${classes.a3}`}
          placeholder="Gender"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={`${classes.animation} ${classes.a6} ${classes.button}`}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default UserForm;
