interface LoginFormProps {
    context:string;
}

const LoginForm = ({context} : LoginFormProps) => {
    return (
        <>
            <form className="flex w-70 h-10 rounded text-gray-400 border border-color-gray items-center justify-start px-3 mb-3 text-sm">{context}</form>
        </>
    )
}

export default LoginForm;