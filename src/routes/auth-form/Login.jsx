import {Flex, Menu} from "antd";
import {useState} from "react";
import SignInForm from "./SignInForm.jsx";
import LogInForm from "./LogInForm.jsx";

const items = [
    {
        label: "Sign In",
        key: "sign_in",
    },
    {
        label: "Log In",
        key: "login",
    }
]

const Login = () => {
    const [isRegister, setIsRegister] = useState(true);

    const onClickMenuItem = (e) => {
        setIsRegister(e.key === 'sign_in');
    }

    return <Flex vertical={true} align="center">
        <Menu
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            mode="horizontal"
            items={items}
            onClick={onClickMenuItem}
            defaultSelectedKeys={["sign_in"]}
        />
        {isRegister ? <SignInForm/> : <LogInForm/>}
    </Flex>
}

export default Login;