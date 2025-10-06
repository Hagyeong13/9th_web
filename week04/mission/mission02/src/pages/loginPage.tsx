import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginForm";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length > 1) navigate(-1);
        else navigate("/");
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen -mt-15">
                <div className="flex items-center justify-between w-80 mb-6 relative">
                    <button onClick={handleBack} className="text-3xl font-bold absolute left-0 ml-8 cursor-pointer">&lt;</button>
                    <h1 className="text-3xl font-semibold text-center w-full">[로그인]</h1>
                </div>
                <LoginForm context="아이디를 입력하세요."/>
                <LoginForm context="비밀번호를 입력하세요."/>
                <button className="flex w-70 h-10 rounded bg-gray-400 items-center justify-center mb-3 text-sm font-semibold cursor-pointer">로그인</button>
            </div>
        </>
    )
}

export default LoginPage;