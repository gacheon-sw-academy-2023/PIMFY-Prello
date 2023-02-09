import DropDownMenu from '@/components/DropDownMenu/DropDownMenu';
import { MenuBtn } from '@/pages/board/styles';
import { IBoard } from '@/pages/workspace/detail';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios, { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import * as S from './BoardItem.styles';

type BoardProps = {
  board: IBoard;
};

export default function BoardItem({ board }: BoardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [boardName, setBoardName] = useState<string>(board.name);
  const handleDelete = () => {};
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };
  const handleButton = () => {
    if (boardName === board.name) {
      return true;
    }
    return false;
  };
  const fetchUpdate = async () => {
    let newBoardInfo = {
      boardId: board.id,
      boardName: board.name,
    };
    try {
      const response = await axios.post('/board/update', newBoardInfo);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };
  return (
    <S.Item center={false} color={'#ffe7ee'}>
      <S.TopWrapper>
        <S.TitleInput
          type="text"
          ref={inputRef}
          value={boardName}
          disabled={!isEdit}
          onChange={handleChangeTitle}
        ></S.TitleInput>

        <MenuBtn>
          <S.IconBtn onClick={() => setShowMenu(!showMenu)}>
            <FontAwesomeIcon icon={faEllipsis} />
          </S.IconBtn>
          {showMenu && (
            <DropDownMenu
              UpdateList={fetchUpdate}
              handleDeleteItems={handleDelete}
              boardId={board.id}
              setEdit={setEdit}
            />
          )}
        </MenuBtn>
      </S.TopWrapper>
      {isEdit && (
        <S.BtnWrapper>
          <S.SaveBtn
            color="primary"
            disable={handleButton()}
            onClick={fetchUpdate}
          >
            확인
          </S.SaveBtn>
        </S.BtnWrapper>
      )}
    </S.Item>
  );
}
function useFocus(arg0: boolean) {
  throw new Error('Function not implemented.');
}
