import CircularLoading from '@/components/CirclularLoading/CircularLoading';
import SimpleModal from '@/components/Modals/SimpleModal/SimpleModal';
import { userSelector } from '@/recoil/atom/userSelector';
import ROUTES from '@/routes';
import { Default } from '@/utils/mediaQuery';
import { CircularProgress } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as S from './styles';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useRecoilState(userSelector);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchLogin();
  };

  const fetchLogin = async () => {
    setLoading(true);
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post('/login', data);
      console.log(response.data.user);
      console.log(loading);
      if (response.status === 200) {
        setLoading(false);
        setModalText('로그인이 완료되었습니다! 💖');
        setUser(response.data.user);
        console.log(user);
        handleModal();
        setTimeout(() => navigate(ROUTES.MAIN), 1000);
      }
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 400) {
        setLoading(false);
        setModalText('가입된 이메일이 아닙니다. 먼저 가입해 주세요! ✋');
        handleModal();
      }
      if (err.response?.status === 401) {
        setLoading(false);
        setModalText('비밀번호가 틀렸습니다. 다시 시도해주세요! 😂');
        handleModal();
      }
    }
  };

  const handleModal = () => {
    setOpenModal(!isOpenModal);
  };

  return (
    <S.Container>
      {loading && <CircularLoading />}
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
              <S.BackBtn onClick={() => navigate(-1)}>
                <img />
                <span>Back</span>
              </S.BackBtn>
              <p>
                <span>I want to have an account!</span>
                <S.StyledText
                  onClick={() => {
                    navigate(ROUTES.SIGNUP);
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
              required
              data-testid="email"
            ></S.InputEmail>
            <S.BlankDiv />

            <label>Password</label>
            <S.InputPwd
              type="password"
              value={password}
              placeholder="Type here"
              onChange={handleChangePassword}
              required
              data-testid="password"
            ></S.InputPwd>
            <S.BlankDiv />

            <S.SubmitBtn
              type="submit"
              color="gradient"
              radius="circle"
              width={160}
              data-testid="submit"
              // disable={
              //   !(
              //     email.length > 0 &&
              //     password.length > 0 &&
              //   )
              // }
            >
              Login
            </S.SubmitBtn>
          </S.Form>
        </S.Content>
      </S.RightWrapper>
    </S.Container>
  );
}

export default Login;
