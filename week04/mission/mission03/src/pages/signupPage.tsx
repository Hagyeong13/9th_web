import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginForm";
import useForm from "../hooks/useForm";
import type { UserSignInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";
import { useCallback, useState } from "react";

const SignPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [confirm, setConfirm] = useState("");
    const [confirmTouched, setConfirmTouched] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [nickname, setNickname] = useState("");

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
            return;
        }
        else if (step === 3) {
            setStep(2);
            return;
        }
        if (window.history.length > 1) navigate(-1);
        else navigate("/");
    };

    const validate = useCallback((values: UserSignInformation) => {
        const errors = validateSignin(values);
        if (step === 1) {
            return { email: errors.email || "", password: "" };
        }

        const confirmError={...errors,confirm:""};

        if (!confirmError.password) {
            if (values.password && confirm && values.password !== confirm) {
            confirmError.confirm = "비밀번호가 일치하지 않습니다.";
            }
        } else {
            confirmError.confirm = "";
        }

        return confirmError;
    },[step,confirm]);
    
    const form = useForm<UserSignInformation>({
        initialValue: { email: "", password: "" },
        validate,
    });

    const { values, errors } = form;

    const handleSubmit = () => {
        if (step === 1) {
            if (!errors?.email && values.email) setStep(2);
        }
        else if(step===2) {
            if (!errors?.email && !errors?.password && values.password === confirm) setStep(3);
        }
        else if (step === 3) {
            const userData = {
                email: values.email,
                password: values.password,
                nickname: nickname,
            };
            console.log(userData);
            navigate("/login");
        }
    };

    const isDisabled =
        Object.values(errors||{}).some((error)=>error.length>0) ||
        (step === 1 ? values.email === "" : step === 2 ? values.password === "" || confirm === "" : nickname.trim() === "");
        
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen -mt-15">
                <div className="flex items-center justify-between w-80 mb-6 relative">
                    <button onClick={handleBack} className="text-3xl font-bold absolute left-0 ml-8 cursor-pointer">&lt;</button>
                    <h1 className="text-3xl font-semibold text-center w-full">[회원가입]</h1>
                </div>
                {step===1&&(
                    <>
                        <LoginForm name="email" context="이메일을 입력하세요."  {...form} />
                    </>
                )}

                {step===2&&(
                    <>
                        <LoginForm name="password" context="비밀번호를 입력하세요."  {...form} />
                        <div className="relative w-70">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="비밀번호를 한 번 더 입력하세요."
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                onBlur={() => setConfirmTouched(true)}
                                className={`w-full h-10 rounded text-gray-400 border items-center justify-start px-3 mb-3 text-sm pr-9 ${(!errors?.password&&values.password) && confirmTouched && errors?.confirm ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                aria-label={showConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}
                                className="absolute right-2 top-1/3 -translate-y-1/2 text-gray-500 leading-none"
                            >
                                {showConfirm ? "x" : "o"}
                            </button>
                        </div>
                        {(!errors?.password&&values.password) && confirmTouched && errors?.confirm && (
                            <p className="relative w-70 text-red-500 text-sm mb-2 ml-3">{errors.confirm}</p>
                        )}
                    </>
                )}

                {step===3&&(
                    <div className="relative w-70">
                        <input
                            type="text"
                            placeholder="닉네임을 입력하세요."
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="w-full h-10 rounded text-gray-400 border border-gray-300 px-3 mb-3 text-sm"
                        />
                    </div>
                )}

                <button onClick={handleSubmit} disabled={isDisabled}
                    className={`flex w-70 h-10 rounded items-center justify-center mb-3 text-sm font-semibold
                    ${isDisabled ? "cursor-not-allowed bg-white border border-gray-300 text-gray-300" :"cursor-pointer bg-gray-200 border border-gray-300" }`}>{step === 3 ? "회원가입 완료" : "다음"}</button>
                </div>
        </>
    )
}

export default SignPage;