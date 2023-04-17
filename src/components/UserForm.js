import classes from "./Header.module.css";
import { Fragment, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import Modal from "./ui/Modal";
import Lottie from "lottie-react";
import formSubmission from "../form-submission.json";

const UserForm = (props) => {
  const [form] = Form.useForm();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (props && props.entities) {
      form.setFieldsValue({
        name: props.entities.PERSON,
        age: props.entities.DATE,
        medicine: props.entities.CHEMICAL,
        disease: props.entities.DISEASE,
      });
    }

    if (isFormSubmitted) {
      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 2000);
    }
  }, [props.entities, isFormSubmitted]);

  const onFinish = (values) => {
    console.log("Success:", values);
    setIsFormSubmitted(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
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

      {isFormSubmitted && (
        <div className={`${isFormSubmitted ? "" : classes.hidden}`}>
          <Modal>
            <Lottie animationData={formSubmission} loop={true} />
          </Modal>
        </div>
      )}
    </Fragment>
  );
};
export default UserForm;
