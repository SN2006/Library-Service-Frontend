import {Button, Card, Form, Input, Typography} from "antd";
import {useState} from "react";
import {request} from "../../util/axios_helper.js";

const { Text, Link } = Typography;

const AddUserForm = ({onReturn}) => {
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = (values) => {
        request(
            "POST",
            "/users",
            values,
            {},
            {}
        ).then((res) => {
            onReturn(res);
        }).catch((err) => {
            setErrorMessage(err.message);
        })
    }

    return <Card
        hoverable
        title="Add User"
        style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 500,
        }}
    >
        <Form
            onFinish={onSubmit}
            form={form}
        >

            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                ]}
            >
                <Input type="text" placeholder="First Name" />
            </Form.Item>

            <Form.Item
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your last name!',
                    },
                ]}
            >
                <Input type="text" placeholder="Last Name" />
            </Form.Item>

            <Form.Item
                style={{
                    marginBottom: 50,
                }}
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input type="password" placeholder="Password" />
            </Form.Item>

            <Text type="danger" style={{
                marginBottom: "3px",
                display: "block",
            }}>
                {errorMessage}
            </Text>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Add User
                </Button>
            </Form.Item>
        </Form>
    </Card>
}

export default AddUserForm;