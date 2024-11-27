import {useLoaderData} from "react-router-dom";
import {useEffect, useState} from "react";
import {request} from "../../util/axios_helper.js";
import {Button, Card, Typography} from "antd";
import Meta from "antd/es/card/Meta.js";

const { Text, Link } = Typography;

export async function bookLoader({params}) {
    return params.id;
}

const Book = () => {
    const bookId = useLoaderData();
    const [book, setBook] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        request(
            "GET",
            "/users/current",
            {},
            {},
            {}
        ).then((res) => {
            setUser(res.data);
            request(
                "GET",
                `/books/${bookId}`,
                {},
                {},
                {}
            ).then((res) => {
                setBook(res.data);
            }).catch((error) => {
                console.log(error);
            })
        }).catch((err) => {
            if (err.status === 401 || err.status === 403) {
                document.location.href = "/login";
            }
        })
    }, []);

    const onClickDeleteButton = () => {
        request(
            "DELETE",
            `/books/${bookId}`,
            {},
            {},
            {}
        ).then(() => {
            document.location.href = "/";
        }).catch((error) => {
            console.log(error);
        })
    }

    return <Card
        hoverable
        title={book.title}
        style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 500,
        }}
        actions={user.role === "ADMIN" ? [
            <Link href="/" key="back">Back</Link>,
            <Button
                key="delete"
                color="danger"
                variant="outlined"
                onClick={onClickDeleteButton}
            >
                Delete
            </Button>,
        ] : [
            <Link href="/" key="back">Back</Link>,
        ]}
    >
        <Meta
            description={book.description}
        />
        <Text italic style={{display: "block"}} type="success">Year: {book.year}</Text>
        <Text italic style={{display: "block"}} type="success">Page number: {book.pageNumber}</Text>
    </Card>
}

export default Book;