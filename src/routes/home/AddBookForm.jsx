import {Button, Card, Form, Input, InputNumber, Typography} from "antd";
import {useState} from "react";
import {request} from "../../util/axios_helper.js";

const { Text, Link } = Typography;

const AddBookForm = ({user, onReturn}) => {
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = (values) => {
        values["publisherId"] = user.id;
        request(
            "POST",
            "/books",
            values,
            {},
            {}
        ).then((res) => {
            onReturn();
        }).catch((err) => {
            console.log(err);
            setErrorMessage(err.response.data.message);
        })
    }

    return <Card
        hoverable
        title="Add Book"
        style={{
            marginTop: 20,
            width: "90%",
            maxWidth: 500,
        }}
    >
        <Form
            onFinish={onSubmit}
            form={form}
        >

            <Text>Title:</Text>
            <Form.Item
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Please input book`s title!',
                    },
                ]}
            >
                <Input type="text" />
            </Form.Item>

            <Text>Description:</Text>
            <Form.Item
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Please input book`s description!',
                    },
                ]}
            >
                <Input.TextArea/>
            </Form.Item>

            <Text>Page number: </Text>
            <Form.Item
                name="pageNumber"
                rules={[
                    {
                        required: true,
                        message: 'Please input book`s page number!',
                    },
                ]}
            >
                <InputNumber
                    style={{
                        width: '100%',
                    }}
                    min={1}
                />
            </Form.Item>

            <Text>Year: </Text>
            <Form.Item
                name="year"
                rules={[
                    {
                        required: true,
                        message: 'Please input book`s published year!',
                    },
                ]}
            >
                <InputNumber
                    style={{
                        width: '100%',
                    }}
                    min={1}
                />
            </Form.Item>

            <Text type="danger" style={{
                marginBottom: "3px",
                display: "block",
            }}>
                {errorMessage}
            </Text>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    </Card>
}

export default AddBookForm;