import LoginForm from "../components/loginForm";

const LoginPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen -mt-10">
            <h1 className="flex text-3xl font-semibold mb-6">[로그인]</h1>
            <LoginForm context="아이디를 입력하세요."/>
            <LoginForm context="비밀번호를 입력하세요."/>
            <button className="flex w-70 h-10 rounded bg-gray-400 items-center justify-center mb-3 text-sm font-semibold">로그인</button>
        </div>
    )
}

export default LoginPage;