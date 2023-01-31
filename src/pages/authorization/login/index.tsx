import SimpleModal from '@/components/Modals/SimpleModal/SimpleModal';
import routes from '@/routes';
import { userSelector } from '@/utils/atom/userSelector';
import { emailRegex } from '@/utils/checkEmail';
import { pwdRegex } from '@/utils/checkPassword';
import { Default, Mobile } from '@/utils/mediaQuery';
import axios from 'axios';
import { FormEvent, useCallback, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as S from './styles';

function Login() {
  const [login, setLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [pwdValidation, setPwdValidation] = useState<boolean>(true);
  const [user, setUser] = useRecoilState(userSelector);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');

  const navigate = useNavigate();
  const { getByIndex } = useIndexedDB('user');

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const emailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.match(emailRegex) || e.target.value === null) {
      setEmailValidation(false);
    } else {
      setEmailValidation(true);
    }
  };
  const pwdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.match(pwdRegex) || e.target.value === null) {
      setPwdValidation(false);
    } else {
      setPwdValidation(true);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emailValidation && pwdValidation) {
      patchLogin();
    }
  };

  const patchLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post('/login', data);
      console.log(response);
      if (response.status === 200) {
        setModalText('로그인이 완료되었습니다! 💖');
        handleModal();
        navigate(routes.MAIN);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setModalText('가입된 이메일이 아닙니다. 먼저 가입해 주세요! ✋');
        handleModal();
      }
      if (error.response.status === 401) {
        setModalText('비밀번호가 틀렸습니다. 다시 시도해주세요! 😂');
        handleModal();
      }
    }
  };

  const handleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <S.Container>
      {isOpenModal && (
        <SimpleModal onClickToggleModal={handleModal}>{modalText}</SimpleModal>
      )}
      <Default>
        <S.LeftWrapper>
          <S.Img />
        </S.LeftWrapper>
      </Default>
      <S.RightWrapper>
        <S.Header>
          <Default>
            <S.HeaderWrapper>
              <S.BackBtn>
                <img />
                <span>Back</span>
              </S.BackBtn>
              <p>
                <span>I want to have an account!</span>
                <S.StyledText
                  onClick={() => {
                    navigate(routes.SIGNUP);
                  }}
                >
                  Sign Up
                </S.StyledText>
              </p>
            </S.HeaderWrapper>
          </Default>
        </S.Header>

        <S.Content>
          <S.Title>LOGIN</S.Title>

          <S.Form onSubmit={handleSubmit}>
            <label>Email</label>
            <S.InputEmail
              type="text"
              value={email}
              placeholder="Type here"
              onChange={handleChangeEmail}
              onBlur={emailInput}
              required
            ></S.InputEmail>
            <S.BlankDiv />

            <label>Password</label>
            <S.InputPwd
              type="password"
              value={password}
              onChange={handleChangePassword}
              onBlur={pwdInput}
              required
            ></S.InputPwd>
            <S.BlankDiv />

            <Default>
              <S.SubmitBtn
                type="submit"
                color="gradient"
                radius="circle"
                height="md"
                width={150}
              >
                Sign In
              </S.SubmitBtn>
            </Default>

            <Mobile>
              <S.SubmitBtn
                type="submit"
                color="gradient"
                radius="circle"
                height="md"
                width={160}
                style={{ whiteSpace: 'nowrap' }}
              >
                Sign In
              </S.SubmitBtn>
            </Mobile>
          </S.Form>
        </S.Content>
      </S.RightWrapper>
    </S.Container>
  );
}

export default Login;
