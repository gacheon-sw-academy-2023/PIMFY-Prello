import { IndexedDB, initDB } from 'react-indexed-db';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from './pages/authorization/login';
import SignUp from './pages/authorization/sign-up';
import Board from './pages/board';
import Main from './pages/main';
import NotFound from './pages/notFound';
import WorkspaceDefault from './pages/workspace/default';
import WorkspaceDetail from './pages/workspace/detail';
import WorkspaceSetting from './pages/workspace/setting';
import routes from './routes';
import { DBConfig } from './utils/dbconfig';
initDB(DBConfig);

function App() {
  return (
    <BrowserRouter>
      <IndexedDB
        name="MyDB"
        version={1}
        objectStoresMeta={[
          {
            store: 'user',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
              { name: 'email', keypath: 'email', options: { unique: false } },
              {
                name: 'password',
                keypath: 'password',
                options: { unique: false },
              },
              {
                name: 'nickname',
                keypath: 'nickname',
                options: { unique: false },
              },
            ],
          },
          {
            store: 'workspace',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
              { name: 'owner', keypath: 'owner', options: { unique: false } },
              { name: 'name', keypath: 'name', options: { unique: false } },
              {
                name: 'summary',
                keypath: 'summary',
                options: { unique: false },
              },
              {
                name: 'memberInfo',
                keypath: 'memberInfo',
                options: { unique: false },
              },
            ],
          },
        ]}
      >
        <Routes>
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.MAIN} element={<Main />} />
          <Route path={routes.SIGNUP} element={<SignUp />} />
          <Route path={routes.BOARD} element={<Board />} />
          <Route
            path={routes.WORKSPACEDEFAULT}
            element={<WorkspaceDefault />}
          />
          <Route path={routes.WORKSPACEDETAIL} element={<WorkspaceDetail />} />
          <Route
            path={routes.WORKSPACESETTING}
            element={<WorkspaceSetting />}
          />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </IndexedDB>
    </BrowserRouter>
  );
}

export default App;
